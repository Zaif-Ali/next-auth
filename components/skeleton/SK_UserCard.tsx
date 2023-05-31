import { NextPage } from "next";
import Image from "next/image";
interface Props {}

const SK_UserCard: NextPage<Props> = ({}) => {
  return (
    <>
      <div
        className="w-full max-w-sm border dark:border-0 border-gray-300 
        dark:bg-gradient-to-b dark:from-[#8E2DE2] dark:to-[#4A00E0]
        rounded-lg 
      shadow-md dark:shadow-gray-800 animate-pulse  "
      >
        <div className="flex flex-col items-center pb-5 py-2">
          <svg
            className="w-16 h-16 lg:w-20 lg:h-20 mb-3 rounded-full shadow-lg text-gray-300 border dark:border-gray-500 bg-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-24 mb-2.5 mt-1"></div>
          <span className="w-16 h-2.5 bg-gray-300 rounded-full dark:bg-gray-500 mt-3"></span>
        </div>
      </div>
    </>
  );
};

export default SK_UserCard;
