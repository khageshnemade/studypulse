import PropTypes from "prop-types";
import { useState } from "react";
import { Link, NavLink,useLocation } from "react-router-dom";
import useWindowPosition from "../../Hooks/useWindowPosition";

function Header({ className, logo, joinBtn, search }) {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const windowPosition = useWindowPosition();
  const location = useLocation();

  return (
    // <header
    //   className={`${className ? className : "header-01"} sticky ${windowPosition > 0 && "fix-header animated fadeInDown"
    //     }`}
    // >
     <header className="relative z-10 flex h-[60px] items-center justify-between bg-[#9AA6B2] px-4 shadow-md">
  {/* Logo Section */}
  <div className="flex items-center gap-4">
    <Link to="/" className="flex items-center">
      <img src={logo} alt="Logo" className="h-12 w-auto" />
         
        </Link>
  </div>

  {/* Navigation Section */}
  <nav className="flex items-center">
    <ul className="flex items-center gap-4">
      {/* Conditionally Render Buttons */}
      {location.pathname === "/login" || location.pathname === "/" ? (
        <li>
          <Link
            to="/register"
            className="px-4 py-2 rounded-md text-sm font-medium text-white border border-white/20  hover:bg-[#D9EAFD] hover:border-[#D9EAFD] hover:text-black transition"
          >
            Register
          </Link>
        </li>
      ) : location.pathname === "/register" ? (
        <li>
          <Link
            to="/login"
            className="px-4 py-2 rounded-md text-sm font-medium text-white border border-white/20   hover:bg-[#D9EAFD] hover:border-[#D9EAFD]hover:text-black transition"
          >
            Login
          </Link>
        </li>
      ) : null}
    </ul>
  </nav>

  {/* Optional Search Box (Hidden by Default) */}
  {search && (
    <form className="hidden md:flex items-center space-x-2">
      <input
        type="text"
        placeholder="Search Courses..."
        className="px-3 py-2 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button type="submit" className="text-white">
        <i className="ti-search"></i>
      </button>
    </form>
  )}
</header>

  );
}

Header.propTypes = {
  className: PropTypes.string,
  logo: PropTypes.string,
  joinBtn: PropTypes.bool,
  search: PropTypes.bool,
};

export default Header;
