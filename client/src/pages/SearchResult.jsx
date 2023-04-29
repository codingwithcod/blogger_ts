import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import moment from "moment";
import useAuthStore from "../store/authStore";
import OtherFromCard from "../components/OtherFromCard";
import BlogCard from "../components/BlogCard";
import LoadingBlogCard from "../components/Loading/LoadingBlogCard";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile } = useAuthStore();
  const navigate = useNavigate();

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
        setBlog(data.blogs);
        setIsLoading(false);
      }
    };
    if (query === "") {
      navigate("/");
    } else {
      blogData();
    }
  }, [query]);

  return (
    <div className="main_container flex">
      <div className="contain w-full md:w-[70%] h-[90vh] overflow-y-auto scrollHide pl-10  p-5 ">
        <span className="text-xl font-semibold">
          Search Results For :{" "}
          <span className="text-blue-500  font-bold">{query}</span>
        </span>
        {isLoading && (
          <>
            <LoadingBlogCard />
            <LoadingBlogCard />
            <LoadingBlogCard />
            <LoadingBlogCard />
          </>
        )}
        {blog.length > 0 ? (
          blog.map((blog, idx) => {
            return <BlogCard key={idx} blog={blog} />;
          })
        ) : (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <span className="text-xl font-semibold">
              No Search Result Found
            </span>
          </div>
        )}
      </div>

      {/* ======================= right side bar   ========================= */}
      <div className="profile w-[30%] hidden md:block border-l px-5 bg-blue-300"></div>
    </div>
  );
};

export default SearchResult;
