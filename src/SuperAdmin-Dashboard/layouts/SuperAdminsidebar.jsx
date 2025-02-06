import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { navbarLinks } from "../constants";

import logoLight from "../assets/logosn.png";
import logoDark from "../assets/logosn.png";

import { cn } from "../utils/cn";

import PropTypes from "prop-types";

export const SuperAdminSidebar = forwardRef(({ collapsed }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300  bg-blue-500 [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
        collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
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
    <p className="font-bold text-xl text-gray-600 transition-colors dark:text-slate-50 absolute top-24">
      Pulse
    </p>
  )}
</div>
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
                  "sidebar-item font-bold text-gray-500 hover:text-gray-300 bg-blue-200",
                  collapsed && "md:w-[45px]"
                )}
              >
                <link.icon size={22} className="flex-shrink-0" />
                {!collapsed && (
                  <p className="whitespace-nowrap">{link.label}</p>
                )}
              </NavLink>
            ))}
          </nav>
        ))}
      </div>
    </aside>
  );
});

SuperAdminSidebar.displayName = "SuperAdminSidebar";

SuperAdminSidebar.propTypes = {
  collapsed: PropTypes.bool,
};
