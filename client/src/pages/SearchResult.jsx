import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import moment from "moment";
import useAuthStore from "../store/authStore";
import OtherFromCard from "../components/OtherFromCard";
import BlogCard from "../components/BlogCard";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [blog, setBlog] = useState([]);
  const { userProfile } = useAuthStore();

  /** for fetching single blog data */
  useEffect(() => {
    const blogData = async () => {
      const response = await fetch(`${BASE_URL}/blog/search?q=${query}`, {
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
        console.log(data);
        setBlog(data.blogs);
      }
    };
    blogData();
  }, [query]);

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
