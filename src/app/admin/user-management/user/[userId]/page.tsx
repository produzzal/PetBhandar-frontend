"use client";
import React, { useState } from "react";
import nexiosInstance from "@/config/nexios.config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateUserRole = ({ params }) => {
  const { userId } = React.use(params);
  console.log(userId);

  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Updating role to:", role);

    try {
      const response = await nexiosInstance.put(`/users/${userId}`, { role });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);

        setTimeout(() => {
          window.location.href = "/admin/user-management";
        }, 2000);
      } else {
        toast.error(response.data.message || "Update failed"); // Handle any error message
      }
    } catch (err) {
      setError("Failed to update user role. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-8 text-gray-800">
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
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
