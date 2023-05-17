import { NextPage } from "next";
import { ReactNode } from "react";
import Wrapper from "./Wrapper";

interface Props {
  children: ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col ">
      <Wrapper>
        {children}
        </Wrapper>
    </div>
  );
};

export default Layout;
