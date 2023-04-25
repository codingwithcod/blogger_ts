import React, { useEffect, useState } from "react";
import { Sidebar, BlogCard } from "../components";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");

  const categoryFilter = blogs.filter((blog) =>
    category ? blog.category === category : blog
  );

  useEffect(() => {
    const blogData = async () => {
      const response = await fetch("http://localhost:3991/api/blog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBlogs(data.blogs);
    };

    blogData();
  }, []);

  return (
    <div className=" flex  bg-gray-50  ">
      <div className="md:w-[20%]">
        <Sidebar blogs={blogs} setCategory={setCategory} category={category} />
      </div>

      <div className=" h-[90vh] md:w-[80%] overflow-y-auto sm:homeScrollTrack scrollHide left-[10rem] flex  items-end    flex-col gap-0 p-2 sm:p-5     ">
        {categoryFilter?.map((blog, i) => (
          <BlogCard key={i} blog={blog && blog} />
        ))}
        {/* <BlogCard /> */}
      </div>
    </div>
  );
};

export default Home;
