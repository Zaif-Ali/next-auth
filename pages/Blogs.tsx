import BlogLayout from "@/components/Blogs/BlogLayout";
import Wrapper from "@/layout/Wrapper";
import { NextPage } from "next";
import Head from "next/head";

interface Props {}

const Blogs: NextPage<Props> = ({}) => {
  return (
    <Wrapper>
      <Head>
        <title>{` All Blogs || Final-Blog `}</title>
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={`Meta description for the All blog page`}
        />
      </Head>
      <BlogLayout />
    </Wrapper>
  );
};

export default Blogs;
