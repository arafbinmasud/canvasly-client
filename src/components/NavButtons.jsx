import React from "react";
import { Link } from "react-router";

const NavButtons = () => {
  return (
    <div className="flex gap-3 items-center justify-center font-text">
      <Link
        to="/login"
        className="btn btn-sm md:btn-md btn-outline btn-primary rounded-full"
      >
        Log In
      </Link>
      <Link
        to="/register"
        className="btn btn-sm md:btn-md btn-primary text-accent rounded-full"
      >
        Register
      </Link>
    </div>
  );
};

export default NavButtons;
