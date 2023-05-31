import { NextPage } from "next";
import useDataCounter from "@/hooks/useDataCounter";
import { TbUsers } from "react-icons/tb";
import { FcDocument } from "react-icons/fc";
import { IconType } from "react-icons/lib";
import Link from "next/link";
interface Props {}

const InforCard: NextPage<Props> = ({}) => {
  const { userCount } = useDataCounter();
  return (
    <>
      <div className="  py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Card title="Users" value={userCount ?? 1} Icon={TbUsers} />
        <Card title="Blogs" value={userCount ?? 1} Icon={FcDocument} />
      </div>
    </>
  );
};

export default InforCard;

interface CardProps {
  value: number;
  title: string;
  Icon: IconType;
}

export const Card: NextPage<CardProps> = ({ title, value, Icon }) => {
  return (
    <Link href={"/admin/dashboard/VeiwUsers"}>
      <div
        className="relative flex items-center justify-between  rounded-xl p-4 shadow-2xl border dark:border-0 border-gray-200 md:p-4 lg:p-8 
      hover:opacity-90  cursor-pointer dark:bg-gray-800/30"
      >
        <div>
          <h1 className="mt-4 text-xl md:text-5xl lg:text-6xl font-semibold text-gray-900 dark:text-gray-100 ">
            {value}
          </h1>

          <p className="mt-2  font-bold text-xl md:text-xl sm:block text-gray-700 dark:text-gray-100/70">
            Total {title}
          </p>
        </div>

        <span className="rounded-full px-3 py-2.5 text-xs font-medium ">
          <Icon className="h-8 w-8 sm:h-20 sm:w-20 text-purple-800 " />
        </span>
      </div>
    </Link>
  );
};
