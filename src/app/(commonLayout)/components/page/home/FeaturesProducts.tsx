"use client";
import nexiosInstance from "@/config/nexios.config";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [featuresProducts, setFeaturesProducts] = useState([]);
  const [error, setError] = useState<string | null>(null);
  console.log("FP", featuresProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await nexiosInstance.get("/products");
        setFeaturesProducts(response.data.data);
      } catch (err) {
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-16">
      <div className="container mx-auto px-0 sm:px-4">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Featured Pet Products Your Pets Will Love!
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuresProducts.slice(0, 8).map((product) => (
            <div
              key={product._id}
              className="product-card bg-white w-full p-3 md:p-6 rounded-2xl shadow-lg hover:shadow-neutral-400 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Image with Zoom Effect */}
              <div className="w-full h-40 sm:h-52 md:h-52 relative mb-4 overflow-hidden">
                {" "}
                {/* Decreased height on mobile */}
                <Image
                  src={product.productImages[0]}
                  alt={product.name}
                  width={600}
                  height={208}
                  unoptimized
                  className="object-cover w-full h-full rounded-xl transition-transform duration-300 transform hover:scale-110"
                />
              </div>

              {/* Product Name */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 truncate">
                  {product.name}
                </h3>
              </div>

              {/* Price and Add to Cart Button */}
              <div className="flex justify-between items-center mt-auto">
                <span className="text-sm mt-5 sm:text-base md:text-lg font-bold">
                  BDT {product.price}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product._id);
                  }}
                  className="mt-4 sm:mt-6 md:mt-7 rounded border-2 border-blue-700 px-2 sm:px-4 py-2 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* See More Products Button */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="rounded bg-blue-700 px-6 py-3 text-white hover:bg-blue-600 transition-all duration-200 cursor-pointer"
          >
            See All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
