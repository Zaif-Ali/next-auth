import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/hooks/User";
import { NextPage } from "next";
import Image from "next/image";
import { useEffect } from "react";

interface Props {
  authorname: string;
  authorjoiningdate: string;
  authorImage: string;
  authoremail: string;
}

const TitleUser: NextPage<Props> = ({
  authorname,
  authorjoiningdate,
  authorImage,
  authoremail,
}) => {
  return (
    <HoverCard openDelay={390}>
      <HoverCardTrigger className="w-fit cursor-pointer hover:opacity-60  ">
        <div className="flex items-end  space-x-4">
          <Image
            className="w-10 h-10 rounded-full"
            src={authorImage}
            alt={authorname}
            width={40}
            height={40}
          />
          <div className="font-medium dark:text-white">
            <div>{authorname}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Joined in {authorjoiningdate}
            </div>
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent
        align="center"
        className="pb-3 
      w-full bg-gradient-to-b from-gray-100 to-gray-50 dark:from-slate-900 dark:to-slate-800
     border-2 border-gray-200 shadow-2xl rounded-xl dark:border-gray-700 "
      >
        <UserContent authoremail={authoremail} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default TitleUser;

// User Content whose shown in the user card

export const UserContent = ({ authoremail }: { authoremail: string }) => {
  const { GetUser, isloading, user } = useUser();
  useEffect(() => {
    if (!user) GetUser(authoremail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authoremail]);
  return (
    <div className="p-1 ">
      <div className="flex items-center space-x-4">
        {isloading ? (
          <>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </>
        ) : (
          <div className="flex  flex-col">
            <div className=" flex p-3 py-1 gap-2 ">
              {(user?.image as string) && (
                <Image
                  src={user?.image as string}
                  width={48}
                  height={48}
                  alt={user?.name as string}
                  className="h-12 w-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-gray-800 dark:text-slate-200  ">
                  {(user?.name as string) || "User name"}
                </p>
                <p className="text-gray-800 dark:text-slate-200">
                  {user?.email as string}
                </p>
              </div>
            </div>
            <div className="py-3 flex flex-col items-center">
              <button className="py-1 w-full text-2xl font-medium  text-gray-100 rounded-lg bg-blue-600">
                Follow{" "}
              </button>
              <div className="  text-center w-52 pt-3 font-medium">
                {user?.name as string} have a {user?.followers.length}{" "}
                <span className="text-[#8E2DE2] dark:text-indigo-200  -tracking-tighter  font-medium scroll-m-20">
                  followers{" "}
                </span>
                with {user?.following.length}{" "}
                <span className="text-[#8E2DE2] dark:text-indigo-200  -tracking-tighter  font-medium scroll-m-20">
                  following
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
