"use client";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import nexiosInstance from "@/config/nexios.config";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiResponse, TUser } from "../../utils/interface/user.interface";

const UserManagement = () => {
  // State to store users and loading/error states
  const [users, setUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users data on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await nexiosInstance.get<ApiResponse>("/users", {
          cache: "no-store",
        });
        setUsers(response.data.data); // Set users data
      } catch (err) {
        setError("Failed to load users");
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchUsers(); // Call fetchUsers function
  }, []);

  // Handle delete user
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (userId: any) => {
    // Create a toast reference to control its dismissal
    const toastId = toast.info(
      <div className="flex flex-col items-center justify-center space-y-4">
        <span className="text-lg">
          Are you sure you want to delete this user?
        </span>
        <div className="flex space-x-4">
          <button
            onClick={async () => {
              try {
                const response = await nexiosInstance.delete<ApiResponse>(
                  `/users/${userId}`
                );
                if (response.status === 200) {
                  toast.success(response.data.message);
                  // Remove the deleted user from the list
                  setUsers(users.filter((user) => user._id !== userId));
                } else {
                  toast.error(response.data.message || "Delete failed");
                }
              } catch {
                toast.error("An error occurred.");
              }
              // Dismiss the toast after the action
              toast.dismiss(toastId);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => {
              toast.dismiss(toastId); // Dismiss the toast on "No"
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        hideProgressBar: true,
        className: "flex justify-center items-center",
      }
    );
  };

  // Loading or error message
  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl md:text-3xl font-bold mb-8 text-gray-800">
        User Management
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[#0A101A] text-md">
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 whitespace-nowrap">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.phone}</td>
                <td className="py-3 px-6">{user.role}</td>
                <td className="py-3 px-6 text-center flex justify-center items-center gap-1">
                  <Link href={`/admin/user-management/user/${user._id}`}>
                    <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-9">
                      <FaEdit className="text-white" size={20} />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 w-9"
                  >
                    <FaTrashAlt className="text-white" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserManagement;
