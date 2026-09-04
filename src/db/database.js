import mongoose from 'mongoose'
import config from '../config/config.js'

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(config.MONGODB_URL)
        console.log(`MongoDB connected successfully: ${connection.connection.host}`)
        return connection
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`)
        process.exit(1)
    }
}


export default connectDb