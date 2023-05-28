// api/users/UpdateUser
import checkUserExistence from '@/lib/UserExistance';
import User from '@/model/User';
import { IUser } from '@/types/Global';
import type { NextApiRequest, NextApiResponse } from 'next'
import { UpdateQuery  } from 'mongoose';

type Data = {
    error?: string | null,
    message?: string | null,
    success: boolean
}

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse<Data>
) {
    switch (request.method) {
        case 'POST':
            try {
                // get the email from the request body
                const { email, formData } = request.body;
                // get the user from the function
                const { found, user } = await checkUserExistence(email);
                // if user not found
                if (!found || user == null) {
                    return response.status(404).json({
                        error: "User Not found",
                        success: false
                    })
                }
                
                // if the user is found
                // Update the user with the changed fields from formData
                const updatedUser = await updateUser(user, formData);
                console.log(updatedUser);
                return response.status(200).json({
                    success: true,
                    error: null,
                    message: "updated"
                })
            } catch (error: any) {
                // if any error occur 
                return response.status(500).json({
                    error: error.message,
                    success: false
                })
            }

        default:
            // if the request method was incorrect
            return response.status(404).json({ error: 'Method not found', success: false })
    }
}



async function updateUser(user: IUser, formData: Partial<IUser>): Promise<IUser> {
    const updatedFields: Partial<IUser> = {};
    const keys = Object.keys(formData);
    console.log(keys);
    for (const key of keys) {
        console.log(key);
        
      if (formData[key as keyof IUser] !== user[key as keyof IUser]) {
        updatedFields[key as keyof IUser] = formData[key as keyof IUser];
      }
    }
  
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: updatedFields },
      { new: true }
    );
  
    if (!updatedUser) {
      throw new Error('Failed to update user');
    }
  
    return updatedUser;
  }
  