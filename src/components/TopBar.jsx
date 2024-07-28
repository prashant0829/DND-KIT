import React from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

const TopBar = ({ pageName }) => {
  return (
    <div className="flex items-center gap-4 text-[14px] border border-gray-200 shadow rounded-lg box-border my-2 mr-2 font-thin py-4 px-2">
      <h2 className="text-lg font-bold">{pageName}</h2>
      <div className="flex flex-grow items-center justify-end">
        <div className="flex gap-2 ml-2 px-2 py-1 rounded-md bg-white bg-opacity-15 border border-gray-200  text-gray-600 placeholder-gray-500 focus:ring-2 focus:ring-lightpink-300">
          <FaSearch size={18} className="text-gray-600" />
          <input
            type="text"
            placeholder="Search..."
            className="outline-none w-48"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <FaUserCircle
          size={30}
          className="text-gray-600 hover:text-black cursor-pointer"
        />
      </div>
    </div>
  );
};

export default TopBar;
