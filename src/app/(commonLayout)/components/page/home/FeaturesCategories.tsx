"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import nexiosInstance from "@/config/nexios.config";
import {
  ApiResponse,
  TCategory,
} from "@/app/(commonLayout)/utils/interface/category.interface";

const FeaturedCategories: React.FC = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await nexiosInstance.get<ApiResponse>("/categories", {
          cache: "force-cache",
        });
        setCategories(response.data.data);
      } catch (err) {
        setError("Failed to load categories.");
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-16">
      <h2 className="text-xl md:text-3xl md:ml-5 font-bold mb-8 text-gray-800">
        Everything Your Pet Needs in Our Featured Categories
      </h2>
      <div className="grid grid-cols-3 gap-5 md:gap-0 md:grid-cols-6 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={`/category/${category.name}`}
            className="w-full flex flex-col items-center text-center"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 mb-4 flex justify-center items-center">
              <Image
                src={category.image}
                alt={category.name}
                width={160} // Image width for large screens
                height={160} // Image height for large screens
                className="rounded-full object-cover"
                unoptimized
              />
            </div>
            <span className="mt-2 text-lg font-semibold">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
