import useBlog from "@/hooks/useBlog";
import { FIBlog } from "@/model/Blog";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { IconType } from "react-icons/lib";

interface BTNState {
  Btn_Style: string;
  Icon: IconType;
  BlogLikes: number;
}

export const BlogInfoBTN = ({ blog }: { blog: FIBlog }) => {
  const { data: session, status } = useSession();
  const PersonId = session?.user.id;
  const { LikeBlog, blog: updatedBlog } = useBlog();
  const [BlogLike, setBlogLike] = useState<BTNState>({
    Btn_Style: "",
    Icon: AiOutlineHeart,
    BlogLikes: 0,
  });

  useEffect(() => {
    if (status === "loading") {
      // Set loading state
      setBlogLike({
        Btn_Style: "cursor-wait",
        Icon: AiOutlineHeart,
        BlogLikes: 0,
      });
    } else if (status === "authenticated") {
      // Set liked/unliked state

      const isLiked = updatedBlog
        ? updatedBlog?.likedBy.includes(PersonId as string)
        : blog.likedBy.includes(PersonId as string);

      setBlogLike({
        Btn_Style: isLiked ? "" : "fill-red-500",
        Icon: isLiked ? FcLike : AiOutlineHeart,
        BlogLikes: updatedBlog
          ? updatedBlog.likedBy.length
          : blog.likedBy.length,
      });
    }
  }, [status, blog, PersonId, updatedBlog]);

  const HandleClickLike = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (status === "unauthenticated") {
      toast.error("You have to sign in first to like the blog");
      return;
    }
    setBlogLike((prevState) => ({
      ...prevState,
      Btn_Style: "cursor-wait",
      Icon: FcLike,
    }));

    try {
      const liked = await LikeBlog(blog._id);

      return setBlogLike((prevState) => ({
        ...prevState,
        Btn_Style: liked ? "" : "fill-red-500",
        Icon: liked ? FcLike : AiOutlineHeart,
        BlogLikes:
          (updatedBlog ? updatedBlog.likedBy.length : blog.likedBy.length) +
          (liked ? 1 : -1),
      }));
    } catch (error) {
      toast.error("Failed to like the blog. Please try again.");
    }
  };

  if (status === "loading") {
    // Render loading state
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-end items-center pr-10">
      <div className="flex space-x-1">
        <button
          onClick={HandleClickLike}
          disabled={status === "unauthenticated"}
        >
          <BlogLike.Icon className={`w-6 h-6 ${BlogLike.Btn_Style}`} />
        </button>
        <span>{BlogLike.BlogLikes}</span>
      </div>
    </div>
  );
};
