import connectDB from "@/database/connect";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import UserModel from "@/model/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case 'POST':

            const { followerId } = req.body;
            if (followerId === undefined || followerId === '') {
                throw new Error("No Follower ID provided");
            }
            const session = await getServerSession(req, res, authOptions);

            if (!session) {
                return res.status(HttpStatusCode.Unauthorized).json({
                    message: "You must be logged in.",
                    success: false
                })
            }
            try {
                // Fetch tbe user from the database
                
                const loggedUser = await UserModel.findOne({ email: session.user.email });

        
                if (loggedUser.following.includes(followerId)) {
                    // If already following, remove from following list
                    loggedUser.following.pull(followerId);
                    await loggedUser.save();
                    // Remove the logged-in user from the follower's followers list
                    const followerUser = await UserModel.findById(followerId);
                    followerUser.followers.pull(loggedUser.id);
                    await followerUser.save();
                    
                    
                    return res.json({
                        message: "Unfollowed successfully",
                        success: true,
                        user: loggedUser
                    });
                } else {
                    // If not already following, add to following list
                    loggedUser.following.push(followerId);
                    await loggedUser.save();

                    // Add the logged-in user to the follower's followers list
                    const followerUser = await UserModel.findById(followerId);
                    followerUser.followers.push(loggedUser.id);
                    await followerUser.save();

                    

                    return res.json({
                        message: "Followed successfully",
                        success: true,
                        user: loggedUser
                    });
                }


            } catch (error: any) {
                return res.status(HttpStatusCode.InternalServerError).json({
                    message: error,
                    success: false,
                })
            }
        default:
            return res.status(HttpStatusCode.NotFound).json({ error: 'Method not found', success: false });
    }
}
export default connectDB(handler);