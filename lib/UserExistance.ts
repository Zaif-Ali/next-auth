// user existance
import clientPromise from '@/database/connection';
import { IUser } from '@/types/Global';
import { Collection } from 'mongodb';


async function checkUserExistence(email: string): Promise<{ found: boolean; user: IUser | null }> {
    // Retunred values 
    let found = false;
    let user: IUser | null = null;
    
    try {
        // make connection and get collection
        const client = await clientPromise;
        const collection: Collection<IUser> = client.db().collection('users');

        user = await collection.findOne({ email });

        if (user) {
            found = true;
        }
    } catch (error) {
        console.error('Failed to check user existence:', error);
    }

    return { found, user };
}

export default checkUserExistence;