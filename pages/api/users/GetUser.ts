
// api/users/GetUser
import checkUserExistence from '@/lib/UserExistance';
import { User } from '@/types/Global';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    error?: string | null,
    message?: string | null,
    user?: User | null,
    found?: boolean,
    email? : string | null;
}

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse<Data>
) {
    // this handler only work for the post request
    switch (request.method) {
        case 'POST':
            try {
                // get the email from the request body
                const { email } = request.body;
                // get the user from the function
                const { found, user } = await checkUserExistence(email);
                // sending resposne
                return response.status(200).json({ error: null, message: email, user, found , email });
            } catch (error: any) {
                // if any error occur 
                return response.status(500).json({ error: error.message })
            }

        default:
            // if the request method was incorrect
            return response.status(404).json({ error: 'Method not found' })

    }
}
