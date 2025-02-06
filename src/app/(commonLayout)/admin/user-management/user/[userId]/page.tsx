/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import nexiosInstance from "@/config/nexios.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiResponse } from "@/app/(commonLayout)/utils/interface/user.interface";

const UpdateUserRole = ({ params }: { params: any }) => {
  const { userId }: { userId: any } = React.use(params);

  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await nexiosInstance.put<ApiResponse>(
        `/users/${userId}`,
        { role }
      );
      if (response.status === 200) {
        toast.success(response.data.message);

        setTimeout(() => {
          window.location.href = "/admin/user-management";
        }, 1000);
      } else {
        toast.error(response.data.message || "Update failed"); // Handle any error message
      }
    } catch (err) {
      setError("Failed to update user role. Try again.");
      console.error("failed to update user", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl md:text-3xl font-bold mb-8 text-gray-800">
        Update User Role
      </h1>

      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md">
        <label className="block mb-2 text-gray-700 font-semibold">
          Select Role:
        </label>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          type="submit"
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Role"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateUserRole;
