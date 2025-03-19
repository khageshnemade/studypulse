import { forwardRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { navbarLinks } from "../constants";

import logoLight from "../assets/logosn.png";
import logoDark from "../assets/logosn.png";

import { cn } from "../utils/cn";

import PropTypes from "prop-types";
import { LogOut } from "lucide-react";
import { resetAdminDetails } from "../../redux/features/adminSlice";
import { useDispatch } from "react-redux";

export const AdminSidebar = forwardRef(({ collapsed }, ref) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("student");
    console.log("logging out");
    navigate("/login");
    console.log("Logged out");
    dispatch(resetAdminDetails());
    setShowModal(false); // Close the modal after logging out
  };
  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-gradient-to-b to-blue-700 from-teal-600  [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
        collapsed ? "md:w-[70px] md:items-center" : "md:w-[260px]",
        collapsed ? "max-md:-left-full" : "max-md:left-0"
      )}
    >
      <div className="flex flex-col items-center justify-center p-3">
        <div className="flex items-center justify-center gap-x-3">
          <img
            src={logoLight}
            alt="Study Pulse"
            className="dark:hidden"
            height="120px"
            width="120px"
          />
          <img
            src={logoDark}
            alt="Study Pulse"
            className="hidden dark:block"
            height="40px"
            width="40px"
          />
        </div>

        {/* Pulse text */}
        {!collapsed && (
          <p
            className="font-bold text-2xl text-white text-transparent bg-clip-text transition-colors dark:text-slate-50 absolute top-[120px] font-serif"
          >
            Study Pulse
          </p>)}
      </div>
      <hr className="border-t-2 border-gray-700 my-2" />

      <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
        {navbarLinks.map((navbarLink) => (
          <nav
            key={navbarLink.title}
            className={cn("sidebar-group", collapsed && "md:items-center")}
          >
            {!collapsed && (
              <p
                className={cn(
                  "sidebar-group-title font-bold",
                  collapsed && "md:w-[45px]"
                )}
              >
                {navbarLink.title}
              </p>
            )}

            {navbarLink.links.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                end
                className={cn(
                  "sidebar-item font-bold text-xl",
                  collapsed && "md:w-[45px]"
                )}
              >
                <link.icon
                  size={22}
                  className="flex-shrink-0"
                  // style={{ color: link.color }} 
                  />
                {!collapsed && (
                  <p className="whitespace-nowrap">{link.label}</p>
                )}
              </NavLink>
            ))}
          </nav>
        ))}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center bg-gradient-to-r from-red-500 to-red-700 text-white w-5/6 pl-2 mx-auto h-3 py-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <LogOut className="mr-2" size={20} />
          {!collapsed && "Logout"}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
});

AdminSidebar.displayName = "AdminSidebar";

AdminSidebar.propTypes = {
  collapsed: PropTypes.bool,
};
