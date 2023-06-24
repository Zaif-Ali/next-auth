import { useEffect, useState } from "react";
import Wrapper from "@/layout/Wrapper";
import { FIBlog } from "@/model/Blog";
import axios from "axios";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import EBlog from "@/components/Blogs/EBlog";
import styles from "./../../styles/index.module.css";
import { useTheme } from "next-themes";
import FeaturedBlogs from "@/components/Blogs/FeaturedBlogs";
import { IBlog } from "@/hooks/useBlog";

import TitleUser from "@/components/Blogs/TitleUser";

interface Props {
  blog: FIBlog;
  featuredBlogs: IBlog[];
}

const Blog: NextPage<Props> = ({ blog, featuredBlogs }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Wrapper>
      <Head>
        <title>{`${blog.title} || ${blog.authorname}-Blog `}</title>
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={`Meta description for the ${slug} page`}
        />
      </Head>
      <div className="flex flex-col ">
        <div className="flex-wrap p-3 md:p-7 ">
          <div className="flex flex-col   pb-12">
            <div
              dangerouslySetInnerHTML={{ __html: blog.title }}
              className={styles.Title}
            />

            <TitleUser
              authorImage={blog.author.image}
              authorjoiningdate={blog.author.createdAt}
              authorname={blog.authorname}
            />
          </div>

          <div
            className={` 
            
            ${currentTheme === "light" ? styles.Content : styles.darkContent} `}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        <div>
          <FeaturedBlogs FBlogs={featuredBlogs} />
        </div>
      </div>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { slug } = context.query;
    const apiUrl = `${process.env.API_BASE_URL}/api/Blog/GetParticularBlog?slug=${slug}`;
    const response = await axios.get(apiUrl);
    const data = await response.data;

    return {
      props: {
        blog: data.blog,
        featuredBlogs: data.featuredBlogs,
      },
    };
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return {
      props: {
        blog: null, // or any default value you want to set
      },
    };
  }
};

export default Blog;
