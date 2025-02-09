"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import nexiosInstance from "@/config/nexios.config";
import MobileCart from "../utils/Cart/MobileCart";
import DesktopCart from "../utils/Cart/DesktopCart";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // For loading state
  const [error, setError] = useState<string | null>(null);
  const [noDataMessage, setNoDataMessage] = useState<string | null>(null);

  // Fetch cart data from backend using userId

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user)._id : null;

        if (!userId) {
          toast.error("Please login to add product to cart");

          // Redirect to login page after 2 seconds
          setTimeout(() => {
            window.location.href = "/login";
          }, 2000);

          return;
        }

        const response = await nexiosInstance.get(`/cart/${userId}`);
        const cartData = response.data.data;

        if (response.data.success === false) {
          setNoDataMessage("No items in your cart.");
          console.log("no data found");
        } else {
          setCartItems(cartData);
          setNoDataMessage(null); // Reset the message if cart has items
        }
      } catch (error) {
        setError("Error fetching cart data.");
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (cartId: string) => {
    try {
      const toastId = toast.info(
        <div className="flex flex-col items-center justify-center space-y-4">
          <span className="text-lg">
            Are you sure you want to delete this item?
          </span>
          <div className="flex space-x-4">
            <button
              onClick={async () => {
                try {
                  const response = await nexiosInstance.delete(
                    `/cart/${cartId}`
                  );

                  if (response.status === 200) {
                    // ✅ Remove from state
                    setCartItems((prevItems) => {
                      const updatedItems = prevItems.filter(
                        (item) => item._id !== cartId
                      );

                      // ✅ Update localStorage cart count
                      localStorage.setItem(
                        "cartCount",
                        updatedItems.length.toString()
                      );

                      return updatedItems;
                    });

                    toast.success(
                      response.data.message || "Item removed successfully"
                    );
                  } else {
                    toast.error(response.data.message || "Delete failed");
                  }
                } catch (error) {
                  toast.error("An error occurred while deleting the item.");
                  console.error("Error removing item:", error);
                }
                toast.dismiss(toastId);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(toastId)}
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
    } catch (error) {
      console.error("Error initiating item removal:", error);
      toast.error("An error occurred while preparing the delete operation.");
    }
  };

  let updateTimeout: NodeJS.Timeout;

  const handleQuantityChange = async (
    productId: string,
    operation: "increase" | "decrease"
  ) => {
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user)._id : null;
    if (!userId) return;

    let newQuantity = 0;
    const updatedCart = cartItems.map((item) => {
      if (item._id === productId) {
        newQuantity =
          operation === "increase" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Clear previous timeout to prevent unnecessary API calls
    clearTimeout(updateTimeout);

    // Update the cart in the UI immediately
    setCartItems(updatedCart);

    // Delay the API request until 1 second after the last click
    updateTimeout = setTimeout(async () => {
      try {
        const updatedItem = updatedCart.find((item) => item._id === productId);
        if (!updatedItem) {
          console.error("❌ Item not found in updated cart");
          setLoading(false);
          return;
        }

        const response = await nexiosInstance.put(`/cart/${userId}`, {
          product: updatedItem.product._id,
          quantity: newQuantity,
        });

        console.log(response.data);

        if (response.data.success === true) {
          toast.success("Cart updated successfully");

          // Delay page refresh for a smooth loading experience
          setTimeout(() => {
            setLoading(false);
            window.location.reload(); // Trigger reload only once
          }, 1500);
        } else {
          toast.error(response.data.message);
          setTimeout(() => {
            setLoading(false);
            window.location.reload(); // Trigger reload only once
          }, 1500);
        }
      } catch (error) {
        console.error("❌ Error updating cart item:", error);
        setLoading(false);
      }
    }, 1500); // 🔥 Wait 1 second after last click
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-indigo-600"></div>
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 mt-20">
      <h2 className="text-xl md:text-3xl md:ml-5 font-bold mb-8 text-gray-800">
        My Shopping Cart
      </h2>

      {noDataMessage ? (
        // If no data message is set, show it
        <div className="flex flex-col items-center justify-center ">
          {/* Animated Image */}
          <div className="w-44 h-44 animate-bounce">
            <img
              src="https://i.ibb.co.com/RpSqghvp/empty-cart.webp"
              alt="Empty Cart"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="text-center text-xl font-semibold text-gray-600 mb-2">
            Your cart is Empty
          </div>
          <p className="text-md text-center text-gray-500">
            Look like you added nothing in your cart!
          </p>
          <p className="text-md text-center text-gray-500">
            Go and explore our products
          </p>

          {/* Redirect Button */}
          <button
            onClick={() => (window.location.href = "/products")}
            className="bg-pink-600 text-white px-6 py-2 mt-8 rounded hover:bg-pink-700 transition duration-300"
          >
            Go to Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Mobile View */}
          <div className="lg:hidden">
            <MobileCart
              cartItems={cartItems}
              handleRemoveItem={handleRemoveItem}
              handleQuantityChange={handleQuantityChange}
            />
          </div>
          {/* Desktop View */}
          <div className="hidden lg:block">
            <DesktopCart
              cartItems={cartItems}
              handleRemoveItem={handleRemoveItem}
              handleQuantityChange={handleQuantityChange}
            />
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default CartPage;
