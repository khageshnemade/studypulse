// import { useTheme } from "../hooks/use-theme";

import { Bell, ChevronsLeft, Menu, Moon, Search, Sun } from "lucide-react";

import profileImg from "../assets/profile-image.jpg";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import AdminModal from "../../SuperAdmin-Dashboard/layouts/AdminModal";
import { useSelector } from "react-redux";

export const AdminDashboardHeader = ({ collapsed, setCollapsed }) => {
  // const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("Guest");
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    profilePic: "",
    organizationName: "",
  });

  useEffect(() => {
    // Fetch the data from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setProfile({
        profilePic: userData.profilePic,
        organizationName: userData.organizationName,
      });
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.userName || "Guest");
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);
  return (
    <>
      <header className="relative z-10 flex h-[60px] items-center justify-between bg-blue-500 px-4 shadow-md transition-colors">
        <div className="flex self-end gap-x-3 relative bottom-[10px] mr-2">
          <button
            className="btn-ghost size-10 text-gray-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className={collapsed && "rotate-180"} strokeWidth={2} />
          </button>
        </div>

        {/* Breadcrumb section aligned to the left */}
        <div className="flex-1 flex items-center justify-start">
          <nav aria-label="breadcrumb">
            <ol className="hidden sm:flex flex-wrap space-x-2 bg-light-blue-500 text-white">
              {/* Always display Home */}
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 text-white dark:hover:text-blue-400 font-bold"
                >
                  Home
                </Link>
              </li>
              {/* Render breadcrumbs for pathnames excluding the first item */}
              {pathnames.slice(1).map((segment, index) => {
                const to = `/${pathnames.slice(0, index + 2).join("/")}`; // index + 2 to account for Home being excluded
                return (
                  <li key={to} className="flex items-center space-x-2">
                    <span>/</span>
                    <Link
                      to={to}
                      className="hover:text-blue-600 text-white dark:hover:text-blue-400 font-bold"
                    >
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Organization and User Name (on hover) */}
        <div className="flex items-center gap-2 text-white font-semibold mr-6 group relative">
          {/* Profile Picture with Hover Effect */}

          <button
            onClick={() => toggleModal()}
            className="w-12 h-12 rounded-full overflow-hidden cursor-pointer bg-indigo-300 flex items-center justify-center"
          >
            {
              profile.profilePic && profile.profilePic.startsWith('http') ? (
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full transition-opacity duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-300 text-white text-lg font-bold">
                  {userName
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )
            }

          </button>

          {/* Show Organization Name and Username on Hover (Only the Text) */}
          <div className="absolute bottom-full top-8 transform -translate-x-2/3 mb-2 group-hover:block group-hover:opacity-80 hidden rounded-xl w-[300px] text-center transition-opacity duration-300 opacity-0">
            <div className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 p-4 rounded-lg shadow-lg">
              <p className="text-white">{useSelector((state) => state.org.orgName)}</p>
              <p className="text-white mt-1">{userName}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-3">

          <button

            className="w-10 h-10 flex items-center justify-center"
          >
            <Bell
              onClick={() => {
                navigate("notifications");
              }}
              className={`text-white transition-transform duration-300`}
              size={24}
            />
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
