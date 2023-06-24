import useUser from "@/hooks/User";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const FollowUserButton = ({
  PersonIdentifier,
  followingList,
  PersonId,
}: {
  PersonIdentifier: string;
  followingList: string[];
  PersonId: string;
}) => {
  // Custom user hook
  const { FollowUser, isloading, Error } = useUser();
  const { data: session, status } = useSession();
  // state to handle the follow button
  const [Followbutton, setFowlowbutton] = useState<{
    buttonName: string;
    isDisabled: boolean;
    buttonStyle?: string;
  }>(
    // Setting Default valus of the state according to the conditions
    () => {
      // if the next user already have a following of the user
      if (followingList?.includes(session?.user.email as string)) {
        return {
          buttonName: "Already Follow",
          isDisabled: true,
        };
      }
      // if the both user are same
      else if (session?.user.email === PersonIdentifier) {
        return {
          buttonName: "Follow",
          isDisabled: true,
        };
      }
      // else any other condition
      return {
        buttonName: "Follow",
        isDisabled: false,
      };
    }
  );
  // Handle followbutton
  const handleFollowButton = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Hello handleFollowButton ");

    if (status === "unauthenticated") {
      toast.error("You have to sign in first");
      return;
    }

    // set the button to the loading state
    setFowlowbutton(() => {
      return {
        buttonName: "loading",
        isDisabled: true,
        buttonStyle: "cursor-wait",
      };
    });
    // console.log(PersonId)
    await FollowUser(PersonId);
    // reset the follow button
    setFowlowbutton(() => {
      return {
        buttonName: "Already Follow",
        isDisabled: true,
        buttonStyle: "cursor-default",
      };
    });
  };
  return (
    <>
      <button
        className={`py-1 w-full text-2xl font-medium  text-gray-100 rounded-lg bg-blue-600 disabled:bg-blue-500 disabled:opacity-25 ${Followbutton.buttonStyle}`}
        onClick={handleFollowButton}
        disabled={Followbutton.isDisabled}
      >
        {Followbutton.buttonName}
      </button>
    </>
  );
};
