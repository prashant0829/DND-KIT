import React from "react";
import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const Layout = ({ children }) => {
  const location = useLocation();

  // Determine the page name based on the current URL path
  const getPageName = (path) => {
    switch (path) {
      case "/tasks":
        return "Tasks";
      case "/calendar":
        return "Calendar";
      case "/projects":
        return "Projects";
      case "/reports":
        return "Reports";
      case "/team":
        return "Team";
      case "/settings":
        return "Settings";
      case "/notes":
        return "Notes";
      case "/boards":
        return "Boards";
      default:
        return "Dashboard";
    }
  };

  const pageName = getPageName(location.pathname);
  const topBarHeight = "5rem"; // Set a fixed height for the TopBar

  return (
    <div className="flex gap-2" style={{ height: "100vh" }}>
      <SideBar />
      <div className="flex flex-col flex-grow">
        <div style={{ maxHeightheight: topBarHeight }}>
          <TopBar pageName={pageName} />
        </div>
        <div
          className="flex flex-col flex-grow gap-4 text-[14px] border border-gray-200 shadow-lg rounded-lg box-border mb-2 mr-2 font-thin py-4 px-2 overflow-auto bg-neutral-2"
          style={{ height: `calc(100vh - ${topBarHeight})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
