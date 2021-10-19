import {AuthenticationError} from 'apollo-server-errors';
import User from '../../models/userModel'
const jwt = require('jsonwebtoken')

const Auth = {
    register: async (_, {input: { username, email, password }}) => {
        try {
            const nvUser = await User.create({
                username, email, password
            })
            return nvUser
        } catch (error) {
            throw new AuthenticationError("Register Invalid");
        }
    },

    login: async (_, {email, password}) => {
        try {
            const user = await User.findOne({email})
            if(!user) throw new AuthenticationError('User Introuvable')
            
            const PassCorrect = await user.comparePassword(password)
            
            if(!PassCorrect) throw new AuthenticationError('User Introuvable')

            const token = user.getJWTToken()

            return {
                user,
                token
            }

        } catch (error) {
           throw new AuthenticationError(error.message)   
        }
    },

    me: async (_, __, { user }) => {
        
        if(!user) throw new Error('Please Login!')
        const me = await User.findById(user.id)
        return me
    }
}




module.exports = Auth