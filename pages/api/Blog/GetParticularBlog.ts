import connectDB from "@/database/connect";
import { fetchRelevantBlogs } from "@/lib/FeaturedBlogs";
import { Measure_Date } from "@/lib/GetDate";
import { formattedJoinDate } from "@/lib/GetJoinDate";
import Blog, { FIBlog } from "@/model/Blog";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";

// Create a new instance of the cache
const Blogcache = new NodeCache();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            try {
                const { slug } = req.query;

                if (!slug || typeof slug !== "string") {
                    throw Error("Invalid params");
                }

                // Get data from the cache
                const cacheKey = `blog-${slug}`;
                const cachedData = Blogcache.get(cacheKey);

                // If the data was retrieved from the cache
                if (cachedData) {
                    console.log("Present in the cache");
                    return res.status(HttpStatusCode.Ok).json(cachedData);
                }

                // Fetch the blog from the backend
                let blog: FIBlog | null = await Blog.findOne({ slug }).populate("author", "createdAt image").lean().exec() as FIBlog | null;

                // If the blog was not found
                if (!blog) {
                    return res.status(HttpStatusCode.NotFound).json({ error: "Blog not found", success: false });
                }

                blog.author.createdAt = formattedJoinDate(blog.author.createdAt);

                blog.createdAt = Measure_Date(blog.createdAt);


                // Fetch featured blogs whose titles most closely match the current blog's title
                const featuredBlogs = await fetchRelevantBlogs(blog.title, blog._id.toString());


                const responseData = {
                    blog,
                    featuredBlogs,
                    success: true,
                };

                // Save the blog and featured blogs to cache with a 5-minute expiration time
                Blogcache.set(cacheKey, responseData, 300);

                return res.status(HttpStatusCode.Ok).json(responseData);
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
};

export default connectDB(handler);



