import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/types/Global";

export interface IBlog {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
}

interface FetchResult {
  blogs: IBlog[];
  cursor: string | null;
}

const useBlog = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { data: session } = useSession();
  const email = session?.user.email as string;
  // Add Blog
  const addBlog = async (title: string, content: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/Blog/AddBlog", {
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
      const res = await axios.get(`/api/Blog/FetchBlogs?page=${page}`);
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

  return { addBlog, loading, error, blogs, FetchBlogs, hasMore };
};

export default useBlog;
