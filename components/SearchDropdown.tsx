import { NextPage } from "next";
import { useState } from "react";
import { FcFilledFilter } from "react-icons/fc";
import { BsArrowDownShort } from "react-icons/bs";
import { useClickOutside } from "@mantine/hooks";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/types/Global";
import { SetFilterValue, SetSearchValue } from "@/app/Reducers/FilterUsers";

interface Props {}

interface RadioOption {
  label: string;
  value: string;
}
export const options: RadioOption[] = [
  { label: "All", value: "All" },
  { label: "Verified", value: "Verified" },
  { label: "Admin", value: "Admin" },
  { label: "Max Followers", value: "Max_Followers" },
  { label: "Min Blogs", value: "Minimum_Blogs" },
  { label: "Max Blogs", value: "Maximum_Blogs" },
];
const SearchDropdown: NextPage<Props> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Navbar
  const toggleDropDown = () => {
    setIsOpen((prev) => !prev);
  };

  // get the current state value
  const selector = useSelector(
    (state: RootState) => state.persistedReducer.filteruser.FilterValue
  );

  const dispatch = useDispatch();

  const handleOptionClick = (value: string) => {
    // console.log(value);
    // update the state of the filter user reducer
    dispatch(SetFilterValue(value));
    setIsOpen(false);
  };
  // Detect user click outside of the dropdown
  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div className=" pt-3 md:pt-0 w-full md:w-fit   ">
      <button
        id="dropdownRadioButton"
        data-dropdown-toggle="dropdownRadio"
        className="inline-flex flex-row w-full items-center justify-between text-gray-500 bg-gray-200 border border-gray-200 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-8 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
        ref={ref}
        onClick={toggleDropDown}
      >
        <FcFilledFilter className="w-5 h-5 mr-2 " />

        {selector
          ? options.find((option) => option.value === selector)?.label
          : "All"}

        <div className="  flex items-center pl-1 pointer-events-none">
          <BsArrowDownShort className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      </button>

      {/* List  */}
      {isOpen && (
        <div
          ref={ref}
          id="dropdownRadio"
          className="z-30 absolute right-6  
          md:left-10   mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul className="p-3 border dark:border-0 rounded-3xl text-sm bg-gray-50 dark:bg-gray-700">
            {options.map((option) => (
              <li key={option.value}>
                <div
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600
                  "
                  onClick={() => handleOptionClick(option.value)}
                >
                  <label
                    htmlFor="filter-radio-example-1"
                    className=" ml-2 text-sm font-medium text-gray-700 rounded dark:text-gray-300"
                  >
                    {option.label}
                  </label>
                </div>
              </li>
            ))}{" "}
          </ul>{" "}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;

export const SearchBar = () => {
  const dispatch = useDispatch();
  // handle search function
  const HandleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Adding search value in the state for live searching
    dispatch(SetSearchValue(e.target.value));
  };
  return (
    <>
      <div className="flex-1 w-full md:w-[65%] lg:w-[70%] ">
        <form className="flex items-center">
          <label htmlFor="live-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <AiOutlineSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="simple-search"
              onChange={HandleSearchValue}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-purple-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
              "
              placeholder="Try Live Search"
              required
            />
          </div>
        </form>
      </div>
    </>
  );
};
