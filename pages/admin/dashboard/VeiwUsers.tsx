import React from "react";
import UserCard from "@/components/UserCard";
import Wrapper from "@/layout/Wrapper";
import { NextPage } from "next";
import { useEffect } from "react";

import UseAllUsers from "@/hooks/useAllUsers";
import SK_UserCard from "@/components/skeleton/SK_UserCard";
import SearchDropdown, { SearchBar } from "@/components/SearchDropdown";
import { RootState } from "@/types/Global";
import { useSelector } from "react-redux";

interface Props {}

const VeiwUsers: NextPage<Props> = ({}) => {
  const { error, loading, users, GetAll } = UseAllUsers();
  // get the current state value
  const { FilterValue, SearchValue, Refresh } = useSelector(
    (state: RootState) => state.persistedReducer.filteruser
  );

  // Here we have a all users
  // use Effect run when the value  of the dropdown and search value are changed
  useEffect(() => {
    GetAll();
  }, [FilterValue, SearchValue]);

  return (
    <Wrapper className="pt-6">
      <div className="flex flex-col-reverse md:flex-row items-end md:items-center md:space-x-3 ">
        <SearchDropdown />
        <SearchBar />
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
