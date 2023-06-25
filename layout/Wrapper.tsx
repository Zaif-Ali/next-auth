import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <>
      <div
        className={`w-full max-w-[1280px] px-2 md:px-3 lg:px-5    mx-auto container ${
          className || ""
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default Wrapper;
