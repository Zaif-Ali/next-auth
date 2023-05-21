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
                <Image
                  src={session?.user.image}
                  alt={session?.user.name}
                  className="inline-block rounded-full"
                  fill
                />
              </button>
              <div>{isDropDown && <UserDropDown />}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
