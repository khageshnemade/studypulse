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
    dispatch(resetAdminDetails());
    setShowModal(false);
    navigate("/login");
  };

  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full flex-col bg-blue-600 transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px] items-center" : "w-[240px]",
        collapsed ? "max-md:-left-full" : "max-md:left-0"
      )}
    >
      {/* Header Section */}
      <div className="flex items-center justify-center py-4 border-b border-blue-400">
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
          <p className="ml-2 font-semibold text-xl text-white font-serif">
            Study Pulse
          </p>
        )}
      </div>

      {/* Navigation Section */}
      <div className="flex-1 w-full overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {navbarLinks.map((navbarLink) => (
          <div key={navbarLink.title} className="space-y-2">
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
                    "flex items-center gap-3 px-3 py-2 rounded-md transition font-serif",
                    isActive
                      ? "bg-white text-blue-700 font-semibold"
                      : "text-white hover:bg-blue-500",
                    collapsed ? "justify-center px-0" : ""
                  )
                }
              >
                <link.icon size={18} style={{ color: link.color }} />
                {!collapsed && <span className="text-sm">{link.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center w-5/6 mx-auto py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
        >
          <LogOut className="mr-2" size={18} />
          {!collapsed && "Logout"}
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 animate-fade-in">
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
    </aside>
  );
});

AdminSidebar.displayName = "AdminSidebar";

AdminSidebar.propTypes = {
  collapsed: PropTypes.bool,
};
