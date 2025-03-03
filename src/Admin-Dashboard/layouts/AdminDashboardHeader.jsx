// import { useTheme } from "../hooks/use-theme";

import { Bell, ChevronsLeft, Menu, Moon, Search, Sun } from "lucide-react";

import profileImg from "../assets/profile-image.jpg";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import AdminModal from "../../SuperAdmin-Dashboard/layouts/AdminModal";

export const AdminDashboardHeader = ({ collapsed, setCollapsed }) => {
  // const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const pathnames = location.pathname.split("/").filter((x) => x);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <>
      <header className="relative z-10 flex h-[60px] items-center justify-between bg-blue-500 px-4 shadow-md transition-colors ">
        <div className="flex self-end gap-x-3  relative bottom-2 ">
          <button
            className="btn-ghost size-10 text-gray-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className={collapsed && "rotate-180"} />
          </button>
        </div>

        {/* Breadcrumb section aligned to the left */}
        <div className="flex-1 flex items-center justify-start">
          <nav aria-label="breadcrumb">
            <ol className="hidden sm:flex flex-wrap space-x-2 text-sm bg-light-blue-500 text-white">
              <li>
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Home
                </Link>
              </li>
              {pathnames.map((segment, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                return (
                  <li key={to} className="flex items-center space-x-2">
                    <span>/</span>
                    <Link
                      to={to}
                      className="text-white hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                    >
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <div className="flex items-center justify-center text-white gap-1 font-bold mr-4">
          <p>Welcome Back,</p>
          <h2 className="text-inherit"> {userName} </h2>

          {/* Display other user data as needed */}
        </div>

        <div className="flex items-center gap-x-3">
          <button
            onClick={toggleModal}
            className="w-10 h-10 overflow-hidden rounded-full cursor-pointer"
          >

            <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-2xl font-bold">
              {userName.split(" ").map(name => name[0]).join("").toUpperCase()}
            </div>

          </button>
        </div>
      </header>
      {isModalOpen && <AdminModal onClose={toggleModal} />}
    </>
  );
};

AdminDashboardHeader.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
