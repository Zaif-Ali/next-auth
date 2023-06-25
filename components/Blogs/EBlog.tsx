import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  excerpt: string;
  slug: string;
  name: string;
  image: string;
  date: string;
}

const EBlog: NextPage<Props> = ({
  title,
  excerpt,
  slug,
  name,
  image,
  date,
}) => {
  return (
    <Link href={`/Blogs/${slug}`}>
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            <svg
              className="mr-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                clipRule="evenodd"
              ></path>
              <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
            </svg>
            Article
          </span>
          <span className="text-sm">{date}</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className={`mb-5 font-light text-gray-500 dark:text-gray-400 `}>
          {excerpt}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image
              width={28}
              height={28}
              className="w-7 h-7 rounded-full"
              src={image}
              alt="Bonnie Green avatar"
            />
            <span className="font-medium dark:text-white">{name}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EBlog;
