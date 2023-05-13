import React, { useEffect, useState } from "react";
import { Sidebar, BlogCard } from "../components";
import LoadingBlogCard from "../components/Loading/LoadingBlogCard";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const categoryFilter = blogs.filter((blog) =>
    category ? blog.category === category : blog
  );

  useEffect(() => {
    const blogData = async () => {
      const response = await fetch(`${BASE_URL}/blog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBlogs(data.blogs);
      setIsLoading(false);
    };

    blogData();
  }, []);

  return (
    <div className=" flex  bg-gray-50  ">
      <div className="md:w-[20%]">
        <Sidebar blogs={blogs} setCategory={setCategory} category={category} />
      </div>
      <div className=" h-[90vh] md:w-[80%] overflow-y-auto sm:homeScrollTrack scrollHide left-[10rem] flex      flex-col gap-0 p-2 sm:p-5     ">
        {isLoading && (
          <>
            <LoadingBlogCard />
            <LoadingBlogCard />
            <LoadingBlogCard />
            <LoadingBlogCard />
          </>
        )}
        {blogs ? (
          categoryFilter?.map((blog, i) => (
            <BlogCard key={i} blog={blog && blog} />
          ))
        ) : (
          <h1>No blogs found</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
