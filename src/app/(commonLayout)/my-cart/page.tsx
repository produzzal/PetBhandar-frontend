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
        console.log(response.data);

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

  // Handle changing the quantity of an item
  const handleQuantityChange = async (
    itemId: string,
    operation: "increase" | "decrease"
  ) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        let newQuantity = item.quantity;

        // Adjust quantity based on the operation
        if (
          operation === "increase" &&
          item.quantity < item.product.availableQuantity
        ) {
          newQuantity += 1;
        } else if (operation === "decrease" && item.quantity > 1) {
          newQuantity -= 1;
        }

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);

    // Update the backend with the new quantity
    try {
      await axios.put(`/api/cart/${itemId}`, {
        quantity: updatedCart.find((item) => item.id === itemId)?.quantity,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
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
