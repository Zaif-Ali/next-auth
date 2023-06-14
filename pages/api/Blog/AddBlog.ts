import connectDB from "@/database/connection";
import checkUserExistence from "@/lib/UserExistance";
import Blog from "@/model/Blog";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function AddBlog(req: NextApiRequest, res: NextApiResponse) {

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
            const db = await connectDB();
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
                return res.status(HttpStatusCode.BadRequest).json({
                    message: "Error in while saving Blog",
                    success: false,
                    error: error.message
                })
            }
            await db.close();
            return res.status(HttpStatusCode.Created).json({ error: 'Blog Added', success: true });


        default:
            return res.status(HttpStatusCode.NotFound).json({ error: 'Method not found', success: false });

    }
}