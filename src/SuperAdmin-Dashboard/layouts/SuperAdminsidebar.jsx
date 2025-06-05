import { forwardRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navbarLinks } from "../constants";
import logoLight from "../assets/logosn.png";
import logoDark from "../assets/logosn.png";
import { cn } from "../utils/cn";
import { resetSuperAdminDetails } from "../../redux/features/superAdminSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { LogOut } from "lucide-react";

export const SuperAdminSidebar = forwardRef(({ collapsed }, ref) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("student");
    dispatch(resetSuperAdminDetails());
    setShowModal(false);
    navigate("/login");
  };

  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[240px] flex-col bg-blue-600 transition-all duration-300 ease-in-out",
        collapsed ? "md:w-[70px] items-center" : "md:w-[240px]",
        collapsed ? "max-md:-left-full" : "max-md:left-0"
      )}
    >
      {/* Logo Section */}
      <div className="flex justify-center items-center py-4 border-b border-blue-400">
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
          <p className="ml-2 font-semibold text-xl text-white font-serif transition-opacity duration-300">
            Study Pulse
          </p>
        )}
      </div>

      {/* Nav Items */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden px-2 py-4 space-y-6 scrollbar-thin">
        {navbarLinks.map((navbarLink) => (
          <div key={navbarLink.title} className="space-y-2">
            {!collapsed && (
              <p className="text-sm font-bold text-white pl-2 uppercase tracking-wide">
                {navbarLink.title}
              </p>
            )}
            {navbarLink.links.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition hover:bg-blue-500 hover:text-white",
                    isActive ? "bg-white text-blue-700 font-semibold" : "text-white",
                    collapsed ? "justify-center px-0" : ""
                  )
                }
              >
                <link.icon size={20} style={{ color: link.color }} />
                {!collapsed && <span className="text-sm">{link.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center w-5/6 mx-auto py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <LogOut className="mr-2" size={18} />
          {!collapsed && "Logout"}
        </button>
      </div>

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 animate-fade-in">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
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

SuperAdminSidebar.displayName = "SuperAdminSidebar";

SuperAdminSidebar.propTypes = {
  collapsed: PropTypes.bool,
};
