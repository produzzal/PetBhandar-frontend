"use client";
import AddToCartPopup from "@/app/(commonLayout)/utils/AddToCartPopupPage";
import {
  ApiResponse,
  TProduct,
} from "@/app/(commonLayout)/utils/interface/product.interface";
import nexiosInstance from "@/config/nexios.config";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [featuresProducts, setFeaturesProducts] = useState<TProduct[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await nexiosInstance.get<ApiResponse>("/products");
        setFeaturesProducts(response.data.data);
      } catch (err) {
        setError("Failed to load products.");
        console.error("failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCartClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: TProduct
  ) => {
    e.stopPropagation(); // Prevent navigation
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-16 relative">
      <div className="container mx-auto px-0 sm:px-4">
        <h2 className="text-xl md:text-3xl font-bold md:ml-5 mb-8 text-gray-800">
          Featured Pet Products Your Pets Will Love!
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuresProducts.slice(0, 8).map((product) => (
            <div
              key={product._id}
              className="product-card bg-white w-full p-3 md:p-6 rounded-2xl shadow-lg hover:shadow-neutral-400 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
            >
              {/* Link for Image and Product Name */}
              <Link href={`/products/${product._id}`}>
                <div>
                  {/* Image with Zoom Effect */}
                  <div className="w-full h-40 sm:h-52 md:h-52 relative mb-4 overflow-hidden">
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
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A101A] mb-2 truncate">
                    {product.name}
                  </h3>
                </div>
              </Link>

              {/* Price and Add to Cart Button */}
              <div className="text-md md:text-xl mt-3 font-bold font-[#1F2937]">
                <span className="font-extrabold">৳</span>
                {product.price}
              </div>

              {/* Add to Cart Button - Prevents Link Navigation */}
              <button
                onClick={(e) => handleAddToCartClick(e, product)}
                className="w-full mt-4 rounded border-1 border-pink-600 px-2 sm:px-4 py-2 md:py-3 text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* See More Products Button */}
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="rounded bg-pink-600 px-6 py-3 text-white hover:bg-pink-700 transition-all duration-200 cursor-pointer"
          >
            See All Products
          </Link>
        </div>
      </div>

      {/* Full-Screen Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-[100] backdrop-blur-sm">
          {/* Modal Content */}
          <div className="relative bg-white p-6 rounded-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
            >
              ✕
            </button>

            {/* Add to Cart Popup */}
            <AddToCartPopup product={selectedProduct} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
