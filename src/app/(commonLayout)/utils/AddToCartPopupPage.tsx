"use client";
import React, { useState } from "react";
import Image from "next/image";
import { addToCart } from "./Cart/AddToCart";
import { toast, ToastContainer } from "react-toastify";
import { TCart } from "./interface/cart.interface";

const AddToCartPopup = ({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<string>(
    product.productImages?.[0] || "/placeholder.jpg"
  );

  const handleQuantityChange = (operation: "increase" | "decrease") => {
    setQuantity((prev) =>
      operation === "increase" && prev < product.stockQuantity
        ? prev + 1
        : operation === "decrease" && prev > 1
        ? prev - 1
        : prev
    );
  };

  const userId = JSON.parse(localStorage.getItem("user") as string);

  const handleAddToCart = async (productId: string, quantity: number) => {
    try {
      // Check if userId is available (i.e., the user is logged in)
      if (!userId) {
        toast.error("Please login to add product to cart");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }

      // Proceed with adding to cart
      const result = await addToCart(userId, productId, quantity);
      if (result.success === true) {
        toast.success("Product added to cart successfully");
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[100]"
      onClick={onClose} // Close on outside click
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-5xl h-[90vh] overflow-y-auto shadow-xl relative"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        {/* Close Button in Top-Right Corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-600 underline"
        >
          Close
        </button>

        {/* Product Details */}
        <div className="md:flex flex-col md:flex-row pt-8">
          <div className="w-full md:w-1/2">
            {/* Main Image */}
            <div className="relative w-full h-96 mb-6 rounded-lg shadow-lg overflow-hidden">
              <Image
                src={currentImage}
                alt={product.name}
                width={600}
                height={600}
                unoptimized
                className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>

            {/* Image Gallery (Scroll for mobile) */}
            <div className="flex space-x-4 overflow-x-auto mt-4">
              {product.productImages?.map((image: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setCurrentImage(image)}
                  className="w-24 h-24 cursor-pointer border-2 border-transparent hover:border-pink-400 rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${product.name} image ${index + 1}`}
                    width={96}
                    height={96}
                    unoptimized
                    className="object-cover w-full h-full rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 md:pl-8 mt-10 md:mt-0">
            <h3 className="text-xl md:text-3xl text-gray-900">
              {product.name}
            </h3>
            <p className="text-md my-2 text-[#7B838F]">
              Category <span className="text-pink-500">{product.category}</span>
            </p>
            <p className="text-md md:text-xl my-2 font-bold text-[#1F2937]">
              <span className="font-extrabold">৳</span>
              {product.price}
            </p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="px-4 py-2 border border-gray-400 rounded-lg"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="px-4 py-2 border border-gray-400 rounded-lg"
                >
                  +
                </button>
              </div>
              <span className="text-lg text-[#7B838F] mr-32 md:mr-48 mb-6">
                <span>Stock: </span>
                <span className="text-pink-500">{product.stockQuantity}</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => {}}
                className="rounded bg-pink-600 px-10 py-3 text-white hover:bg-pink-700 transition-all duration-200"
              >
                Buy Now
              </button>
              <button
                onClick={() => {
                  handleAddToCart(product._id, quantity);
                }}
                className="w-36 text-center rounded border border-pink-600 px-4 py-3 text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-200"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddToCartPopup;
