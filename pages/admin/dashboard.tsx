import Wrapper from "@/layout/Wrapper";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
interface Props {}

const Dashboard: NextPage<Props> = ({}) => {
  const {data:session} = useSession();
  return (
    <Wrapper>
      <div className="p-2">
        <h5 className="mb-2 text-2xl md:text-4xl px-3 pb-3 font-bold tracking-tight text-gray-700 dark:text-white">
          Welcome
          <span
            className="
            p-2
           text-indigo-800 dark:text-indigo-500"
          >
            {session?.user.name}!
          </span>
        </h5>
      </div>
      <div>
        
      </div>
    </Wrapper>
  );
};

export default Dashboard;
