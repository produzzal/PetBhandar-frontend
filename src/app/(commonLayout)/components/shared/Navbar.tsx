"use client";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-[#D1D1F9]">
      {/* Navbar Start */}
      <div className="navbar-start">
        <p className="text-2xl font-bold">SopnoMela</p>
      </div>

      {/* Navbar Center - Links Centered */}
      <div className="navbar-center flex justify-center">
        <ul className="menu menu-horizontal px-1 space-x-2 lg:space-x-6">
          <li>
            <a className="text-sm sm:text-base lg:text-xl hover:text-[#60A5FA] transition duration-300">
              Home
            </a>
          </li>
          <li>
            <a className="text-sm sm:text-base lg:text-xl hover:text-[#60A5FA] transition duration-300">
              Products
            </a>
          </li>
          <li>
            <a className=" text-sm sm:text-base lg:text-xl hover:text-[#60A5FA] transition duration-300">
              Cart
            </a>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        <a className="btn text-white bg-blue-700 hover:bg-blue-500 text-sm lg:text-lg ]">
          Login
        </a>
      </div>
    </div>
  );
};

export default Navbar;
