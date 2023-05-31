import React from "react";
import UserCard from "@/components/UserCard";
import Wrapper from "@/layout/Wrapper";
import { NextPage } from "next";

import UseAllUsers from "@/hooks/useAllUsers";
import SK_UserCard from "@/components/skeleton/SK_UserCard";
import SearchDropdown, { SearchBar } from "@/components/SearchDropdown";

interface Props {}

const VeiwUsers: NextPage<Props> = ({}) => {
  const { error, loading, users } = UseAllUsers();

  return (
    <Wrapper className="pt-6">
      <div className="flex flex-col-reverse md:flex-row items-end md:items-center md:space-x-3 ">
        <SearchDropdown />
        <SearchBar/>
      </div>
      <Wrapper className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        {loading ? (
          <>
            {Array.from({ length: 6 }, (_, index) => (
              <SK_UserCard key={index} />
            ))}
          </>
        ) : (
          users?.map((EachUser, key) => {
            return <UserCard key={key} EachUser={EachUser} />;
          })
        )}
      </Wrapper>
    </Wrapper>
  );
};

export default VeiwUsers;
