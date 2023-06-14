import { NextPage } from "next";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SigninBTN from "./SignInBTN";
import { useRouter } from "next/router";
import { FcMenu } from "react-icons/fc";


interface MenuLink {
  title: string;
  url: string;
  isProtected: boolean;
}

interface Props {}

const Header: NextPage<Props> = ({}) => {
  
  const [isNavbarHidden, setIsNavbarHidden] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  const toggleNavbar = () => {
    setIsNavbarHidden((prev) => !prev);
  };

  const closeMenu = () => {
    setIsNavbarHidden(true);
  };

  const menuLinks: MenuLink[] = [
    { title: "Home", url: "/", isProtected: false },
    { title: "Blogs", url: "/Blogs", isProtected: false },
    { title: "Create Content", url: "/addBlog", isProtected: true },
  ];

  const filteredMenuLinks = menuLinks.filter(
    (link) => !link.isProtected || (link.isProtected && session)
  );
  return (
    <>
      <div className=" pb-20 ">
        <nav className="top-0 w-full fixed backdrop-filter backdrop-blur-3xl md:backdrop-blur-lg z-50">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Main name */}
            <Link
              href={"/"}
              className="self-center text-2xl font-bold whitespace-nowrap text-gray-900 dark:text-white"
            >
              Final
            </Link>
            {/* create account or user avatar this one is only visible on mobiles hidden on larger  machines*/}
            <div className="flex ">
              {" "}
              <div className="md:self-center md:hidden">
                <SigninBTN />
              </div>
              {/* main menu button  */}
              <button
                data-collapse-toggle="navbar-default"
                onClick={toggleNavbar}
                type="button"
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 dark:focus:ring-0 ring-gray-300 "
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <FcMenu className="w-6 h-6" />
              </button>
            </div>
            {/* main menu items  */}
            <div
              className={`${
                isNavbarHidden ? "hidden" : ""
              } w-full md:block md:w-auto `}
              id="navbar"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
                {filteredMenuLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      onClick={closeMenu}
                      className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md
    :p-0   dark:hover:bg-gray-700  md:dark:hover:bg-transparent ${
      router.pathname === link.url
        ? "text-blue-500 hover:text-blue-600 "
        : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
    }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
                {/* create account or user avatar  this one is only visible on larger machines hidden on mobiles */}
                <li className="md:self-center hidden md:block">
                  <SigninBTN />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
