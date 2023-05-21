import { NextPage } from "next";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface Props {
  ImageSRC: string;
  UserName: string;
  UserEmail: string;
}

export const UserImage: NextPage<Props> = ({
  ImageSRC,
  UserName,
  UserEmail,
}) => {
  // Links whose shown in the dropdown
  const menuLinks = [
    { title: "Setting", url: "/setting" },
    { title: "Profile", url: "/profile" },
  ];
  const [isDropDown, setisDropDown] = useState(false);

  const toggleNavbar = () => {
    setisDropDown((prev) => !prev);
  };

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    
    setisDropDown(false)
    router.push("/");
  };

  return (
    <>
      <div>
        <div>
          {ImageSRC && (
            <>
              <div className="relative h-10 w-10 ">
                <button onClick={toggleNavbar}>
                  <Image
                    src={ImageSRC}
                    alt={UserName}
                    className="inline-block rounded-full"
                    fill
                  />
                </button>
                <div
                  className={` ${
                    isDropDown ? "hidden" : ""
                  } z-10  top-10  absolute right-0 mt-1 flex w-96 origin-top-right flex-col rounded-xl py-6 text-white shadow-lg focus:outline-none bg-gray-900 dark:bg-white`}
                >
                  <div className="mb-4 flex gap-4 px-6 text-sm">
                    {ImageSRC && (
                      <div className="relative h-10 w-10">
                        <Image
                          src={ImageSRC}
                          alt={UserName}
                          className="inline-block rounded-full"
                          fill
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-stone-300 dark:text-stone-700  ">
                        {UserName || "User name"}
                      </p>
                      <p className="text-stone-400">{UserEmail}</p>
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
                    <button className="inline-flex items-center gap-6 px-[34px] py-2 text-sm text-stone-400 dark:text-stone-500 hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-300" onClick={handleSignOut}>
                      Log out
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
