import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { FIBlog } from "@/model/Blog";
import { BlogApiConstants } from "@/constant/ApiConstrants";


export interface IBlog {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  author: {
    name: string,
    image: string
  },
  createdAt: string
}

const useBlog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [blog, setBlog] = useState<FIBlog | null>();
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data: session } = useSession();
  const email = session?.user.email as string;
  // Add Blog
  const addBlog = async (title: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(BlogApiConstants.AddBlog, {
        title,
        content,
        email,
      });
      if (res.data.success) {
        toast("Blog Added Successfully");
      } else {
        toast.error(`Some Error occurred`);
        setError(res.data.message);
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
        setError(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const FetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(BlogApiConstants.FetchBlogs(page));
      const newBlogs = await res.data;
      setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(newBlogs.length > 0);
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };


  const LikeBlog = async (BlogId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(BlogApiConstants.LikeBlog(BlogId));
      const data = response.data;
      if (data.success) {
        setBlog(data.blog);
        return data.liked
      }

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return { addBlog, LikeBlog, loading, error, blogs, FetchBlogs, hasMore, blog };
};

export default useBlog;
