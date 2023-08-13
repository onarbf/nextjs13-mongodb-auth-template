import mongoose from 'mongoose';

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connector',()=>{
            console.log('MongoDB Connected successfully')
        })

        connection.on('error',(error)=>{
            console.log('MongoDB connection error')
            console.log(error)
        })
    } catch (error) {
        console.log('Something went wrong')
        console.log(error)
    }
}