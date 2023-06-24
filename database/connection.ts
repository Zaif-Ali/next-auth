import mongoose, { Connection } from 'mongoose';

export default async function connectDB(): Promise<Connection> {
    try {
          await mongoose.connect(process.env.MONGODB_URI!, {
            useNewUrlParser: true,
        } as any);



        return mongoose.connection;
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }
}