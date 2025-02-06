"use client";
import { ApiResponse } from "@/app/(commonLayout)/utils/interface/category.interface";
import nexiosInstance from "@/config/nexios.config";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddProductForm: React.FC = () => {
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
        console.error("Failed to load categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const imageLinks = (formData.get("images") as string)
      .split(",") // Split by commas for multiple image links
      .map((link) => link.trim()); // Trim spaces

    const productData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
      stockQuantity: parseInt(formData.get("stockQuantity") as string, 10),
      category: formData.get("category"),
      productImages: imageLinks,
    };

    // add product in backend

    const response = await nexiosInstance.post<ApiResponse>(
      "/products",
      productData
    );
    if (response.status === 200) {
      toast.success(response.data.message);
      form.reset();
    } else {
      toast.error(response.data.message || "Product added failed");
    }
  };

  return (
    <div className="max-w-2xl mt-16 mx-auto px-6 py-10 bg-white rounded-lg shadow-xl mb-10 border border-gray-200">
      <h2 className="text-xl md:text-3xl font-bold mb-8 text-gray-800">
        Add Product Page
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-gray-700"
          >
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Product Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-lg font-semibold text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            required
            min={0}
          />
        </div>

        {/* Stock Quantity */}
        <div>
          <label
            htmlFor="stockQuantity"
            className="block text-lg font-semibold text-gray-700"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            required
            min={0}
          />
        </div>

        {/* Product Category (Dynamic Dropdown) */}
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-semibold text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            required
          >
            {categoryNames.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image URLs (Text Input for Multiple Image Links) */}
        <div>
          <label
            htmlFor="images"
            className="block text-lg font-semibold text-gray-700"
          >
            Product Image URLs (separate with commas)
          </label>
          <input
            type="text"
            id="images"
            name="images"
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            placeholder="Paste image URLs here, separated by commas"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2  transition ease-in-out duration-300"
        >
          Add Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProductForm;
