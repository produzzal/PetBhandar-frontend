"use client";
import { useState } from "react";

const DesktopSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="hidden md:flex w-72 relative">
      <input
        type="text"
        placeholder="Search Products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-50 w-full pl-10"
      />
      <button className="absolute text-3xl text-pink-700 right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 rounded-r-lg  transition -rotate-90">
        ⌕
      </button>
    </div>
  );
};

export default DesktopSearchBar;
