import { useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";

import { toast } from "react-toastify";
import userLogo from "../assets/user.png";

const ProfileDropdown = () => {
  const { user, logOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);

  const handleMouseLeave = () => setIsOpen(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logOutUser()
      .then(() => toast.success("Logged out.See you soon, Artist!"))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggleDropdown}
        className="flex cursor-pointer items-center"
      >
        <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden active:scale-90 transition-transform duration-200 ">
          <img
            src={user?.photoURL || userLogo}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </button>

      <div
        className={`absolute right-0 mt-2 w-50 bg-base-100  rounded-xl shadow-md border border-gray-400 z-10 transition-all duration-300 font-text ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        }`}
      >
        <div className="px-4 py-3 border-b border-gray-400">
          <p className="font-semibold">{user?.displayName}</p>
        </div>

        <ul className="py-2 text-sm ">
          <li>
            <NavLink
              to="/my-profile"
              className="block px-4 py-2 hover:text-primary hover:scale-95 transition-all"
            >
              My Profile
            </NavLink>
          </li>

          <hr className="my-1 border-gray-400" />
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 font-semibold text-red-500 transition-all cursor-pointer hover:scale-95"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;
