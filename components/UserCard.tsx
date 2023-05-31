import { IUser } from "@/types/Global";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";

interface Props {
  EachUser : IUser
}

const UserCard: NextPage<Props> = ({EachUser}) => {
  const { data: session } = useSession();
  return (
    <>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-5 py-2">
          <Image
            className="w-20 h-20 mb-3 rounded-full shadow-lg"
            src={EachUser.image}
            alt={EachUser.name}
            width={96}
            height={96}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {EachUser.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {EachUser.email}
          </span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add friend
            </button>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
              Veiw Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
