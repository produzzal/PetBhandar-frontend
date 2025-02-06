"use client";
import { ApiResponse } from "@/app/(commonLayout)/utils/interface/category.interface";
import nexiosInstance from "@/config/nexios.config";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AddCategoryForm: React.FC = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await nexiosInstance.post<ApiResponse>(
        "/categories",
        categoryData
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setCategoryData({
          name: "",
          description: "",
          image: "",
        });
      } else {
        toast.error(response.data.message || "Category addition failed.");
      }
    } catch (err) {
      toast.error("An error occurred while adding the category.");
      console.error("An error occurred while adding the category", err);
    }
  };

  return (
    <div className="max-w-2xl mt-16 mx-auto px-6 py-10 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-xl md:text-3xl font-bold  mb-8 text-gray-800">
        Add Category Page
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={categoryData.name}
            onChange={handleInputChange}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            required
          />
        </div>

        {/* Category Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-gray-700"
          >
            Category Description
          </label>
          <textarea
            id="description"
            name="description"
            value={categoryData.description}
            onChange={handleInputChange}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            rows={4}
            required
          />
        </div>

        {/* Category Image URL */}
        <div>
          <label
            htmlFor="image"
            className="block text-lg font-semibold text-gray-700"
          >
            Category Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={categoryData.image}
            onChange={handleInputChange}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            placeholder="Paste image URL here"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
        >
          Add Category
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCategoryForm;
