import connectDB from "@/database/connect";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import Blog, { FIBlog } from "@/model/Blog";
import { IBlog } from "@/hooks/useBlog";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "POST":
            const { BlogId } = req.body;

            if (!BlogId) {
                return res.status(HttpStatusCode.BadRequest).json({
                    message: "No Blog ID provided",
                    success: false,
                });
            }

            const session = await getServerSession(req, res, authOptions);

            if (!session) {
                return res.status(HttpStatusCode.Unauthorized).json({
                    message: "You must be logged in.",
                    success: false,
                });
            }

            const LoggedUserID: string = session.user.id;

            try {
                // Find the blog by ID and populate the likedBy field with user data
                const blog: FIBlog | null | any = await Blog.findById(BlogId)

                if (!blog) {
                    throw new Error(`Couldn't find blog with ID: ${BlogId}`);
                }

                // Check if the blog is already liked by the user
                const isLiked = blog.likedBy.includes(LoggedUserID);
                let StatusLiked: boolean = false;
                if (isLiked) {
                    // If already liked, unlike the blog
                    blog.likedBy = blog.likedBy.filter((user: any) => user.id === LoggedUserID);
                    
                    StatusLiked = false
                } else {
                    StatusLiked = true
                    // If not liked, like the blog
                    blog.likedBy.push(LoggedUserID);
                }

                // Save the updated blog
                await blog.save();

                return res.status(HttpStatusCode.Ok).json({
                    message: "Blog like status updated successfully",
                    success: true,
                    liked: StatusLiked, // Return the updated liked status
                    blog: blog.toJSON(), // Convert the blog to JSON before sending
                });
            } catch (error: any) {
                return res.status(HttpStatusCode.InternalServerError).json({
                    message: error.message,
                    success: false,
                });
            }
        default:
            return res.status(HttpStatusCode.NotFound).json({ error: "Method not found", success: false });
    }
};

export default connectDB(handler);
