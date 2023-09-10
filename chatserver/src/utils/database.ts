
import mongoose,{Mongoose,connect}  from 'mongoose'


mongoose.Promise = global.Promise;

// let uri = process.env.MONGO_URI ;
// console.log(uri);

export const connectDB = async () => {
    try {
     const conn:Mongoose = await connect(process.env.MONGO_URI || 'mongodb://localhost:27017/DB Name',{
        serverSelectionTimeoutMS:20000,
    })
    console.log(`MongoDB Connection Succeeded.`)
    } catch (error) {
        console.log('Error in DB connection: ' + error)
        process.exit()
    }
}


