import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import useAuthStore from "../../store/authStore";
import likeIcon from "../../assets/like.svg";
import { IoCreateOutline } from "react-icons/io5";
import { MdCloudDone } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SavedBlogs = () => {
  const { userProfile } = useAuthStore();
  const [blogs, setBlogs] = useState([]);

  // /** for fetching my blogs section blogs */
  useEffect(() => {
    const fetchMyBlogs = async () => {
      const response = await fetch(`${BASE_URL}/user/my-saved-blog`, {
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
        setBlogs(data.blogs);
      }
    };
    fetchMyBlogs();
  }, [handlePublishBlog]);

  /** Publish or unPublish blog  */
  async function handlePublishBlog(id) {
    const response = await fetch(`${BASE_URL}/user/publish-blog/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userProfile.access_token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }

  /** Delete blog  */
  async function handleDeleteBlog(id) {
    const response = await fetch(`${BASE_URL}/user/delete-blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userProfile.access_token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="m-2 flex  justify-center ">
      <Toaster />
      <div className="flex flex-col overflow-y-auto scrollHide h-[55vh]  w-[9n0%]  mt-2">
        {blogs.length == 0 ? (
          <div className="text-2xl font-semibold mt-10 text-blue-500">
            No Blogs found
          </div>
        ) : (
          blogs.map((blog) => {
            const {
              heading,
              fImage,
              description,
              userId,
              createdAt,
              _id,
              likes,
            } = blog;

            return (
              <div
                key={_id}
                className="card border-b border-gray-300 m-2 md:m-5"
              >
                <div className=" flex  justify-center items-center flex-row gap-1 sm:gap-5  h-auto  ">
                  <div className="w-[100%] sm:w-[60%] md:w-[80%]  ">
                    <div className="user-profile flex items-center gap-2">
                      <img
                        src={userId?.picture}
                        width={30}
                        height={30}
                        alt="profile"
                        className="rounded-full"
                      />
                      <span className="text-md font-bold">{userId?.name}</span>
                    </div>
                    <div className="p-2 z-50 ">
                      <Link to={`/blog/${_id}`}>
                        <h2 className="text-lg md:text-2xl  font-semibold tracking-wide">
                          {heading}
                        </h2>
                        <p className="sm:hidden">
                          {description.slice(0, 60)}...
                        </p>
                        <p className="hidden sm:block">
                          {description.slice(0, 300)}...
                        </p>
                      </Link>
                      <div className="icons flex gap-3 mt-2">
                        <span className="text-gray-400 text-xs">
                          {moment(createdAt).fromNow()}
                        </span>

                        <img
                          src={likeIcon}
                          width={25}
                          alt=""
                          className="cursor-pointer"
                        />
                        <span>{likes?.length} Likes</span>
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
                <div className="flex justify-end gap-3 md:mt-1  m-2 md:m-5">
                  <button
                    onClick={() => handlePublishBlog(_id)}
                    className="px-3 md:px-5 py-1 md:py-[6px]  text-indigo-500 border border-slate-300  rounded-full  text-sm font-semibold flex justify-center items-center  hover:bg-indigo-100 hover:border-indigo-100  cursor-pointer gap-1 "
                  >
                    <span>Publish</span>
                    <MdCloudDone />
                  </button>
                  <button className="px-3 md:px-5 py-1 md:py-[6px]  text-green-500 border border-slate-300  rounded-full  text-sm font-semibold flex justify-center items-center  hover:bg-green-100 hover:border-green-100  cursor-pointer gap-1">
                    <span>Edit</span>
                    <IoCreateOutline />
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(_id)}
                    className="px-3 md:px-5 py-1 md:py-[6px]  text-red-500 border border-slate-300  rounded-full  text-sm font-semibold flex justify-center items-center  hover:bg-red-100 hover:border-red-100  cursor-pointer gap-1"
                  >
                    <span>Delete</span>
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SavedBlogs;
