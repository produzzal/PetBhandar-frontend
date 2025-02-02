"use client";
import nexiosInstance from "@/config/nexios.config";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [featuresProducts, setFeaturesProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log("FP", featuresProducts);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await nexiosInstance.get("/products");
        setFeaturesProducts(response.data.data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Function to truncate text with ellipses
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-0 sm:px-4">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Featured Pet Products Your Pets Will Love!
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {featuresProducts.slice(0, 6).map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} passHref>
              <div className="product-card bg-white w-full p-6 rounded-2xl shadow-lg transition-all duration-300 flex flex-col justify-between h-full cursor-pointer">
                {/* Image with Hover Effect */}
                <div className="w-full h-52 relative mb-4 hover:bg-gray-100 transition-all duration-300">
                  <Image
                    src={product.productImages[0]}
                    alt={product.name}
                    width={600} // Set width for the image
                    height={208} // Set height to fix the image size
                    unoptimized
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow text-justify">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                    {product.name} {/* Truncate name to 1 line */}
                  </h3>
                  <p className="text-gray-600 font-semibold mb-4 line-clamp-3">
                    {product.description}{" "}
                    {/* Truncate description to 3 lines */}
                  </p>
                </div>

                {/* Price and Add to Cart Button */}
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg mt-7 font-bold">
                    BDT {product.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevents Link navigation when clicking on the button
                      handleAddToCart(product.id);
                    }}
                    className="mt-6 rounded border-2 border-blue-700 px-4 py-2 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
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
