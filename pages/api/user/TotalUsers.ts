// api/user/TotalUsers
import connectDB from '@/database/connection';
import { IUser } from '@/types/Global';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    TotlaNumber?: number
    success: boolean
    error?: string
}

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse<Data>
) {
    switch (request.method) {
        case 'GET':
            try {
                const db = await connectDB();
                const TotlaNumber = await db.collection<IUser>('users').countDocuments();
                db.close();
                return response.status(200).json({
                    TotlaNumber,
                    success: false
                })
            } catch (error: any) {
                return response.status(500).json({
                    error: error.message,
                    success: false
                })
            }
        default:
            // if the request method was incorrect
            return response.status(404).json({
                error: 'Method not found',
                success: false
            })
    }
}