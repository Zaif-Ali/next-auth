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
  const renderThemeChanger = () => {
    if (!mounted) return null;

    if (currentTheme === "dark") {
      return (
        <ImSun
          className="w-5 h-5 text-yellow-300 "
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <BsFillMoonFill
          className="w-5 h-5 text-white "
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`z-30 fixed rounded-full right-3 bottom-4 p-3 ${
                currentTheme === "dark" ? "bg-gray-900" : "bg-gray-900"
              }`}
            >
              {renderThemeChanger()}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <span className=" text-sm right-8 bottom-0 ">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ThemeChange;
