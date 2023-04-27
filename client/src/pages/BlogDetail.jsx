import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import moment from "moment";
import FollowIcon from "../assets/follow.svg";
import FollowedIcon from "../assets/followed.svg";
import useAuthStore from "../store/authStore";
import OtherFromCard from "../components/OtherFromCard";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [isFollowed, setisFollowed] = useState(false);
  const [isSelf, setIsSelf] = useState(false);
  const [otherFromUser, setOtherFromUser] = useState([]);
  const navigate = useNavigate();
  const { userProfile } = useAuthStore();

  /** reload page after change id */

  /** for fetching single blog data */
  useEffect(() => {
    const blogData = async () => {
      const response = await fetch(`${BASE_URL}/blog/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userProfile?.access_token}`,
        },
      });
      const data = await response.json();
      if (data.success == false) {
        navigate("/");
      } else {
        setBlog(data.blog);
      }
    };

    blogData();
  }, [id, isFollowed]);

  /** for check is user followed or not */
  useEffect(() => {
    const isFollow = async () => {
      const response = await fetch(
        `${BASE_URL}/user/is-follow/${blog?.userId?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userProfile?.access_token}`,
          },
        }
      );
      const data = await response.json();
      if (data.isSelf) {
        setIsSelf(data.isSelf);
      } else {
        setisFollowed(data.isFollowed);
      }
    };
    if (userProfile) {
      isFollow();
    }
  }, [blog, userProfile]);

  /** for fechting other blogs from user's blog */
  useEffect(() => {
    const fetchOtherBlogFromUser = async () => {
      const response = await fetch(
        `${BASE_URL}/blog/other-from-user/${blog?._id}?userId=${blog?.userId?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setOtherFromUser(data.blogs);
      }
    };
    fetchOtherBlogFromUser();
  }, [blog]);

  const handleFollowUser = async (id) => {
    const response = await fetch(`${BASE_URL}/user/follow/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userProfile.access_token}`,
      },
    });
    if (response.ok) {
      const res = await response.json();
      toast.success(res.message);
    }
  };

  return (
    <div className="main_container flex">
      <Toaster />

      <div className="contain w-full md:w-[70%] h-[90vh] overflow-y-auto scrollHide pl-10 mt-2 p-5 ">
        <div className=" flex flex-col    gap-5   h-auto   ">
          <div className="w-[100%] sm:w-[60%] md:w-[100%] ">
            <div className="user-profile flex items-center gap-2">
              <img
                src={blog?.userId?.picture}
                width={40}
                height={40}
                alt="profile"
                className="rounded-full"
              />
              <span className="text-md font-bold text-gray-600">
                {blog?.userId?.name}
              </span>
              <span className="text-gray-400 text-xs">
                {moment(blog?.createdAt).fromNow()}
              </span>
            </div>
            <div className="p-2">
              <h2 className="text-[3rem] text-slate-900  tracking-tight font-bold leading-tight">
                {blog?.heading}
              </h2>
              <p className="text-xl text-gray-500 mt-4">{blog?.desc}</p>
            </div>
          </div>
        </div>
        {/* ----------------------------- */}
        <div className="flex justify-center h-[400px] mt-5 ">
          <img src={blog?.fImage} className="object-cover" alt="fImage" />
        </div>
        <div></div>

        <div className="htmlCode mt-4 mb-5 ">
          <div dangerouslySetInnerHTML={{ __html: blog?.content }}></div>
        </div>
      </div>

      {/* ======================= right side bar   ========================= */}
      <div className="profile w-[30%] hidden md:block border-l px-5 ">
        <div className="bg-white flex flex-col mt-5 justify-center items-center">
          <div className=" ">
            <img
              src={blog?.userId?.picture}
              className="rounded-full mb-2"
              alt="profile"
            />
          </div>
          <span className="text-2xl font-medium">{blog?.userId?.name}</span>
          <span className="text-md text-gray-400 font-medium">
            @{blog?.userId?.email?.split("@")[0]}
          </span>
          <span className="text-sm text-gray-400 ">
            {blog?.userId?.followers?.length} Followers
          </span>
          {isSelf ? (
            <></>
          ) : (
            <div className="mt-3 ">
              {isFollowed ? (
                <button
                  onClick={() => {
                    if (userProfile) {
                      setisFollowed((prev) => !prev);
                      handleFollowUser(blog?.userId?._id);
                    } else {
                      toast.error("Please sign in first");
                    }
                  }}
                  className="px-1 md:px-3 py-1 md:py-[6px]  bg-blue-500 border text-[#f5f5f5] border-slate-300  rounded-full mr-5 text-sm font-semibold flex justify-center items-center gap-2 hover:bg-blue-500 hover:border-blue-600 "
                >
                  <span>Followed</span>
                  <img src={FollowedIcon} width={20} alt="" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (userProfile) {
                      setisFollowed((prev) => !prev);
                      handleFollowUser(blog?.userId?._id);
                    } else {
                      toast.error("Please sign in first");
                    }
                  }}
                  className="px-1 md:px-3 py-1 md:py-[6px]  text-blue-500 border border-slate-300  rounded-full mr-5 text-sm font-semibold flex justify-center items-center gap-2 hover:bg-blue-100 hover:border-blue-100 "
                >
                  <span>Follow</span>
                  <img
                    src={FollowIcon}
                    width={20}
                    className="text-blue-500"
                    alt=""
                  />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="border-b mt-5 px-5"></div>
        {isSelf ? (
          <div className="flex justify-center mt-5">
            <Link to="/profile">
              <button className="px-1 md:px-3 py-1 md:py-[6px]  bg-blue-500 border text-[#f5f5f5] border-slate-300  rounded-full mr-5 text-sm font-semibold flex justify-center items-center gap-2 hover:bg-blue-500 hover:border-blue-500 ">
                <span>Go to Profile</span>
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <span className="mt-2 font-bold">
              other from
              <span className="text-blue-500 pl-2 text-lg">
                {blog?.userId?.name}
              </span>
            </span>
            <div className="h-[43vh] overflow-y-auto scrollHide">
              {otherFromUser?.length == 0 ? (
                <div className="text-center">
                  <h3 className="text-xl text-blue-500 mt-5">No other blogs</h3>
                </div>
              ) : (
                otherFromUser.map((blog) => {
                  return <OtherFromCard key={blog._id} blog={blog} />;
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
