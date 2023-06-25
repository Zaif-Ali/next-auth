
import connectDB from "@/database/connect";
import { load } from "cheerio";
import Blog from "@/model/Blog";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import { Measure_Date } from "@/lib/GetDate";


interface PaginationParams {
  page: any;
  limit: number | undefined;
}

// create a new instance of the chache
const cache = new NodeCache();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      try {
        let { page, limit }: PaginationParams = req.query as any;

        limit = limit ?? 6;

        const cacheKey = `blogs-${page}_${limit}`;
        const cachedData = cache.get(cacheKey);
        // if the data was reterived
        if (cachedData) {
          console.log("Present in the cache")
          return res.status(HttpStatusCode.Ok).send(cachedData);
        }

        const skip = (page - 1) * limit;



        const blogs = await Blog.find()
          .select("title excerpt slug author createdAt")
          .populate("author", "name image") // Populate the author information 
          .sort({ _id: -1 })
          .skip(skip)
          .limit(limit)
          .lean() // Use the lean() method to return plain JavaScript objects instead of Mongoose documents
          .exec();

        const reducedBlogs = blogs.map((blog) => {
          const createdAtLabel: string = Measure_Date(blog.createdAt);
          // convert the excerpt into plain text 
          const $ = load(blog.excerpt);
          const excerptPlainText = $.text().trim();

          return {
            title: blog.title,
            excerpt: excerptPlainText,
            slug: blog.slug,
            author: {
              name: blog.author.name,
              image: blog.author.image,
            },
            createdAt: createdAtLabel,
          };
        });

        // Saving blogs
        cache.set(cacheKey, reducedBlogs, 800); // Set cache expiry

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
export default connectDB(handler);