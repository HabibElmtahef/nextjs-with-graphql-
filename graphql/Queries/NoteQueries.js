import Note from '../../models/NoteModel'

const NoteQueries = {
    notes: async (_, __, { user }) => {
        const notes = await Note.find({user: user.id})
        return notes
    }
}

module.exports = NoteQueries