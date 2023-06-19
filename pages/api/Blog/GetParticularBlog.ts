import connectDB from "@/database/connect";
import Blog, { FIBlog } from "@/model/Blog";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";

// create a new instance of the chache
const Blogcache = new NodeCache();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            try {

                const { slug } = req.query;

                if (!slug || typeof slug !== "string") throw Error("Invalid params");
                // get from the cache
                const cacheKey = `blog-${slug}`;
                const cachedData = Blogcache.get(cacheKey);
                // If the data was retrieved from the cache
                if (cachedData) {
                    console.log("Present in the cache");
                    return res.status(HttpStatusCode.Ok).json(cachedData);
                }
                // fetch from the backend
                const blog: FIBlog | null = await Blog.findOne({ slug });
                // if blog was not found
                if (!blog) {
                    return res.status(HttpStatusCode.NotFound).json({ error: "Blog not found", success: false });
                }
                // Saving the blog to cache
                Blogcache.set(cacheKey, blog, 800); // Set cache expiry
                return res.status(HttpStatusCode.Ok).json(blog);
            } catch (error: any) {
                console.error("Error fetching blogs:", error);
                return res
                    .status(HttpStatusCode.InternalServerError)
                    .json({ error: error.message, success: false });
            }

        default:
            return res
                .status(HttpStatusCode.NotFound)
                .json({ error: "Method not found", success: false });
    }
}
export default connectDB(handler);