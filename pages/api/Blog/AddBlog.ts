import connectDB from "@/database/connect";
import checkUserExistence from "@/lib/UserExistance";
import Blog from "@/model/Blog";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    switch (req.method) {
        case 'POST':
            const { title, content, email } = req.body;
            
            const { user } = await checkUserExistence(email);
            if (user === null) {
                return res.status(HttpStatusCode.NotFound).json({
                    success: false,
                    message: "User not found",
                });
            }
            
            let newBlog;
            try {
                newBlog = new Blog({
                    title,
                    slug: title.toLowerCase().replace(/ /g, '-'),
                    excerpt: content.substring(0, 200) + '...',
                    content,
                    author: user.id,
                    Likes: 0,
                    likedBy: [],
                    authorname: user.name,
                    authoremail: email
                })
                // save user
                await newBlog.save();

            } catch (error: any) {
                return res.status(HttpStatusCode.InternalServerError).json({
                    message: "Error in while saving Blog",
                    success: false,
                    error: error.message
                })
            }
            
            return res.status(HttpStatusCode.Created).json({ error: 'Blog Added', success: true });


        default:
            return res.status(HttpStatusCode.NotFound).json({ error: 'Method not found', success: false });

    }
}
export default connectDB(handler);