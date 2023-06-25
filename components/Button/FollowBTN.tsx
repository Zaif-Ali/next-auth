import useUser from "@/hooks/User";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const FollowUserButton = ({
  PersonIdentifier,
  followersList,
  PersonId,
}: {
  PersonIdentifier: string;
  followersList: string[];
  PersonId: string;
}) => {
  // Custom user hook
  const { FollowUser } = useUser();
  const { data: session, status } = useSession();   

  // state to handle the follow button
  const [followButton, setFollowButton] = useState<{
    buttonName: string;
    isDisabled: boolean;
    buttonStyle?: string;
  }>(() => {
    if (followersList?.includes(session?.user.id as string)) {
      return {
        buttonName: "Already Followed",
        isDisabled: true,
      };
    } else if (session?.user?.email === PersonIdentifier) {
      return {
        buttonName: "Follow",
        isDisabled: true,
      };
    }
    return {
      buttonName: "Follow",
      isDisabled: false,
    };
  });

  // Handle follow button
  const handleFollowButton = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (status === "unauthenticated") {
      toast.error("You have to sign in first");
      return;
    }

    setFollowButton((prevState) => ({
      ...prevState,
      buttonName: "Loading",
      isDisabled: true,
      buttonStyle: "cursor-wait",
    }));

    try {
      await FollowUser(PersonId);
      setFollowButton((prevState) => ({
        ...prevState,
        buttonName: "Already Followed",
        isDisabled: true,
        buttonStyle: "cursor-default",
      }));
    } catch (error) {
      console.error("Error following user:", error);
      toast.error("Failed to follow user. Please try again.");

      setFollowButton((prevState) => ({
        ...prevState,
        buttonName: "Follow",
        isDisabled: false,
        buttonStyle: "",
      }));
    }
  };

  useEffect(() => {
    console.log("State Updated:");
    console.log(followButton);
  }, [followButton]);

  return (
    <button
      className={`py-1 w-full text-2xl font-medium text-gray-100 rounded-lg bg-blue-600 disabled:bg-blue-500 disabled:opacity-25 ${followButton.buttonStyle}`}
      onClick={handleFollowButton}
      disabled={followButton.isDisabled}
    >
      {followButton.buttonName}
    </button>
  );
};
