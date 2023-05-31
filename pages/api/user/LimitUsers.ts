import connectDB from '@/database/connection';
import UserModel from '@/model/User';
import { IUser } from '@/types/Global';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    users?: IUser[] | any;
    totalCount?: number;
    error?: string;
    success: boolean
};



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        try {
            const db = await connectDB();
            //    console.log(db);

            console.log("Connected");
            const totalCount = await UserModel.countDocuments({});
            const users = await UserModel.find({})
                .select('name email image')
            console.log(users);
            
            console.log("fetched")
            
            db.close();
            return res.status(200).json({
                users,
                // totalCount,
                success: true,
            });
        } catch (error: any) {
            return res.status(500).json({
                error: error.message,
                success: false
            });
        }
    }

    return res.status(404).json({ error: 'Method not found', success: false });
}
