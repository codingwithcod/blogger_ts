import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import moment from "moment";
import useAuthStore from "../store/authStore";
import OtherFromCard from "../components/OtherFromCard";
import BlogCard from "../components/BlogCard";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [blog, setBlog] = useState([]);
  console.log("------------", blog);
  const { userProfile } = useAuthStore();

  /** for fetching single blog data */
  useEffect(() => {
    const blogData = async () => {
      const response = await fetch(
        `http://localhost:3991/api/blog/search?q=${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userProfile?.access_token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success == false) {
        navigate("/");
      } else {
        console.log(data);
        setBlog(data.blogs);
      }
    };
    blogData();
  }, [query]);

  /** for fechting other blogs from user's blog */
  //   useEffect(() => {
  //     const fetchOtherBlogFromUser = async () => {
  //       const response = await fetch(
  //         `http://localhost:3991/api/blog/other-from-user/${blog?._id}?userId=${blog?.userId?._id}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         setOtherFromUser(data.blogs);
  //       }
  //     };
  //     fetchOtherBlogFromUser();
  //   }, [blog]);

  return (
    <div className="main_container flex">
      <div className="contain w-full md:w-[70%] h-[90vh] overflow-y-auto scrollHide pl-10  p-5 ">
        {blog.map((blog, idx) => {
          return <BlogCard key={idx} blog={blog} />;
        })}
      </div>

      {/* ======================= right side bar   ========================= */}
      <div className="profile w-[30%] hidden md:block border-l px-5 bg-blue-300"></div>
    </div>
  );
};

export default SearchResult;
