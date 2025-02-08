/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import nexiosInstance from "@/config/nexios.config";
import SimilarProducts from "../../utils/SimilarProducts";
import { ApiResponse } from "../../utils/interface/product.interface";
import Link from "next/link";
import { addToCart } from "../../utils/Cart/AddToCart";
import { toast, ToastContainer } from "react-toastify";

const ProductDetailsPage = ({ params }: { params: any }) => {
  const { productId }: { productId: any } = React.use(params);
  const [product, setProduct] = useState<any>(null); // Store the fetched product data
  const [currentImage, setCurrentImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1); // Track selected quantity
  const [activeTab, setActiveTab] = useState("details");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const response = await nexiosInstance.get<ApiResponse>(
            `/products/${productId}`
          );
          setProduct(response.data.data);
          setCurrentImage(response.data.data.productImages?.[0] || "");
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (operation: "increase" | "decrease") => {
    setQuantity((prev) =>
      operation === "increase" && prev < product.stockQuantity
        ? prev + 1
        : operation === "decrease" && prev > 1
        ? prev - 1
        : prev
    );
  };

  const handleAddToCart = async () => {
    try {
      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user)._id : null;

      if (!userId) {
        toast.error("Please login to add product to cart");

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "/login"; // Change this to your login page route
        }, 2000);

        return;
      }
      const response: any = await addToCart(userId, product._id, quantity);
      if (response.statusCode === 200) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to added items");
      console.error(error);
    }
  };

  if (!product) return <p>Loading...</p>; // Show loading while data is fetched

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Flex Container for Image and Product Info */}
      <div className=" md:flex ">
        {/* Left Section (Product Image) */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-96 mb-6 rounded-lg shadow-lg overflow-hidden">
            <Image
              src={currentImage || "/placeholder.jpg"} // Use a placeholder if no image
              alt={product.name}
              width={600}
              height={600}
              unoptimized
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>

          <div className="flex gap-4 justify-center mt-4">
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

        {/* Right Section (Product Information) */}
        <div className="w-full md:w-1/2 md:pl-8 mt-10">
          <h3 className="text-xl md:text-3xl  text-gray-900">{product.name}</h3>
          <p className="text-md my-2  text-[#7B838F]">
            Category <span className="text-pink-500">{product.category}</span>
          </p>
          <p className="text-md md:text-xl my-2 font-bold font-[#1F2937]">
            <span className="font-extrabold">৳</span>
            {product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="w-2/3 flex justify-between items-center">
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

            <span className="text-lg text-[#7B838F] mb-6 mr-3 md:mr-40">
              <span>Stock: </span>
              <span className="text-pink-500">{product.stockQuantity}</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="rounded bg-pink-600 px-10 py-3 text-white hover:bg-pink-700 transition-all duration-200 cursor-pointer"
            >
              Buy Now
            </Link>
            <button
              onClick={handleAddToCart}
              className="w-36 text-center rounded border-1 border-pink-600 px-2 sm:px-4 py-2 md:py-3 text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Full Description and Similar Items Sections */}
      <div className="mt-12">
        {/* // Tab Navigation */}
        <div className="flex border-b-2 mb-6">
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "details"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => handleTabClick("details")}
          >
            Details
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "questions"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => handleTabClick("questions")}
          >
            Questions
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${
              activeTab === "reviews"
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => handleTabClick("reviews")}
          >
            Reviews
          </button>
        </div>
        <div className="content-section">
          {activeTab === "details" && (
            <div className="details-content">
              <h3 className="text-xl font-semibold text-gray-800">
                Full Description
              </h3>
              <p className="text-lg text-gray-700">{product.description}</p>
            </div>
          )}

          {activeTab === "questions" && (
            <div className="questions-content">
              <h3 className="text-xl font-semibold text-gray-800">Questions</h3>
              <p className="text-lg text-gray-700">
                No questions have been asked yet.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="reviews-content">
              <h3 className="text-xl font-semibold text-gray-800">Reviews</h3>
              <p className="text-lg text-gray-700">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>
        {/* Similar products code */}
        <SimilarProducts category={product.category} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetailsPage;
