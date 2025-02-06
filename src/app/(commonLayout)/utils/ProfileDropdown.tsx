"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import nexiosInstance from "@/config/nexios.config";

const ProfileDropdown = () => {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await nexiosInstance.post("/auth/logout", {});

      if (response.status === 200) {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        {/* Profile Icon for Desktop, 3-Line Button for Mobile */}
        <button
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <div className="hidden sm:block w-9 h-9 lg:w-10 lg:h-10 rounded-full border-2 border-white overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={
                user?.photo ||
                "https://img.icons8.com/ios-glyphs/30/user--v1.png"
              }
              alt="Profile"
            />
          </div>

          <div className="block sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* Sidebar Menu for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed top-0 right-0 bg-white z-50 shadow-lg transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-11/20 sm:w-9/20 h-7/10" : "w-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-black text-xl font-semibold"
          >
            &times; {/* Close button (×) */}
          </button>
        </div>

        <ul className="menu menu-sm bg-white text-[#1F2937] -mt-5 md:mt-0 text-md md:text-lg font-semibold">
          {user ? (
            <>
              {user?.role === "admin" ? (
                <>
                  <li>
                    <Link
                      href="/admin/user-management"
                      className="hover:bg-gray-100 p-2 rounded-lg"
                      onClick={() => setSidebarOpen(false)}
                    >
                      User Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/product-management"
                      className="hover:bg-gray-100 p-2 rounded-lg"
                      onClick={() => setSidebarOpen(false)}
                    >
                      Product Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/category-management"
                      className="hover:bg-gray-100 p-2 rounded-lg"
                      onClick={() => setSidebarOpen(false)}
                    >
                      Category Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/order-management"
                      className="hover:bg-gray-100 p-2 rounded-lg"
                      onClick={() => setSidebarOpen(false)}
                    >
                      Order Management
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="hover:bg-gray-100 p-2 rounded-lg"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/order-history"
                      className="hover:bg-gray-100 p-2 rounded-lg"
                    >
                      Order History
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wishlist"
                      className="hover:bg-gray-100 p-2 rounded-lg"
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      className="hover:bg-gray-100 p-2 rounded-lg"
                    >
                      Shopping Cart
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings"
                      className="hover:bg-gray-100 p-2 rounded-lg"
                    >
                      Settings
                    </Link>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:bg-gray-100 p-2 rounded-lg"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className="hover:bg-gray-100 p-2 rounded-lg"
                  onClick={() => setSidebarOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="hover:bg-gray-100 p-2 rounded-lg"
                  onClick={() => setSidebarOpen(false)}
                >
                  SignUp
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default ProfileDropdown;
