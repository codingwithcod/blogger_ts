import React from 'react'
import { Link } from "react-router-dom";


const Logo = () => {
  return (
    <div  className=" text-red-400 font-bold  text-2xl">
         <Link to="/">
          <span className="px-2 text-white bg-red-400 rounded-full">B</span>
          logger
        </Link>
    </div>
  )
}

export default Logo