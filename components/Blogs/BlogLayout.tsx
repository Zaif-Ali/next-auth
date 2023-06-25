import EBlog from "./EBlog";
import useBlog, { IBlog } from "@/hooks/useBlog";
import Wrapper from "@/layout/Wrapper";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

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
        <Wrapper className="grid md:grid-cols-2  gap-8">
          {blogs.map((blog: IBlog, index: number) => (
            <EBlog
              key={index}
              title={blog.title}
              excerpt={blog.excerpt}
              slug={blog.slug}
              name={blog.author.name}
              image={blog.author.image}
              date={blog.createdAt}
            />
          ))}
        </Wrapper>
      </InfiniteScroll>
    </Wrapper>
  );
};

export default BlogLayout;
