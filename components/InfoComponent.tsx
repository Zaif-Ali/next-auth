import Link from "next/link";
import React from "react";
import { SlArrowRight } from "react-icons/sl";
const InfoComponent = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
              Welcome to Final, where{" "}
              <span className="font-extrabold">authentication</span> meets
              simplicity
            </h2>
            <p className="mb-4 font-medium">
              Welcome to Final, the ultimate destination for fully authenticated
              websites! Our site is designed to provide secure and reliable
              online experiences to our users. We use advanced authentication
              technologies to ensure the safety of your personal information and
              data. We are continuously improving our site to offer you the best
              experience possible. Stay tuned for exciting new updates and
              features in the coming days as we work to enhance our platform and
              keep your online interactions secure.
            </p>
            <p className="mb-4 font-light">
              If you like our project and our vision of creating a fully
              authenticated site, we would greatly appreciate your support. Your
              positive feedback, sharing our site with others, and any
              contributions you can make will help us improve and grow our
              platform.
            </p>
            <Link
              href="/"
              className="inline-flex items-center font-medium text-primary-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
            >
              View Code
              <SlArrowRight className="ml-3  w-5 h-5"/>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoComponent;
