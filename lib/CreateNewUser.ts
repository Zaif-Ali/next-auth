// create user
import { IUser } from '@/types/Global';
import connectDB from '@/database/connection';
import UserModel from '@/model/User';

export async function createUser(email: string, name: string, image: string) {

    // user creation and others things are set as default
    const newUser = new UserModel({
        email,
        name,
        image,
    });

    try {
        const db = await connectDB();
        const user : IUser = await newUser.save();
        db.close();
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
}