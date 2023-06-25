import EBlog from "./EBlog";
import useBlog, { IBlog } from "@/hooks/useBlog";
import Wrapper from "@/layout/Wrapper";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const AllBlogInfinite = () => {
    const { FetchBlogs, hasMore, blogs } = useBlog();

    useEffect(() => {
      FetchBlogs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
    <>
      <InfiniteScroll
        className=" p-1"
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
        <Wrapper className="grid  gap-3 md:gap-6">
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
    </>
  );
};

export default AllBlogInfinite;
