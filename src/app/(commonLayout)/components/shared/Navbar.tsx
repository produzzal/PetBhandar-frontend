"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js
import { FaShoppingCart } from "react-icons/fa"; // Import React Icons
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // For search input
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Check if the user is authenticated and their role from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setIsAdmin(user.role === "admin");
    }
  }, []);

  // Toggle dropdown menu
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown
  const closeDropdown = () => setIsDropdownOpen(false);

  // Handle logout
  const handleLogout = () => {
    // Clear user data from localStorage and set state to initial values
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="navbar bg-[#003B95] text-white">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            onClick={toggleDropdown}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          {isDropdownOpen && (
            <ul
              className="menu menu-sm dropdown-content mt-3 z-[9999] bg-base-100 rounded-box w-52 p-2 shadow text-black sm:w-56 sm:max-w-[250px] md:w-[320px] lg:w-auto whitespace-normal"
              onClick={closeDropdown}
            >
              <li>
                <Link
                  href="/"
                  className="text-black hover:bg-blue-200 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-black hover:bg-blue-200 hover:text-white"
                >
                  Products
                </Link>
              </li>
            </ul>
          )}
        </div>
        <Link href="/" className="btn btn-ghost text-2xl">
          PetBhandar
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              href="/"
              className="text-white text-xl font-semibold hover:bg-blue-200 hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="text-white font-semibold text-xl hover:bg-blue-500 hover:text-white"
            >
              Products
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        {/* Cart Icon (Always visible) */}
        <div className="lg:block">
          <Link href="/cart" className="text-white">
            <FaShoppingCart className="w-6 h-6" />
          </Link>
        </div>

        {/* Search Bar (Visible on mobile and large devices) */}
        <div className="lg:hidden flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="input input-bordered text-black h-10 w-24 sm:w-32 lg:w-40" // Short search bar
          />
        </div>
        <div className="hidden lg:flex">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="input input-bordered text-black w-32 sm:w-40 lg:w-48" // Larger search bar on desktop
          />
        </div>

        {/* User Authentication */}
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={toggleDropdown}
            >
              <div className=" rounded-full">
                <Image
                  width={20}
                  height={20}
                  src="/assets/user.png"
                  alt="User Avatar"
                />
              </div>
            </label>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[9999] mt-3 w-52 p-2 shadow text-black sm:w-56 sm:max-w-[250px] md:w-[320px] lg:w-auto whitespace-normal"
                onClick={closeDropdown}
              >
                {isAdmin ? (
                  <>
                    <li>
                      <Link
                        href="/admin/"
                        className="text-black hover:bg-blue-500 hover:text-white"
                      >
                        User Management
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/"
                        className="text-black hover:bg-blue-500 hover:text-white"
                      >
                        Product Management
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/"
                        className="text-black hover:bg-blue-500 hover:text-white"
                      >
                        Category Management
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/"
                        className="text-black hover:bg-blue-500 hover:text-white"
                      >
                        Order and payment Management
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="btn btn-ghost">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/my-bookings"
                        className="text-black hover:bg-blue-500 hover:text-white"
                      >
                        My Bookings
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="btn btn-ghost">
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        ) : (
          <Link href="/login" className="btn">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
