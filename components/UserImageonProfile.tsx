import { NextPage } from "next";
import Image from "next/image";
interface Props {
  ImageSRC: string;
  ImageALT: string;
}

const UserImageonProfile: NextPage<Props> = ({ ImageSRC, ImageALT }) => {
  return (
    <div className="flex justify-center items-center z-10 ">
      <div className=" relative border-4 border-white dark:border-gray-700 rounded-full h-32 w-32 object-contain object-center  z-10">
        <Image
          src={ImageSRC}
          alt={ImageALT}
          className="rounded-full "
          fill
        />
      </div>
    </div>
  );
};

export default UserImageonProfile;
