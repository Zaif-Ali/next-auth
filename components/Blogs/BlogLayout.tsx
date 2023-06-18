import React, { useEffect } from "react";
import useBlog, { IBlog } from "@/hooks/useBlog";
import EachBlog from "./EachBlog";
import InfiniteScroll from "react-infinite-scroll-component";
import Wrapper from "@/layout/Wrapper";

const BlogLayout = () => {
  const { FetchBlogs, hasMore, blogs } = useBlog();

  useEffect(() => {
    FetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper className="p-3">
      <InfiniteScroll
        dataLength={blogs.length}
        next={FetchBlogs}
        hasMore={hasMore}
        loader={
          <div className=" flex justify-center items-center   ">
            <span className="  py-2 px-2">Scroll down to read more</span>
          </div>
        }
        endMessage={<p></p>}
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
