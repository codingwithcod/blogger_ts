import React, { useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchText, setSearchText] = useState();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchText}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="hidden sm:flex rounded-full focus:ring-1 focus:ring-slate-900 relative bg-slate-200  w-[50%]    border border-gray-300"
    >
      <input
        className=" outline-none w-full p-2 pl-10 focus:ring-0 rounded-l-full  text-gray-700  "
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="flex justify-center items-center absolute left-3 top-3 bg-white  mr-2">
        <TfiSearch className="text-gray-400" />
      </div>
      <button className="flex justify-center items-center px-5 rounded-full  bg-slate-200 cursor-pointer ">
        <TfiSearch className="text-gray-700 hover:drop-shadow-2xl " />
      </button>
    </form>
  );
};

export default SearchBar;
