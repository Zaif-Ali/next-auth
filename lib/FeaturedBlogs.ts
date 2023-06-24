import Blog from "@/model/Blog";
import { Measure_Date } from "./GetDate";
import { load } from "cheerio";

export const fetchRelevantBlogs = async (blogTitle: string, blogid: string, _no_FeaturedBlogs: number = 3) => {

    const blogTitleWords = blogTitle.split(" ");
    // Find the realivent Blogs 
    const relevantBlogs = await Blog.find({
        title: { $regex: blogTitleWords.join("|"), $options: "i" },
        _id: { $ne: blogid },
    })
        .select("_id title excerpt slug author createdAt")
        .populate("author", "name image")
        // Sort the blogs by max likes and older 
        .sort({ likes: -1, createdAt: 1 })
        .lean()
        .limit(_no_FeaturedBlogs)
        .exec();

    // if the blogs length are not meet the default/Demand length
    if (relevantBlogs.length < _no_FeaturedBlogs) {
        const additionalBlogs = await Blog.find({
            _id: {
                $nin: [...relevantBlogs.map((blog) => blog._id), blogid],
            },
        })
            .select("_id title excerpt slug author createdAt")
            .populate("author", "name image")
            // Sort the blogs by max likes and older 
            .sort({ likes: -1, createdAt: 1 })
            .lean()
            .limit(_no_FeaturedBlogs - relevantBlogs.length)
            .exec();

        relevantBlogs.push(...additionalBlogs);
    }

    return relevantBlogs.map((blog) => {
        // Set the date Format
        const createdAtLabel: string = Measure_Date(blog.createdAt);
        // Convert the excerpt into plain text
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
};