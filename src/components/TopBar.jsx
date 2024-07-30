import React from "react";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

const TopBar = ({ pageName }) => {
  return (
    <div className="flex items-center gap-4 border border-gray-200 shadow rounded-lg box-border my-2 mr-2 font-thin py-4 px-6 bg-customBlue-1 text-white">
      <h2 className="text-lg font-bold">{pageName}</h2>
      <div className="flex flex-grow items-center justify-end">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-full bg-white bg-opacity-20 border border-gray-200 placeholder-gray-200 text-white focus:outline-none focus:ring-2 focus:ring-lightpink-300 transition duration-300 w-48 text-[12px]"
          />
          <FaSearch
            size={18}
            className="absolute left-3 top-2.5 text-gray-200"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <FaBell
          size={24}
          className="text-gray-200 hover:text-white cursor-pointer transition duration-300"
        />
        <FaUserCircle
          size={30}
          className="text-gray-200 hover:text-white cursor-pointer transition duration-300"
        />
      </div>
    </div>
  );
};

export default TopBar;
