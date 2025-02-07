"use client";
import React, { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Taiyo Green-1 Fish Food Pouch 100gm",
      price: 65,
      quantity: 3,
      total: 195,
      image: "path_to_image_1", // Replace with actual image path
    },
    {
      id: 2,
      name: "Taiyo Pink Fish Food Pouch 100gm",
      price: 49,
      quantity: 2,
      total: 98,
      image: "path_to_image_2", // Replace with actual image path
    },
  ]);
  const [couponCode, setCouponCode] = useState("");

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCouponApply = () => {
    // Handle coupon logic here
    if (couponCode) {
      alert("Coupon applied");
    } else {
      alert("Please enter a coupon code");
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
    const shipping = 70;
    const discount = 62;
    const total = subtotal + shipping - discount;
    return { subtotal, shipping, discount, total };
  };

  const { subtotal, shipping, discount, total } = calculateTotals();

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="lg:flex justify-between space-x-6">
        {/* Left Side - Cart Items Table */}
        <div className="lg:w-2/3">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Product</th>
                <th className="border-b p-2">Price</th>
                <th className="border-b p-2">Quantity</th>
                <th className="border-b p-2">Total</th>
                <th className="border-b p-2"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="border-b p-2">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="border-b p-2">৳{item.price}</td>
                  <td className="border-b p-2">{item.quantity}</td>
                  <td className="border-b p-2">৳{item.total}</td>
                  <td className="border-b p-2 text-center">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="mb-4">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>৳{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Cost</span>
                <span>৳{shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>Product Discount</span>
                <span>৳{discount}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total Amount</span>
                <span>৳{total}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold">
                Enter your coupon code
              </label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Coupon Code"
              />
              <button
                onClick={handleCouponApply}
                className="mt-2 w-full py-2 bg-blue-500 text-white rounded-md"
              >
                Apply
              </button>
              <p className="text-xs text-gray-500 mt-1">
                * Please sign in to apply coupon
              </p>
            </div>

            <button
              className="w-full py-3 bg-green-500 text-white rounded-md"
              onClick={() => alert("Proceeding to checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden mt-6">
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Product</th>
                <th className="border-b p-2">Price</th>
                <th className="border-b p-2">Quantity</th>
                <th className="border-b p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="border-b p-2">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="border-b p-2">৳{item.price}</td>
                  <td className="border-b p-2">{item.quantity}</td>
                  <td className="border-b p-2">৳{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-4">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span>৳{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Cost</span>
              <span>৳{shipping}</span>
            </div>
            <div className="flex justify-between">
              <span>Product Discount</span>
              <span>৳{discount}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>৳{total}</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">
              Enter your coupon code
            </label>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Coupon Code"
            />
            <button
              onClick={handleCouponApply}
              className="mt-2 w-full py-2 bg-blue-500 text-white rounded-md"
            >
              Apply
            </button>
            <p className="text-xs text-gray-500 mt-1">
              * Please sign in to apply coupon
            </p>
          </div>

          <button
            className="w-full py-3 bg-green-500 text-white rounded-md"
            onClick={() => alert("Proceeding to checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
