import AllBlogInfinite from "./AllBlogInfinite";
import Wrapper from "@/layout/Wrapper";
import React, { useEffect } from "react";

const BlogLayout = () => {
  return (
    <Wrapper className="py-3">
      <div className="flex justify-between space-x-2 flex-row ">
        <div className="w-[25%] hidden md:block  "></div>
        <div className="lg:w-[70%] ">
          <AllBlogInfinite />
        </div>
        <div className="w-[25%]  hidden md:block"></div>
      </div>
    </Wrapper>
  );
};

export default BlogLayout;
