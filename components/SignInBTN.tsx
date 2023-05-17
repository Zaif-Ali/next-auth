import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const SigninBTN = () => {
  const { data: session, status } = useSession();
  return (
    <div >
      {session ? (
        <>
          <button
            className="rounded-md  px-3 py-1 text-sm hover:text-red-500 dark:hover:text-red-300"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <button
            className="rounded-md  px-3 py-1 text-sm hover:text-green-500 dark:hover:text-green-300 "
            onClick={() => signIn()}
          >
            Sign In Google
          </button>
        </>
      )}
    </div>
  );
};

export default SigninBTN;
