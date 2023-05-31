/* eslint-disable react-hooks/exhaustive-deps */
import useUser from "@/hooks/User";
import { NextPage } from "next";
import { useEffect } from "react";

import { useRouter } from "next/router";
import Wrapper from "@/layout/Wrapper";
import UserImageonProfile from "@/components/UserImageonProfile";
import { useSession } from "next-auth/react";
interface Props {}

const UserProfile: NextPage<Props> = ({}) => {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <div className="p-7">
        <div
          className="flex flex-col justify-center p-5  bg-gradient-to-bl from-gray-50 to-gray-300/40  
         text-gray-800 dark:bg-gradient-to-bl dark:from-gray-700 dark:to-gray-900 dark:text-gray-200 rounded-2xl shadow-lg dark:shadow-md shadow-slate-300 dark:shadow-slate-900 "
        >
          {/* image  */}
          <UserImageonProfile
            ImageSRC={session?.user.image as string}
            ImageALT={session?.user.name as string}
          />
          {/* content */}
          <div className=" flex flex-col justify-center items-center p-3 space-y-3">
            <div className="font-bold font-sans text-3xl dark:text-white">
              {session?.user.name}
            </div>
            <div className="text-xl font-sans opacity-90">
              {session?.user.email}
            </div>
            <div className="text-sm  flex flex-col md:flex-row items-center">
              <span>200 Follwers</span>
              <span className="hidden md:block text-lg text-gray-500 dark:text-gray-400 px-1 font-extrabold">
                .
              </span>
              <span>123 Following</span>
            </div>
            <div className="text-lg py-2 text-center">
              Description Lorem ipsum dolor sit. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit.
            </div>
            <div>Joined on 12.12.2002</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserProfile;
