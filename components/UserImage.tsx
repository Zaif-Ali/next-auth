import { NextPage } from "next";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  ImageSRC: string;
  UserName: string;
  UserEmail: string;
}

export const UserImage: NextPage<Props> = ({ ImageSRC, UserName }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <>
      <div className="relative">
        <div>
          {ImageSRC && (
            <div className="relative h-10 w-10">
              <button onClick={handleSignOut}>
                <Image
                  src={ImageSRC}
                  alt={UserName}
                  className="inline-block rounded-full"
                  fill
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
