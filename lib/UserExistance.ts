// user existance
import clientPromise from '@/database/client';
import connectDB from '@/database/connect';
import UserModel from '@/model/User';
import { IUser } from '@/types/Global';



async function checkUserExistence(email: string): Promise<{ found: boolean; user: IUser | null }> {
    // Retunred values 
    let found = false;
    let user: IUser | null = null;
    
    const client = await clientPromise;
    const db = client.db("users");

    try {
        user = await UserModel.findOne({ email });
        if (user) {
            found = true;
        }
    } catch (error) {
        console.error('Failed to check user existence:', error);
    }

    return { found, user };
}

export default checkUserExistence;