"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CartButton = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [user, setUser] = useState<string | null>(null);

  // Function to update cart count
  const updateCartCount = () => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cartData.length);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safe to access localStorage here
      const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUser(loggedUser?._id || null);

      updateCartCount(); // Initial cart count load

      // Listen for the custom event "cartUpdated"
      const handleCartUpdate = () => updateCartCount();
      window.addEventListener("cartUpdated", handleCartUpdate);

      return () => {
        window.removeEventListener("cartUpdated", handleCartUpdate);
      };
    }
  }, []);

  return (
    <Link href={`/cart/${user}`} className="relative group">
      <button className="px-2">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="32.000000pt"
          height="32.000000pt"
          viewBox="0 0 32.000000 32.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path d="M40 241 c0 -5 8 -11 19 -14 12 -3 20 -18 25 -48 4 -24 14 -51 23 -61 11 -12 12 -18 4 -18 -23 0 -7 -45 17 -48 27 -4 40 22 22 43 -11 13 -7 15 25 15 32 0 36 -2 25 -15 -18 -21 -5 -47 22 -43 24 3 40 48 17 48 -8 0 -7 5 3 18 8 9 18 29 22 44 3 14 9 33 12 42 5 14 -5 16 -80 16 -51 0 -86 -4 -86 -10 0 -6 30 -10 70 -10 l70 0 -6 -27 c-10 -41 -16 -44 -75 -41 l-53 3 -14 58 c-12 50 -17 57 -38 57 -13 0 -24 -4 -24 -9z" />
          </g>
        </svg>
      </button>
      {/* Cart Item Count Badge */}
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full group-hover:scale-110 transition">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
