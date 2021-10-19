import mongoose from 'mongoose'

const connectionDB = () => {
    if(mongoose.connections[0].readyState) {
        console.log('Already Connect');
        return
    }
    mongoose.connect(process.env.URI, {}, err => {
        if (err) throw err
        console.log('Database Connected');
    })
}

export default connectionDB