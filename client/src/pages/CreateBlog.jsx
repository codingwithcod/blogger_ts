import React, { useEffect } from "react";
import { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

import useAuthStore from "../store/authStore";
import Dropdown from "../components/Dropdown";
import { MdCloudDone, MdOutlineDataSaverOn } from "react-icons/md";

const CreateBlog = () => {
  const [content, setContent] = useState("");
  const [formData, setFormData] = useState("");
  console.log(">>>>>>>>>>>>>>>>>", formData);
  const [category, setCategory] = useState({ category: "Select Category" });
  const [isPublish, setIsPublish] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const isNewBlog = searchParams.get("new");
  const editBlogId = searchParams.get("id");

  const { userProfile } = useAuthStore();
  const editor = useRef(null);
  const navigate = useNavigate();

  /** ------------------------------ */
  useEffect(() => {
    if (!userProfile) {
      navigate("/");
    }
  });
  /** -----------  FOR EDIT BLOG ---------- */
  useEffect(() => {
    if (isNewBlog === true) {
    } else {
      console.log("this is edit blog--------");
      if (editBlogId) {
        const blogData = async () => {
          const response = await fetch(`${BASE_URL}/blog/${editBlogId}`, {
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
            setContent(data.blog.content);
            setFormData({
              heading: data.blog.heading,
              fImage: data.blog.fImage,
              description: data.blog.description,
            });
            setCategory({ category: data.blog.category });
          }
        };

        blogData();
      }
    }
  }, [isNewBlog]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { heading, description, fImage } = formData;

    if (!(category.category === "Select Category")) {
      if (heading && description && fImage && content) {
        const blog = {
          ...formData,
          ...category,
          content,
          isPublish,
        };
        if (isNewBlog === true) {
          const response = await fetch(`${BASE_URL}/blog`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userProfile.access_token}`,
            },
            body: JSON.stringify({ ...blog }),
          });

          if (response.ok) {
            const data = await response.json();
            toast.success(data.message);
            setIsPublish(true);
            setContent("");
            setFormData("");
            setCategory({ category: "Select Category" });
          }
        } else {
          const response = await fetch(`${BASE_URL}/blog/${editBlogId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userProfile.access_token}`,
            },
            body: JSON.stringify({ ...blog }),
          });
          if (response.ok) {
            const data = await response.json();
            toast.success(data.message);
            setIsPublish(true);
            setContent("");
            setFormData("");
            setCategory({ category: "Select Category" });
          }
        }
      } else {
        toast.error("all field Required !!");
      }
    } else {
      toast.error("Please Select Category !!");
    }
  };

  return (
    <div className=" h-[90vh] overflow-y-auto homeScrollTrack mx-auto flex flex-col">
      <Toaster />

      <div className="m-5 flex flex-col gap-5  items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full items-center  "
        >
          {/* =========================== */}
          <div className="flex justify-evenly w-full">
            <div className="flex m-2 gap-4 flex-col text-lg font-semibold">
              <span>
                Category<span className="text-red-500">*</span>
              </span>
              <span>
                Heading<span className="text-red-500">*</span>
              </span>
              <span>
                Featured Image<span className="text-red-500">*</span>
              </span>
              <span>
                Description<span className="text-red-500">*</span>
              </span>
            </div>
            <div className="flex m-2 gap-3 flex-col w-[90%] sm:w-[60%]">
              <Dropdown category={category} setCategory={setCategory} />

              <input
                type="text"
                autoComplete="off"
                name="heading"
                onChange={handleChange}
                value={formData.heading || ""}
                className="  bg-white  border border-indigo-300 rounded-md py-[6px] pl-9 pr-3 shadow-sm focus:outline-none focus:border-none focus:ring-indigo-500 focus:ring-1 sm:text-sm "
              />
              <input
                type="text"
                autoComplete="off"
                name="fImage"
                onChange={handleChange}
                value={formData.fImage || ""}
                placeholder="https://www.example.com/image/234234"
                className="  bg-white  border border-indigo-300 rounded-md py-[6px] pl-9 pr-3 shadow-sm focus:outline-none focus:border-none focus:ring-indigo-500 focus:ring-1 sm:text-sm "
              />
              <textarea
                type="text"
                autoComplete="off"
                name="description"
                rows={3}
                onChange={handleChange}
                value={formData.description || ""}
                className="  bg-white  border border-indigo-300 rounded-md py-[6px] pl-9 pr-3 shadow-sm focus:outline-none focus:border-none focus:ring-indigo-500 focus:ring-1 sm:text-sm "
              />
            </div>
          </div>

          {/* =========================== */}
          <div className=" md:m-1  p-2   rounded-3xl w-[100%] sm:w-[85%]">
            <h3 className="pb-1 text-gray-500">
              Write A Full Flaged Blog<span className="text-red-500">*</span>
            </h3>
            <JoditEditor
              ref={editor}
              value={content}
              name="htmlCode"
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <div className="flex justify-evenly w-[50%]">
            <button
              onClick={() => {
                setIsPublish(true);
                handleSubmit;
              }}
              className="px-3 md:px-5 py-1 md:py-[6px]  text-indigo-500 border border-slate-300  rounded-full  text-sm font-semibold flex justify-center items-center  hover:bg-indigo-100 hover:border-indigo-100  cursor-pointer gap-1 "
            >
              Publish <MdCloudDone />
            </button>
            <button
              className="px-3 md:px-5 py-1 md:py-[6px]  text-green-500 border border-slate-300  rounded-full  text-sm font-semibold flex justify-center items-center  hover:bg-green-100 hover:border-green-100  cursor-pointer gap-1"
              type="submit"
            >
              Save <MdOutlineDataSaverOn />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
