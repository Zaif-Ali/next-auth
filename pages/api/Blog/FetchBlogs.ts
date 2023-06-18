import connectDB from "@/database/connection";
import Blog from "@/model/Blog";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";

interface PaginationParams {
  page: any;
  limit: number | undefined;
}

// create a new instance of the chache
const cache = new NodeCache();

export default async function FetchBlogs(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        let { page, limit }: PaginationParams = req.query as any;

        limit = limit ?? 6;

        const cacheKey = `blogs-${page}_${limit}`;
        const cachedData = cache.get(cacheKey);
        // if the data was reterived
        if (cachedData) {
          return res.status(HttpStatusCode.Ok).send(cachedData);
        }
        // if the data was not present in the cache
        const db = await connectDB();
        const skip = (page - 1) * limit;
        const blogs = await Blog.find()
          .select("title excerpt slug")
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limit)
          .lean() // Use the lean() method to return plain JavaScript objects instead of Mongoose documents
          .exec();

        db.close();

        const reducedBlogs = blogs.map((blog) => ({
          title: blog.title,
          excerpt: blog.excerpt,
          slug: blog.slug,
        }));

        // Saving blogs
        cache.set(cacheKey, reducedBlogs, 500); // Set cache expiry

        return res.status(HttpStatusCode.Ok).json(reducedBlogs);
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
