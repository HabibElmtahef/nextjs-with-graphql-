const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: 'Avatar'
    },

    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJWTToken = function(){
    return jwt.sign({ id: this._id, role: this.role }, 'habib')
}

userSchema.methods.comparePassword = async function(pass) {
    return await bcrypt.compare(pass, this.password)
}

const DataSet = mongoose.models.user || mongoose.model('user', userSchema)

export default DataSet