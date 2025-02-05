"use client";
import nexiosInstance from "@/config/nexios.config";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const UpdateCategoryForm: React.FC = ({ params }) => {
  const { categoryId } = React.use(params);
  const [category, setCategory] = useState<any>(null); // Use 'any' or define a type for category
  console.log(categoryId);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await nexiosInstance.get(`/categories/${categoryId}`);
        setCategory(response.data.data); // Set the fetched category data
      } catch (error) {
        console.log("Error fetching category data:", error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const categoryData = {
      name: formData.get("name"),
      description: formData.get("description"),
      image: formData.get("image"),
    };

    try {
      const response = await nexiosInstance.put(
        `/categories/${categoryId}`,
        categoryData
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "/admin/category-management";
        }, 1000);
      } else {
        toast.error(response.data.message || "Category update failed");
      }
    } catch (error) {
      toast.error("Error updating category");
    }
  };

  // Render form if category data is loaded
  if (!category) {
    return <div>Loading...</div>; // Loading state until the category is fetched
  }

  return (
    <div className="max-w-2xl mt-16 mx-auto px-6 py-10 bg-white rounded-lg shadow-xl border border-gray-200">
      <h2 className="text-xl md:text-3xl font-bold text-center mb-8 text-gray-800">
        Update Category Page
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
            defaultValue={category.name}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
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
            defaultValue={category.description}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            rows={4}
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
            defaultValue={category.image}
            className="w-full p-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300 hover:border-blue-500"
            placeholder="Paste image URL here"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ease-in-out duration-300"
        >
          Update Category
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateCategoryForm;
