import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiSettings } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import React from "react";
interface Props {}

const UserDropDown: NextPage<Props> = ({}) => {
  // Rourer Hook
  const router = useRouter();
  // Handle Sign out
  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };
  // Get user data
  const { data: session } = useSession();
  // Links whose shown in the dropdown
  const menuLinks = [
    {
      title: "Profile",
      url: `/user/profile/${session?.user.email}`,
      icon: <AiOutlineUser />,
      isProtected: false,
    },
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <AiOutlineUser />,
      isProtected: true,
    },
    {
      title: "Setting",
      url: "/user/setting",
      icon: <FiSettings />,
      isProtected: false,
    },
  ];

  // Filter the menuLinks array based on the user's role and the isProtected property
  const filteredMenuLinks = menuLinks.filter(
    (link) => !link.isProtected || (session && session.user.role === "admin")
  );

  return (
    <div
      className={` 
z-10  top-10  absolute right-0  mt-1 flex w-60 md:w-96  origin-top-right flex-col rounded-xl py-6 text-white shadow-lg focus:outline-none bg-gray-900 dark:bg-white`}
    >
      <div className="mb-4 flex gap-4 px-6 text-sm">
        {session?.user.image && (
          <div className="relative h-10 w-10 ">
            <Image
              src={session?.user.image}
              alt={session?.user.name}
              className="inline-block rounded-full"
              fill
            />
          </div>
        )}
        <div>
          <p className="font-medium text-stone-300 dark:text-stone-700  ">
            {session?.user.name || "User name"}
          </p>
          <p className="text-stone-400">{session?.user.email}</p>
        </div>
      </div>
      <div className="flex flex-col ">
        {/* DropDown  */}
        {filteredMenuLinks.map((link, indes) => {
          return (
            <Link
              href={link.url}
              key={indes}
              className="inline-flex items-center justify-between gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500 hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-300"
            >
              {link.title}
              <span className="text-lg text-gray-400 dark:text-gray-500">
                {link.icon}
              </span>
            </Link>
          );
        })} 
        <button
          className="inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500 hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-300"
          onClick={handleSignOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserDropDown;
