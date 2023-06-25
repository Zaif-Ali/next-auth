import styles from "./../../styles/index.module.css";
import FeaturedBlogs from "@/components/Blogs/FeaturedBlogs";
import TitleUser from "@/components/Blogs/TitleUser";
import { BlogInfoBTN } from "@/components/Button/BlogInfoBTN";
import { IBlog } from "@/hooks/useBlog";
import Wrapper from "@/layout/Wrapper";
import { FIBlog } from "@/model/Blog";
import axios from "axios";
import { NextPage, GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useRouter } from "next/router";
import { MdArrowBack } from "react-icons/md";

interface Props {
  blog: FIBlog;
  featuredBlogs: IBlog[];
}

const Blog: NextPage<Props> = ({ blog, featuredBlogs }) => {
  const router = useRouter();
  const { slug } = router.query;
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const { data: session } = useSession();

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
      {/* Push back button  */}
      <button
        onClick={() => {
          router.back();
        }}
        className=" rounded-full  text-gray-400 hover:text-gray-500 animate-accordion-up"
      >
        <MdArrowBack className="w-8 h-8" />
      </button>
      <div className="flex flex-col p-1 ">
        <div className="flex-wrap p-3 md:p-4 ">
          <div className="flex flex-col pb-10">
            <div className="flex flex-col  justify-evenly pb-4">
              <div
                dangerouslySetInnerHTML={{ __html: blog.title }}
                className={styles.Title}
              />
              {/* Blogs Information  */}
              <BlogInfoBTN blog={blog} />
            </div>
            {/* Blog author Information */}
            <TitleUser
              authorImage={blog.author.image}
              authorjoiningdate={blog.author.createdAt}
              authorname={blog.authorname}
              authoremail={blog.authoremail}
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
