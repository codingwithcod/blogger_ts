import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import likeIcon from "../assets/like.svg";
import likeFillIcon from "../assets/likeFill.svg";
import useAuthStore from "../store/authStore";
import { toast, Toaster } from "react-hot-toast";
import { AiFillLike } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BlogCard = ({ blog }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState();
  const [isAnimate, setIsAnimate] = useState(false);
  const { heading, fImage, description, userId, createdAt, _id, likes } = blog;
  const { userProfile } = useAuthStore();
  /** check blog already like or not */
  useEffect(() => {
    const isLikedBlog = async () => {
      const response = await fetch(`${BASE_URL}/blog/is-liked/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userProfile.access_token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIsLiked(data.isLiked);
      }
    };
    if (userProfile) {
      isLikedBlog();
    }
    setLikeCount(blog.likes?.length);
  }, [userProfile]);

  const likeBlog = async () => {
    const response = await fetch(`${BASE_URL}/blog/like-blog/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userProfile.access_token}`,
      },
    });
    const data = await response.json();
  };

  /** for animate like button */
  const handleAnimate = () => {
    setTimeout(() => {
      setIsAnimate(false);
    }, 1000);
  };

  return (
    <div className=" flex  justify-center items-center flex-row gap-1 sm:gap-5  border-b border-gray-300 m-2 md:m-5 h-auto    ">
      <Toaster />
      <div className="w-[100%] sm:w-[60%] md:w-[80%]  ">
        <div className="user-profile flex items-center gap-2">
          <img
            src={userId.picture}
            width={30}
            height={30}
            alt="profile"
            className="rounded-full"
          />
          <span className="text-md font-bold">{userId.name}</span>
        </div>
        <div className="p-2 z-50 ">
          <Link to={`/blog/${_id}`}>
            <h2 className="text-lg md:text-2xl  font-semibold tracking-wide">
              {heading}
            </h2>
            <p className="sm:hidden">{description.slice(0, 60)}...</p>
            <p className="hidden sm:block">{description.slice(0, 300)}...</p>
          </Link>
          <div className="icons flex items-center gap-3 mt-2">
            <span className="text-gray-400 text-xs">
              {moment(createdAt).fromNow()}
            </span>

            <span
              onClick={() => {
                if (userProfile) {
                  setIsLiked((prev) => !prev);
                  likeBlog();
                  if (isLiked) {
                    setLikeCount((prev) => prev - 1);
                  } else {
                    setLikeCount((prev) => prev + 1);
                    setIsAnimate(true);
                    handleAnimate();
                  }
                } else {
                  toast.error("Please sign in first !!");
                }
              }}
              className="px-3 md:px-5 py-[1px] md:py-[2px]  text-red-500 border border-slate-300  rounded-full  text-sm font-semibold flex justify-center items-center  hover:bg-red-100 hover:border-red-100  cursor-pointer gap-1 "
            >
              {isLiked ? (
                <AiFillLike
                  className={`text-lg text-slate-800  ease-out  ${
                    isAnimate ? "animate-ping" : ""
                  }`}
                />
              ) : (
                <AiFillLike className="text-lg text-slate-400 " />
              )}
              <span className="text-md pl-2  border-l border-slate-400 text-slate-700 in">
                {likeCount}
              </span>
            </span>
          </div>
        </div>
      </div>
      {/* ======================= */}
      <div className="w-[40%] h-[30%]  md:w-[15%] md:h-[60%]  flex justify-center item-center ">
        <Link to={`/blog/${_id}`}>
          <img src={fImage} className="object-cover" alt="fImage" />
        </Link>
      </div>
    </div>
    // </Link>
  );
};

export default BlogCard;

{
  /* <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-700 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-700 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-700 rounded col-span-2"></div>
          <div class="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-700 rounded"></div>
      </div>
    </div>
  </div>
</div>; */
}
