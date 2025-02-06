import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { navbarLinks } from "../constants";

import logoLight from "../assets/logosn.png";
import logoDark from "../assets/logosn.png";

import { cn } from "../utils/cn";

import PropTypes from "prop-types";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn(
        "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300  bg-gradient-to-b from-blue-100 to-purple-400 [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
        collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
        collapsed ? "max-md:-left-full" : "max-md:left-0"
      )}
    >
      <div className="flex gap-x-3 p-3 items-center justify-center">
        <img
          src={logoLight}
          alt="SholarNet"
          className="dark:hidden"
          height="40px"
          width="40px"
        />
        <img
          src={logoDark}
          alt="Study Pulse"
          className="hidden dark:block"
          height="40px"
          width="40px"
        />
        {!collapsed && (
          <p className="font-bold text-2xl text-gray-600 transition-colors dark:text-slate-50">
            Study Pulse
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

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
