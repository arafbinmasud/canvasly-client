import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";
import NavButtons from "./NavButtons";

const Navbar = () => {
  const { user, loading } = useAuth();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/explore-artworks">Explore Artworks</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-artworks">Add Artwork</NavLink>
          </li>
        </>
      )}
      <li>
        <a>My Gallery</a>
      </li>
      <li>
        <a>My Favorites</a>
      </li>
      <li>
        <a>My Favorites</a>
      </li>
      <li>
        <a>My Favorites</a>
      </li>
    </>
  );

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <header className="bg-base-100 border-b border-primary/50 sticky top-0 z-100 shadow-md">
      <nav className="flex items-center justify-between max-w-350 mx-auto py-2 px-4 md:px-2">
        <div className=" left flex items-center">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-text"
            >
              {links}
            </ul>
          </div>

          <p className="hidden md:block text-3xl font-bold font-heading cursor-pointer">
            Can<span className="text-primary">vas</span>Ly
          </p>

          <ul className="menu menu-horizontal px-1 hidden lg:flex ml-6 font-text">
            {links}
          </ul>
        </div>

        <div className="right flex items-center justify-center gap-3">
          <button onClick={toggleTheme} className="cursor-pointer btn-circle">
            {theme === "light" ? (
              <FaMoon size={20}></FaMoon>
            ) : (
              <IoSunny size={20} />
            )}
          </button>

          {loading ? (
            <span className="loading bg-primary loading-spinner loading-md"></span>
          ) : user ? (
            <ProfileDropdown />
          ) : (
            <NavButtons />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
