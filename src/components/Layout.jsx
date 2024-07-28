import React from "react";
import SideBar from "./SideBar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
};

export default Layout;
