// api/user/TotalUsers
import clientPromise from '@/database/client';
import connectDB from '@/database/connect';
import UserModel from '@/model/User';
import { IUser } from '@/types/Global';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    TotlaNumber?: number
    success: boolean
    error?: string
}

const  handler = async (
    request: NextApiRequest,
    response: NextApiResponse<Data>
) => {
    switch (request.method) {
        case 'GET':
            try {
                
                const TotlaNumber = await UserModel.countDocuments();
                
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
export default connectDB(handler);