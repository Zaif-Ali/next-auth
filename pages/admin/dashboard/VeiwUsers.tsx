import React from "react";
import UserCard from "@/components/UserCard";
import Wrapper from "@/layout/Wrapper";
import { NextPage } from "next";

import UseAllUsers from "@/hooks/useAllUsers";

interface Props {}

const VeiwUsers: NextPage<Props> = ({}) => {
  const { error, loading, users } = UseAllUsers();

  return (
    <Wrapper>
      <div>{error}</div>
      {loading ? (
        <div className="flex flex-col items-center pb-5 py-2">
          <div className="w-20 h-20 mb-3 rounded-full bg-gray-300"></div>
          <div className="w-32 h-4 mt-2 bg-gray-300 rounded-full"></div>
          <div className="w-24 h-4 mt-2 bg-gray-300 rounded-full"></div>
          <div className="w-32 h-4 mt-2 bg-gray-300 rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-3">
          {users?.map((EachUser, key) => {
            return <UserCard key={key} EachUser={EachUser} />;
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default VeiwUsers;
