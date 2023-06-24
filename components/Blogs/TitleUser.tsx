import { NextPage } from "next";
import Image from "next/image";

interface Props {
  authorname: string;
  authorjoiningdate: string;
  authorImage: string;
}

const TitleUser: NextPage<Props> = ({
  authorname,
  authorjoiningdate,
  authorImage,
}) => {
  return (
    <div className="flex justify-start">
      <div className="flex items-end   space-x-4">
        <Image
          className="w-10 h-10 rounded-full"
          src={authorImage}
          alt={authorname}
          width={40}
          height={40}
        />
        <div className="font-medium dark:text-white">
          <div>{authorname}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Joined in {authorjoiningdate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleUser;
