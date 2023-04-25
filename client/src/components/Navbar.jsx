import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCreateOutline } from "react-icons/io5";
import { HiOutlineUserCircle } from "react-icons/hi";
import Logo from "./Logo";
import { useGoogleLogin } from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import { CreateOrGetUser } from "../utils";

const Navbar = ({ setOpenMenu }) => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      const data = await response.json();
      CreateOrGetUser(data, addUser);
    },
  });

  return (
    <div className="flex justify-between items-center bg-slate-50 h-auto p-3 fixed top-0 w-full z-40 border-b border-slate-200 max-w-[1200px]">
      <div className="flex justify-center items-center gap-3 md:ml-4 text-2xl">
        <div
          onClick={() => setOpenMenu(true)}
          className="rounded-full hover:bg-gray-200 p-2 cursor-pointer"
        >
          <RxHamburgerMenu className=" text-slate-700  " />
        </div>
        <Logo />
      </div>

      {/* This is the Search */}
      <SearchBar />

      <div className="flex gap-4 md:gap-8  items-center">
        {userProfile && (
          <Link to="/create-blog">
            <button className="px-2 py-1 md:py-[1px]  bg-indigo-500 hover:bg-indigo-600 text-white rounded-md  text-md sm:text-lg flex justify-center items-center gap-2">
              <span className="hidden md:block">Create</span>{" "}
              <IoCreateOutline />
            </button>
          </Link>
        )}

        {userProfile ? (
          <Link to={`profile`}>
            <div>
              <img
                src={userProfile.picture}
                width={35}
                className="rounded-full"
                alt="profile"
              />
            </div>
          </Link>
        ) : (
          <div onClick={login}>
            <button className="px-1 md:px-3 py-1 md:py-[6px]  text-blue-500 border border-slate-300  rounded-full mr-5 text-sm font-semibold flex justify-center items-center gap-2 hover:bg-blue-100 hover:border-blue-100 ">
              {/* <HiOutlineUserCircle className="text-2xl font-thin" /> */}
              <span className="material-symbols-outlined">account_circle</span>
              <span>Sign in</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
