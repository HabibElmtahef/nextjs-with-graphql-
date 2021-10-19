import mongoose from 'mongoose'

const connectionDB = () => {
    if(mongoose.connections[0].readyState) {
        console.log('Already Connect');
        return
    }
    mongoose.connect("mongodb+srv://next:next@cluster0.w7fib.mongodb.net/mongogql?retryWrites=true&w=majority", {}, err => {
        if (err) throw err
        console.log('Database Connected');
    })
}

export default connectionDB