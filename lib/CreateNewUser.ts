// create user
import { User } from '@/types/Global';
import clientPromise from '@/database/connection';

export async function createUser(email: string, name: string, image: string): Promise<User> {
    // database connection
    const client = await clientPromise;
    const db = client.db();


    // user creation
    const newUser = {
        email,
        name,
        image,
        role: 'user',
        gender: 'other',
        emailVerified : false,
    };

    try {
        // inserting new user
        const result = await db.collection('users').insertOne(newUser);
        // console.log('New user created:', result);

        return newUser as unknown as User;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
}