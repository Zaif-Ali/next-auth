import { NextPage } from "next";
import Image from "next/image";

import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import UserDropDown from "./UserDropDown";
interface Props {}

export const UserImage: NextPage<Props> = ({}) => {
  // Get user data
  const { data: session, status } = useSession();

  // State to control DropDown
  const [isDropDown, setisDropDown] = useState(false);
  // Detect user click outside of the dropdown
  const ref = useClickOutside(() => setisDropDown(false));

  // Toggle Navbar
  const toggleNavbar = () => {
    setisDropDown((prev) => !prev);
  };

  // UI
  return (
    <>
      <div ref={ref}>
        {session?.user.image && (
          <>
            <div className="relative h-10 w-10 ">
              <button onClick={toggleNavbar}>
                {session.user.image ? (
                  <>
                    {" "}
                    <Image
                      src={session?.user.image}
                      alt={session?.user.name}
                      className="inline-block rounded-full"
                      fill
                    />
                  </>
                ) : (
                  // default image
                  <>
                    <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-stone-100">
                      <svg
                        className="h-full w-full text-stone-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  </>
                )}
              </button>
              <div>
                {isDropDown && <UserDropDown setisDropDown={setisDropDown} />}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
