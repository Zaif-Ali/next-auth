// create user
import { IUser } from '@/types/Global';
import UserModel from '@/model/User';
import connectDB from '@/database/connection';


export async function createUser(email: string, name: string, image: string) {

    const db = await connectDB();
    // user creation and others things are set as default
    const newUser = new UserModel({
        email,
        name,
        image,
    });

    try {
        const user: IUser = await newUser.save();
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
}