import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { TiHome } from "react-icons/ti";
import { AiFillLike, AiFillFire } from "react-icons/ai";
import { MdOpenInNew } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { Link } from "react-router-dom";

const SideMenu = ({ setOpenMenu, openMenu }) => {
  const MenuOptions = [
    {
      title: "Home",
      icon: <TiHome />,
      link: "/",
    },
    {
      title: "Recent",
      icon: <MdOpenInNew />,
      link: "/",
    },
    {
      title: "Trending",
      icon: <AiFillFire />,
      link: "/",
    },
    {
      title: "Liked",
      icon: <AiFillLike />,
      link: "/",
    },
    {
      title: "Created",
      icon: <IoIosCreate />,
      link: "/",
    },
    {
      title: "Liked",
      icon: <AiFillLike />,
      link: "/",
    },
  ];

  return (
    <div
      className={`fixed  top-0  duration-300 z-50  ${
        openMenu ? "left-0 bg-half-transparent w-screen" : "-left-56"
      }`}
    >
      <div className="h-screen float-left w-[200px] bg-gray-100 ">
        <div className="flex justify-center items-center gap-3 text-red-400 font-bold -ml-[0.67rem] md:ml-4 text-2xl mt-3">
          <div
            onClick={() => setOpenMenu(false)}
            className="rounded-full hover:bg-gray-200 p-2 cursor-pointer"
          >
            <RxHamburgerMenu className=" text-slate-700  " />
          </div>
          <Link to="/">
            <span className="px-2 text-white bg-red-400 rounded-full">B</span>
            logger
          </Link>
        </div>

        <div className="nav-items flex flex-col  items-center mt-5 gap-3">
          {MenuOptions.map((item, idx) => (
            <Link
              to={item.link}
              key={idx}
              onClick={() => setOpenMenu(false)}
              className="flex gap-3 items-center hover:bg-gray-200 px-2 py-[6px] w-[70%] rounded-lg text-gray-800 cursor-pointer"
            >
              <span className="text-xl">{item.icon}</span>{" "}
              <span className="text-lg font-semibold">{item.title}</span>
            </Link>
          ))}

          <div>-----------------------</div>
          <span>Following</span>
        </div>
      </div>
      <div onClick={() => setOpenMenu(false)} className=" w-full h-[100vh] " />
    </div>
  );
};

export default SideMenu;
