import BlogLayout from "@/components/Blogs/BlogLayout";
import Wrapper from "@/layout/Wrapper";
import { NextPage } from "next";

interface Props {}

const Blogs: NextPage<Props> = ({}) => {
  return (
    <Wrapper >
      <BlogLayout />
    </Wrapper>
  );
};

export default Blogs;
