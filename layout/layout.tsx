import { NextPage } from "next";
import { ReactNode } from "react";
import Wrapper from "./Wrapper";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col ">
      <Wrapper>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </Wrapper>
    </div>
  );
};

export default Layout;
