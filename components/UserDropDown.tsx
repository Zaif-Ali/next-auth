import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const { data: session, status } = useSession();
  // Links whose shown in the dropdown
  const menuLinks = [
    { title: "Setting", url: "/setting" },
    { title: "Profile", url: "/profile" },
  ];
  return (
    <div
      className={` 
z-10  top-10  absolute right-0 mt-1 flex w-72 md:w-96 origin-top-right flex-col rounded-xl py-6 text-white shadow-lg focus:outline-none bg-gray-900 dark:bg-white`}
    >
      <div className="mb-4 flex gap-4 px-6 text-sm">
        {session?.user.image && (
          <div className="relative h-10 w-10">
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
        {menuLinks.map((link, indes) => {
          return (
            <button
              key={indes}
              className="inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500 hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-300"
            >
              <Link href={link.url}>{link.title}</Link>
            </button>
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
