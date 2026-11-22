import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import { AuthContext } from "../context/AuthContext";

// Top navigation bar component
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="w-full bg-white/70 backdrop-blur-md rounded-2xl px-6 py-3 flex items-center justify-between border border-gray-200/60 shadow-sm">
      {/* Left side: Logo & Navigation Tabs */}
      <div className="flex items-center gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="bg-red-700 text-white p-2 rounded-xl shadow-sm flex items-center justify-center">
            <Icon icon="solar:snowflake-bold" height="1.4em" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            Lead<span className="text-xl font-bold text-red-700 tracking-tight">
            Stream
          </span>
          </span>
        </div>

        {/* Navigation Links / Tabs */}
        <div className="hidden md:flex items-center bg-[#E6ECE8] p-1 rounded-xl gap-1">
          <button
            type="button"
            className="px-4 py-1.5 text-sm font-semibold text-gray-900 bg-red-300 rounded-lg shadow-xs cursor-pointer transition"
          >
            Dashboard
          </button>
          <button
            type="button"
            className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg cursor-pointer transition"
          >
            All Leads
          </button>
          <button
            type="button"
            className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg cursor-pointer transition"
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Right side: User Profile & Logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Icon icon="ph:user-bold" height="1.2em" />
          </div>

          {/* User Details */}
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-bold text-gray-900 leading-tight">
              {user.name}
            </span>
            <span className="text-xs text-gray-500">Intern</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          title="Sign Out"
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition"
        >
          <Icon icon="ph:sign-out-bold" height="1.2em" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
