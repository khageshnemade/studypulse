import { forwardRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronsLeft, Home, LogOut } from "lucide-react";
import { navbarLinks } from "../constants";
import { resetClassDetails } from "../../redux/features/idsSlice";
import logoLight from "../assets/logosn.png";
import logoDark from "../assets/logosn.png";

import { cn } from "../utils/cn";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

export const TeacherSidebar = forwardRef(({ collapsed, setCollapsed }, ref) => {
  const dispatch = useDispatch();
  const [profileCompletion, setProfileCompletion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("student");
    dispatch(resetClassDetails());
    setShowModal(false);
    navigate("/login");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setProfileCompletion(parsedData?.profileCompletion);
      } catch (error) {
        console.error("Invalid user data:", error);
      }
    }
  }, []);

  const renderSidebarContent = (links) => (
    <div className="flex flex-col w-full h-full overflow-y-auto p-2 space-y-6 scrollbar-thin">
      {links.map((navbarLink) => (
        <nav
          key={navbarLink.title}
          className={cn("space-y-2", collapsed && "items-center")}
        >
          {!collapsed && (
            <p className="text-sm font-bold text-white uppercase tracking-wide pl-2">
              {navbarLink.title}
            </p>
          )}
          {navbarLink.links.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition",
                  "text-white hover:bg-blue-500 hover:text-black",
                  isActive ? "bg-white text-blue-700 font-semibold" : "",
                  collapsed ? "justify-center px-0" : ""
                )
              }
            >
              <link.icon
                size={20}
                className="flex-shrink-0"
                style={{ color: link.color }}
              />
              {!collapsed && <span className="text-sm">{link.label}</span>}
            </NavLink>
          ))}
        </nav>
      ))}

      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center w-5/6 mx-auto py-2 mt-4 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
      >
        <LogOut className="mr-2" size={18} />
        {!collapsed && "Logout"}
      </button>
    </div>
  );

  return (
    <>
      <aside
        ref={ref}
        className={cn(
          "fixed z-[100] flex flex-col h-full bg-blue-600 transition-all duration-300 ease-in-out",
          collapsed ? "w-[70px] items-center" : "w-[240px]",
          collapsed ? "max-md:-left-full" : "max-md:left-0"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-3 p-4 border-b border-blue-500">
          <img
            src={logoLight}
            alt="Study Pulse"
            className="dark:hidden"
            height="40"
            width="40"
          />
          <img
            src={logoDark}
            alt="Study Pulse"
            className="hidden dark:block"
            height="40"
            width="40"
          />
          {!collapsed && (
            <span className="text-xl font-serif text-white font-semibold">
              Study Pulse
            </span>
          )}
        </div>

        {/* Conditional Sidebar */}
        {profileCompletion
          ? renderSidebarContent(navbarLinks)
          : renderSidebarContent([
              {
                title: "Dashboard",
                links: [
                  {
                    label: "Home",
                    icon: Home,
                    path: "/teacher-dashboard/profile",
                  },
                ],
              },
            ])}
      </aside>

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

TeacherSidebar.displayName = "TeacherSidebar";

TeacherSidebar.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
};
