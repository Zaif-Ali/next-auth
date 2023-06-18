import UserModel from '@/model/User';
import { IUser } from '@/types/Global';
import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpStatusCode } from "axios";
import clientPromise from '@/database/client';
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
            
            //    console.log(db);
            let { value, search } = req.query;
            let Users = [];


            if (value === "All") {
                if (search !== "") {
                    Users = await UserModel
                        .find({
                            $or: [
                                { name: { $regex: search, $options: "i" } },
                                { email: { $regex: search, $options: "i" } },
                            ],
                        })
                        .exec();
                } else {
                    Users = await UserModel.find({}).exec();
                }
            } else if (value === "Verified") {
                if (search !== "") {
                    Users = await UserModel
                        .find({
                            $and: [
                                { isVerified: true },
                                {
                                    $or: [
                                        { name: { $regex: search, $options: "i" } },
                                        { email: { $regex: search, $options: "i" } },
                                    ],
                                },
                            ],
                        })
                        .exec();
                } else {
                    Users = await UserModel.find({ isVerified: true }).exec();
                }
            }


            
            return res.status(HttpStatusCode.Ok).json({
                users: Users,
                // totalCount,
                success: true,
            });
        } catch (error: any) {
            return res.status(HttpStatusCode.InternalServerError).json({
                error: error.message,
                success: false
            });
        }
    }

    return res.status(404).json({ error: 'Method not found', success: false });
}
