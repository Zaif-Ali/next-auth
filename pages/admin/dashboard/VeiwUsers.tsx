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
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {users?.map((EachUser, key) => {
            return <UserCard key={key} EachUser={EachUser} />;
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default VeiwUsers;
