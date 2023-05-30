import mongoose, { Connection } from "mongoose";


export default async function connectDB(): Promise<Connection> {
    
    mongoose.set('strictQuery', true);

    const db = await mongoose.connect(process.env.MONGODB_URI!)

    return db.connection;
}