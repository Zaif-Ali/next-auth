// api/users/UpdateUser
import checkUserExistence from '@/lib/UserExistance';
import { IUser } from '@/types/Global';
import type { NextApiRequest, NextApiResponse } from 'next'
import { UpdateResult } from 'mongodb';
import UserModel from '@/model/User';
import connectDB from '@/database/connect';
// Response Type
type Data = {
    error?: string | null,
    message?: string | null,
    success: boolean
    user?: IUser | null
}

const handler = async (
    request: NextApiRequest,
    response: NextApiResponse<Data>
) => {
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
                await updateUser(user, formData);
                // Get the user again from the database
                const { user: update } = await checkUserExistence(email) as { user: IUser };
                // Send Response 
                return response.status(200).json({
                    success: true,
                    error: null,
                    message: "updated",
                    user: update
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
export default connectDB(handler);

async function updateUser(user: IUser, formData: Partial<IUser>) {
    // Create an object to store the fields to be updated
    const updatedFields: Partial<IUser> = {};

    // Get the keys of the formData object
    const keys = Object.keys(formData);
    console.log(keys);

    // Iterate over the keys and compare the values with the current user
    for (const key of keys) {
        // Check if the value is different from the current user's value
        if (formData[key as keyof IUser] !== user[key as keyof IUser]) {
            // Store the updated value in the updatedFields object
            updatedFields[key as keyof IUser] = formData[key as keyof IUser];
        }
    }



    // Update the user in the database using the updateOne method
    const updateResult: UpdateResult = await UserModel.updateOne(
        { _id: user._id }, // Specify the filter to match the user
        { $set: updatedFields }, // Set the updated fields
    );

    // Check if the update was successful
    if (updateResult.modifiedCount !== 1) {
        throw new Error('Failed to update user');
    }

    // Return the update result
    return updateResult;
}


