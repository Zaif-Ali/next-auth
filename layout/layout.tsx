import { NextPage } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col ">
        <Toaster position="top-center" reverseOrder={false} />
        {children}
    </div>
  );
};

export default Layout;
