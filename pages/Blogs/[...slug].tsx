import useBlog from "@/hooks/useBlog";
import Wrapper from "@/layout/Wrapper";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
interface Props {}

const Blog: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { FetchBlog, blog } = useBlog();
  useEffect(() => {
    FetchBlog(router.query.slug as string);
  }, [router.query.slug]);
  return (
    <Wrapper>
      <div>{blog?.authorname}</div>
    </Wrapper>
  );
};

export default Blog;
