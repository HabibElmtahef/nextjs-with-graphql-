const NoteQueries = require('./Queries/NoteQueries')
const NoteMutation = require('./Mutations/NoteMutation')
const Auth = require('./Mutations/Auth')

const resolvers = {
    Query: {
        test: () => "MongoDb Et Next Js",
        notes: NoteQueries.notes,
        login: Auth.login,
        me: Auth.me
    },

    Mutation: {
        register: Auth.register,
        addNote: NoteMutation.addNote,
        deleteNote: NoteMutation.deleteNote,
        updateNote: NoteMutation.updateNote
    }
}


module.exports = resolvers