import React, { useEffect, useState } from "react";
import { ImSun } from "react-icons/im";
import { BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
const ThemeChange = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;
 

  const HandleChangeTheme = () => {
    if (!mounted) return null;
    if (currentTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={`z-30 fixed  right-3 bottom-4 rounded-full p-2    ${
                currentTheme === "dark" ? " bg-gray-800" : "bg-gray-900"
              }`}
              onClick={HandleChangeTheme}
            >
              {currentTheme === "dark" ? (
                <ImSun className=" w-5 h-5 " />
                ) : (
                <BsFillMoonFill className="fill-gray-50 w-5 h-5 " />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <span className={` text-sm right-8 bottom-0 pb-2 font-semibold ${currentTheme === "dark" ? "text-yellow-300 " : ""}`}>
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ThemeChange;
