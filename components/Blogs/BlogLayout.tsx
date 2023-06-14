import React, { useEffect, useState } from "react";
import useBlog, { IBlog } from "@/hooks/useBlog";
import EachBlog from "./EachBlog";
import InfiniteScroll from "react-infinite-scroll-component";
import Wrapper from "@/layout/Wrapper";
import axios from "axios";

const BlogLayout = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const FetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `/api/Blog/FetchBlogs?page=${page}`
      );
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

  useEffect(() => {
    FetchBlogs();
  }, []);

  return (
    <Wrapper className="p-3">
      <InfiniteScroll
        dataLength={blogs.length}
        next={FetchBlogs}
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <div className="grid grid-cols-2  gap-10">
          {blogs.map((blog: IBlog, index: number) => (
            <EachBlog
              key={blog._id}
              title={blog.title}
              excerpt={blog.excerpt}
              slug={blog.slug}
            />
          ))}
        </div>
      </InfiniteScroll>
    </Wrapper>
  );
};

export default BlogLayout;
