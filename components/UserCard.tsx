import { IUser } from "@/types/Global";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import CardModal from "./modal/CardModal";
import { useClickOutside } from "@mantine/hooks";
interface Props {
  EachUser: IUser;
}

const UserCard: NextPage<Props> = ({ EachUser }) => {
  const ref = useClickOutside(() => setIsOpen(false)); 
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <button type="button" onClick={openModal}  >
      <CardModal closeModal={closeModal} isOpen={isOpen}  />
      <div
        className="w-full max-w-sm  border dark:border-0 border-gray-200 rounded-lg 
      shadow-xl dark:shadow-2xl  dark:border-gray-700 dark:bg-gradient-to-b dark:from-[#8E2DE2] dark:to-[#4A00E0] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 duration-100 "
      >
        <div className="flex flex-col items-center pb-5 py-2">
          <Image
            className="w-16 h-16 lg:w-20 lg:h-20 mb-3 rounded-full shadow-lg"
            src={EachUser.image}
            alt={EachUser.name}
            width={96}
            height={96}
          />
          <div className="mb-1 flex text-base justify-between items-center lg:text-xl font-medium text-gray-900 dark:text-white">
            {EachUser.name}
            <span>
              {EachUser.isVerified && (
                <MdOutlineVerified className=" fill-blue-900  dark:fill-gray-50" />
              )}
            </span>
          </div>
          <span className="text-xs lg:text-sm text-gray-900 dark:text-gray-300">
            {EachUser.email}
          </span>
        </div>
      </div>
    </button>
  );
};

export default UserCard;
