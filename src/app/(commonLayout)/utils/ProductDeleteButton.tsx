// components/DeleteButton.tsx
"use client";

import { useState } from "react";
import nexiosInstance from "@/config/nexios.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteButton = ({ productId }: { productId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (productId: string) => {
    setLoading(true);
    try {
      const response = await nexiosInstance.delete(`/products/${productId}`);

      if (response.status === 200) {
        toast.success("Product deleted successfully!"); // Success toast
        return true; // Indicate that the delete was successful
      } else {
        throw new Error("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product."); // Error toast
      return false; // Indicate failure
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleDeleteClick = async () => {
    const isDeleted = await handleDelete(productId);
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
