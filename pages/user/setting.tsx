import Wrapper from "@/layout/Wrapper";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import useUser from "@/hooks/User";
interface Props {}

const Setting: NextPage<Props> = ({}) => {
  return (
    <div className=" flex justify-center items-center p-8">
      <Wrapper>
        <div className=" block w-full p-6 bg-white border border-gray-200 rounded-lg  hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-xl ">
          <h5 className="mb-2 text-2xl text-center pb-3 font-bold tracking-tight text-gray-900 dark:text-white">
            Profile Setting
          </h5>
          <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-0 lg:space-x-40 justify-evenly ">
            <UserImage />
            <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-5 md:px-12">
              <h5 className="mb-2 text-xl text-center pb-3 font-semibold  text-gray-900 dark:text-white ">
                Input Data for change
              </h5>
              <div className="flex flex-col pb-3 space-y-3">
                <DisableInput />
                <UserInput />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Setting;

interface FormData {
  gender: string;
  name: string;
}

export const UserInput = () => {
  const { data: session } = useSession();
  const { UpdateUser, isloading } = useUser();

  const initialFormData: FormData = {
    name: session?.user.name as string,
    gender: session?.user.gender as string,
  };

  const [formData, setFormData] = useState<FormData>({ ...initialFormData });

  // Handle input change event
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Update the form data with the new value
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const changedFields: Partial<FormData> = {};

    // Iterate over the form data and compare with the initial form data
    for (const key in formData) {
      if (
        formData[key as keyof FormData] !==
        initialFormData[key as keyof FormData]
      ) {
        // Store the changed fields in the changedFields object
        changedFields[key as keyof FormData] = formData[key as keyof FormData];
      }
    }

    let email = session?.user.email as string;

    // If there are changed fields, call the UpdateUser function
    if (Object.keys(changedFields).length > 0) {
      UpdateUser({ email, changedFields });
    }

    console.log(changedFields);
  };

  // Check if the form data has changed
  const isFormChanged =
    JSON.stringify(formData) !== JSON.stringify(initialFormData);

  return (
    <>
      <div className="pb-3">
        {/* Name */}
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
          Name
        </label>
        <input
          name="name"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-gray-200 "
          value={formData.name}
          type="text"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
          Select Gender
        </label>
        <select
          name="gender"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-gray-200 "
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="Other">Other</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>
      </div>
      <div className="flex justify-end items-end pt-4">
        <button
          disabled={!isFormChanged}
          className="disabled:opacity-30 bg-indigo-500 text-gray-200 dark:text-gray-100 font-semibold px-5 py-2 rounded-lg "
          onClick={handleSubmit}
        >
          {isloading ? "Loading" : "Submit"}
        </button>
      </div>
    </>
  );
};

export const DisableInput: NextPage<Props> = ({}) => {
  const { data: session } = useSession();
  return (
    <>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          Your Email
        </label>
        <div className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 flex justify-between ">
          {session?.user.email}
        </div>
      </div>
    </>
  );
};
export const UserImage = () => {
  const { data: session } = useSession();

  return (
    <div className=" bg-gray-50 dark:bg-gray-800   rounded-lg p-8 md:p-12 flex justify-center items-center">
      {/* User Image  */}
      <div className="relative border-white dark:border-gray-700 rounded-full h-56 w-56 object-contain object-center z-10 ">
        <Image
          src={session?.user.image as string}
          alt={session?.user.name as string}
          className="rounded-full"
          fill
        />
      </div>
    </div>
  );
};
