
import connectDB from "@/database/connect";
import  { load } from "cheerio";
import Blog from "@/model/Blog";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import NodeCache from "node-cache";
import { formatDistanceToNow, addYears } from "date-fns";

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

        limit = limit ?? 8;

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
          // Convert the date into the days or year format
          const createdAt = new Date(blog.createdAt);
          const now = new Date();
          const daysSinceCreation = Math.round(
            (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24) // Convert milliseconds to days
          );

          let createdAtLabel: string;
          // Check if the blog was created today
          if (daysSinceCreation < 1) {
            createdAtLabel = "Today";
          }
          // Check if the blog was created more than or equal to 1 year ago
          else if (daysSinceCreation >= 365) {
            const yearsSinceCreation = Math.floor(daysSinceCreation / 365);
            createdAtLabel = `${yearsSinceCreation} year${yearsSinceCreation > 1 ? "s" : ""} ago`;
          }
          // If the blog was created within the past year
          else {
            // Use the formatDistanceToNow function to generate a relative time label
            createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
          }


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