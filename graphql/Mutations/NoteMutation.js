import Note from '../../models/NoteModel'
import {AuthenticationError} from 'apollo-server-errors';


const NoteMutation = {
    addNote: async (_, { input: { title, description } }, { user }) => {
        if(!user) throw new AuthenticationError('Please Login')
        const nvNote = await Note.create({
            title, description, user: user.id
        })
        return nvNote
    },

    deleteNote: async (_, { id }) => {
        const note = await Note.findById(id)
        await note.remove()
        return 'Note Deleted'
    },

    updateNote: async (_, {id, input: {title, description, done}}) => {
        const nvNote = await Note.findByIdAndUpdate(id, {
            title, description, done
        })
        return nvNote
    }
}



module.exports = NoteMutation