// components/DeleteButton.tsx
"use client";

import { useState } from "react";
import nexiosInstance from "@/config/nexios.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteButton = ({ categoryId }: { categoryId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (categoryId: string) => {
    setLoading(true);
    try {
      const response = await nexiosInstance.delete(`/categories/${categoryId}`);
      console.log(response);

      if (response.status === 200) {
        toast.success("Category deleted successfully!");
        return true;
      } else {
        throw new Error("Failed to delete the category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    const isDeleted = await handleDelete(categoryId);
    if (isDeleted) {
      // Trigger UI update (e.g., refresh or re-fetch products)
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      // Simple page reload
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-red-600 transition-all duration-200"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
      {/* ToastContainer will render the toasts */}
      <ToastContainer />
    </>
  );
};

export default DeleteButton;
