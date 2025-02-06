"use client";
import { useState } from "react";

const MobileSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="left-0 right-0 bg-white shadow-md p-4 md:hidden">
      <div className="relative w-full flex">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 rounded-l-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-pink-50"
        />

        <button className="absolute text-3xl text-pink-700 right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-r-lg  transition -rotate-90">
          ⌕
        </button>
      </div>
    </div>
  );
};

export default MobileSearchBar;
