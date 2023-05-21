import { useSession, signIn } from "next-auth/react";
import {UserImage} from "./UserImage";
const SigninBTN = () => {
  const { data: session, status } = useSession();
  return (
    <div>
      {session ? (
       <>
        <UserImage/>
        
       </>
      ) : (
        <>
          <button
            className="border dark:border-none border-gray-300 bg-blue-500 rounded-md  px-3 py-2 text-sm  text-white  "
            onClick={() => signIn()}
            
          >
            Open Account
          </button>
        </>
      )}
    </div>
  );
};

export default SigninBTN;
