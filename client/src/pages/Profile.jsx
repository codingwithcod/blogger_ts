import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { BsBookmarksFill } from "react-icons/bs";
import { AiTwotoneLike } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import MyBlogs from "../components/profleCompo/MyBlogs";
import SavedBlogs from "../components/profleCompo/SavedBlogs";
import { Toaster } from "react-hot-toast";
import LoadingProfile from "../components/Loading/LoadingProfile";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Profile = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMyBlog, setIsMyBlog] = useState("my-blog");
  const navigate = useNavigate();
  const { userProfile, removeUser } = useAuthStore();

  const handleLogout = () => {
    removeUser();
    navigate("/");
  };
  useEffect(() => {
    if (!userProfile) {
      navigate("/");
    }
  });
  /** for fetching user profile */
  useEffect(() => {
    const userData = async () => {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userProfile.access_token}`,
        },
      });
      const data = await response.json();
      if (data.success == false) {
        navigate("/");
      } else {
        setUser(data.user);
        setIsLoading(false);
      }
    };
    userData();
  }, []);

  const myBlog = isMyBlog ? " border-black" : " text-gray-400 border-white";
  const liked = !isMyBlog ? " border-black" : " text-gray-400 border-white";

  return (
    <div className=" w-full h-full">
      {isLoading ? (
        <LoadingProfile />
      ) : (
        <>
          <div className="flex  flex-col bg-gray-50">
            <div className="top-box flex flex-col sm:flex-row justify-between  gap-5 p-2  md:max-w-[80%]  ">
              <div className="top-box flex gap-5 p-5  ">
                <div className="image">
                  <img
                    src={userProfile?.picture}
                    alt="profile"
                    className="rounded-full"
                  />
                </div>

                <div className="info flec flex-col gap-2">
                  <h3 className="text-lg uppercase font-semibold">
                    {user?.name}
                  </h3>
                  <h3 className="text-md font-semibold">{user?.email}</h3>
                  <span
                    onClick={handleLogout}
                    className="px-1 md:px-2 py-1 md:py-[6px]  text-blue-500 border border-slate-300  rounded-full  text-sm font-semibold flex justify-center items-center  hover:bg-blue-100 hover:border-blue-100 mt-5 cursor-pointer "
                  >
                    Logout
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-1  fill-indigo-500">
                <span className="text-xl font-semibold ">
                  {user?.followers?.length}
                </span>
                <span className="text-xl font-semibold text-blue-500 ">
                  Followers
                </span>
              </div>
              <div className="flex flex-col justify-center items-center p-1  fill-indigo-500">
                <span className="text-xl font-semibold ">
                  {user?.followings?.length}
                </span>
                <span className="text-xl font-semibold text-blue-500 ">
                  Following
                </span>
              </div>
            </div>

            <div className="p-2 pb-0 flex mx-5 gap-2 border-b">
              <button
                onClick={() => setIsMyBlog("my-blog")}
                className={`font-semibold text-lg border-b-2 flex gap-2 items-center duration-100 ease-in  p-1 ${
                  isMyBlog === "my-blog"
                    ? " border-black"
                    : " text-gray-400 border-white"
                }`}
              >
                <IoIosCreate /> My Blogs
              </button>
              <button
                onClick={() => setIsMyBlog("saved")}
                className={`font-semibold text-lg border-b-2 flex gap-2 items-center duration-100 ease-in p-1 ${
                  isMyBlog === "saved"
                    ? " border-black"
                    : " text-gray-400 border-white"
                }`}
              >
                <BsBookmarksFill /> Saved
              </button>
              <button
                onClick={() => setIsMyBlog("liked")}
                className={`font-semibold text-lg border-b-2 flex gap-2 items-center duration-100 ease-in p-1 ${
                  isMyBlog === "liked"
                    ? " border-black"
                    : " text-gray-400 border-white"
                }`}
              >
                <AiTwotoneLike /> Liked
              </button>
            </div>
          </div>
          <div>
            {isMyBlog === "my-blog" && <MyBlogs />}
            {isMyBlog === "saved" && <SavedBlogs />}
            {isMyBlog === "liked" && <div>liked blogs</div>}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
