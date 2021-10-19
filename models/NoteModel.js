import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
})

const DataSet = mongoose.models.note || mongoose.model('note', NoteSchema)

export default DataSet