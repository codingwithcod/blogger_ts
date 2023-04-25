import React from "react";
import { Link } from "react-router-dom";

const OtherFromCard = ({ blog }) => {
  const { heading, fImage, description, _id } = blog;
  return (
    <div className=" flex  justify-center items-center flex-row gap-1 sm:gap-5  border-b border-gray-300 m-2 text-slate-500 hover:text-black h-auto    ">
      <div className="w-[80%] sm:w-[60%] md:w-[80%]   ">
        <div className="p-2 z-50 tracking-normal leading-tight ">
          <Link to={`/blog/${_id}`}>
            <h2 className="text-lg   font-semibold ">{heading}</h2>
            <p className="">{description.slice(0, 60)}...</p>
          </Link>
        </div>
      </div>
      {/* ======================= */}
      <div className="w-[40%] h-[30%]  flex justify-center item-center bg-red-50 ">
        <Link to={`/blog/${_id}`}>
          <img src={fImage} className="object-cover" alt="fImage" />
        </Link>
      </div>
    </div>
  );
};

export default OtherFromCard;
