import { IBlog } from "@/hooks/useBlog";
import { NextPage } from "next";
import EBlog from "./EBlog";

interface Props {
  FBlogs: IBlog[];
}

const FeaturedBlogs: NextPage<Props> = ({ FBlogs }) => {
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold text-gray-700 dark:text-gray-200 dark:opacity-80"> Featured Blogs</h1>
      <div className="grid grid-cols-1  md:grid-cols-2  lg:grid-cols-2  gap-3 px-5 pt-3 pb-8">
        {FBlogs.map((FBlog, index) => (
          <EBlog
            key={index}
            slug={FBlog.slug}
            date={FBlog.createdAt}
            excerpt={FBlog.excerpt}
            image={FBlog.author.image}
            name={FBlog.author.name}
            title={FBlog.title}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogs;
