"use client"; // ✅ Client Component

import nexiosInstance from "@/config/nexios.config";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiResponse } from "./interface/product.interface";

const ProductFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current filter values from URL
  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "all";
  const [categoryNames, setCategoryNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await nexiosInstance.get<ApiResponse>("/categories", {
          next: {
            revalidate: 30,
          },
        });
        // Extract only the names and store them in an array
        const names = response.data.data.map(
          (category: { name: string }) => category.name
        );
        setCategoryNames(names);
      } catch (err) {
        console.error("Failed to load", err);
      }
    };

    fetchCategories();
  }, []);

  // Update URL on search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value.trim()) {
      params.set("search", e.target.value.trim());
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Update URL on category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value !== "") {
      params.set("category", e.target.value);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* 🔍 Live Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        defaultValue={searchQuery}
        onChange={handleSearchChange}
        className="w-full md:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-50"
      />

      {/* 🏷 Instant Category Filter */}
      <select
        defaultValue={selectedCategory}
        onChange={handleCategoryChange}
        className="p-2 border border-gray-300 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-pink-50"
      >
        <option value="all">All Categories</option>
        {categoryNames.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
