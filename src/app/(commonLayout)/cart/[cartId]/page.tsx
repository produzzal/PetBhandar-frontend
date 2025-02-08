/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import nexiosInstance from "@/config/nexios.config";
import React, { useEffect, useState } from "react";

const CartPage = ({ params }: { params: any }) => {
  const { cartId }: { cartId: any } = React.use(params);
  const user = cartId;
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [quantity, setQuantity] = useState<number>();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await nexiosInstance.get(`/cart/${user}`);

        setCartItems(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCouponApply = () => {
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

  const handleQuantityChange = (operation: "increase" | "decrease") => {
    setQuantity((prev) =>
      operation === "increase" && prev < cartItems.quantity
        ? prev + 1
        : operation === "decrease" && prev > 1
        ? prev - 1
        : prev
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 mt-20">
      <h2 className="text-xl md:text-3xl md:ml-5 font-bold mb-8 text-gray-800">
        My Shopping Cart
      </h2>
      {/* mobile screen  */}
      <div className="lg:hidden">
        {/* Cart Items */}
        <div className="space-y-6">
          {cartItems.map((item) => {
            const price = item.product.price;
            const discount = item.product.discount || 0;
            const discountPrice = item.product.discountPrice || 0;
            const finalPrice =
              discount > 0 ? price - (price * discount) / 100 : price;
            const finalPriceRounded = Math.floor(finalPrice); // Round the final price
            const total = finalPriceRounded * item.quantity; // Calculate total based on quantity

            return (
              <div key={item._id} className="flex flex-col py-4 border-b">
                {/* Image and Name */}
                <div className="flex justify-between items-start">
                  <div className="w-1/4">
                    <img
                      src={item.product.productImages[0]}
                      alt={item.product.name}
                      className="w-full h-16 object-cover"
                    />
                  </div>
                  <div className="w-2.5/4 ml-4 flex flex-col justify-between">
                    <p className="font-semibold">{item.product?.name}</p>
                  </div>
                  <div className="w-0.5/4 ml-1 text-right">
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Price and Quantity */}
                <div className="flex justify-between mt-2">
                  <div className="w-1/4 text-center">
                    {discountPrice > 0 ? (
                      <div className="flex items-center justify-around mt-1 px-2">
                        <p className="font-semibold text-lg mb-1 ">
                          <span className="font-extrabold">৳</span>
                          {discountPrice}
                        </p>
                        <p className="font-semibold line-through text-gray-500">
                          <span className="font-extrabold">৳</span>
                          {price}
                        </p>
                      </div>
                    ) : discount > 0 ? (
                      <div className="flex items-center justify-around mt-1 px-2">
                        <p className="font-semibold text-lg mb-1 ">
                          <span className="font-extrabold">৳</span>
                          {finalPriceRounded}
                        </p>
                        <p className="font-semibold line-through text-gray-500">
                          <span className="font-extrabold">৳</span>
                          {price}
                        </p>
                      </div>
                    ) : (
                      <p className="font-semibold mt-1">
                        <span className="font-extrabold">৳</span>
                        {price}
                      </p>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="w-2/4 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold w-1/4 text-right mt-1">
                    <span className="font-extrabold">৳</span>
                    {total}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 p-4 rounded-lg mt-10">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="mb-4">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span className="font-semibold">
                ৳
                {Math.floor(
                  cartItems.reduce((acc, item) => {
                    const discount = item.product.discount || 0;
                    const price = item.product.price;
                    const finalPrice =
                      discount > 0 ? price - (price * discount) / 100 : price;
                    const totalItemPrice = finalPrice * item.quantity;
                    return acc + totalItemPrice;
                  }, 0)
                )}
              </span>
            </div>
            <div className="flex my-2 justify-between">
              <span>Shipping Cost</span>
              <span className="font-semibold">৳{shipping}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Product Discount</span>
              <span className="font-semibold">
                ৳
                {Math.floor(
                  cartItems.reduce((acc, item) => {
                    const discount = item.product.discount || 0;
                    const price = item.product.price;
                    const discountAmount =
                      ((price * discount) / 100) * item.quantity;
                    return acc + discountAmount;
                  }, 0)
                )}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total Amount</span>
              <span>
                ৳
                {Math.floor(
                  cartItems.reduce((acc, item) => {
                    const discount = item.product.discount || 0;
                    const price = item.product.price;
                    const finalPrice =
                      discount > 0 ? price - (price * discount) / 100 : price;
                    const totalItemPrice = finalPrice * item.quantity;
                    return acc + totalItemPrice;
                  }, 0) +
                    shipping -
                    cartItems.reduce((acc, item) => {
                      const discount = item.product.discount || 0;
                      const price = item.product.price;
                      const discountAmount =
                        ((price * discount) / 100) * item.quantity;
                      return acc + discountAmount;
                    }, 0)
                )}
              </span>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="mb-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your coupon code"
            />
            <button
              onClick={handleCouponApply}
              className={`mt-2 w-full py-2 rounded-md ${
                couponCode
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              disabled={!couponCode}
            >
              Apply
            </button>
          </div>

          <button
            className="w-full py-3 bg-green-500 text-white rounded-md"
            onClick={() => alert("Proceeding to checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="lg:w-2/3 p-4 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="text-left font-semibold">
                <th className="pb-2">Product</th>
                <th className="pb-2">Price</th>
                <th className="pb-2">Quantity</th>
                <th className="pb-2">Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const price = item.product.price;
                const discount = item.product.discount || 0;
                const finalPrice =
                  discount > 0 ? price - (price * discount) / 100 : price;
                const finalPriceRounded = Math.floor(finalPrice); // Round the final price
                const total = finalPriceRounded * item.quantity; // Calculate total based on quantity

                return (
                  <tr key={item.id} className="border-t">
                    <td className="flex items-center w-4/6">
                      <img
                        src={item.product.productImages[0]}
                        alt={item.product.name}
                        className="w-16 h-16"
                      />
                      <p className="">{item.product.name}</p>
                    </td>

                    {/* Right side: Price, Quantity, Total, and Remove - 50% width */}
                    <td className="py-3">
                      <div>
                        {/* Displaying the final price after applying the discount */}
                        <p className="font-semibold">
                          <span className="font-extrabold">৳</span>
                          {finalPriceRounded}
                        </p>
                        {/* If there is a discount, show the original price as line-through */}
                        {discount > 0 && (
                          <p className="text-gray-500 line-through">
                            <span className="font-extrabold">৳</span>
                            {price}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="space-x-2">
                      <button
                        className="bg-gray-300 px-2 py-1 rounded"
                        onClick={() => handleQuantityChange("decrease")}
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded"
                        onClick={() => handleQuantityChange("increase")}
                      >
                        +
                      </button>
                    </td>

                    <td className="py-3 font-semibold">
                      <span className="font-extrabold">৳</span>
                      {total} {/* Total after applying discount */}
                    </td>

                    <td className="py-3 space-x-2">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="mb-4">
            <div className="flex justify-between">
              <span>Sub Total</span>
              <span className="font-semibold">
                ৳
                {Math.floor(
                  cartItems.reduce((acc, item) => {
                    const discount = item.product.discount || 0;
                    const price = item.product.price;
                    const finalPrice =
                      discount > 0 ? price - (price * discount) / 100 : price;
                    const totalItemPrice = finalPrice * item.quantity;
                    return acc + totalItemPrice;
                  }, 0)
                )}
              </span>
            </div>
            <div className="flex my-2 justify-between">
              <span>Shipping Cost</span>
              <span className="font-semibold">৳{shipping}</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Product Discount</span>
              <span className="font-semibold">
                ৳
                {Math.floor(
                  cartItems.reduce((acc, item) => {
                    const discount = item.product.discount || 0;
                    const price = item.product.price;
                    const discountAmount =
                      ((price * discount) / 100) * item.quantity;
                    return acc + discountAmount;
                  }, 0)
                )}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total Amount</span>
              <span>
                ৳
                {Math.floor(
                  cartItems.reduce((acc, item) => {
                    const discount = item.product.discount || 0;
                    const price = item.product.price;
                    const finalPrice =
                      discount > 0 ? price - (price * discount) / 100 : price;
                    const totalItemPrice = finalPrice * item.quantity;
                    return acc + totalItemPrice;
                  }, 0) +
                    shipping -
                    cartItems.reduce((acc, item) => {
                      const discount = item.product.discount || 0;
                      const price = item.product.price;
                      const discountAmount =
                        ((price * discount) / 100) * item.quantity;
                      return acc + discountAmount;
                    }, 0)
                )}
              </span>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="mb-4">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your coupon code"
            />
            <button
              onClick={handleCouponApply}
              className={`mt-2 w-full py-2 rounded-md ${
                couponCode
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
              disabled={!couponCode}
            >
              Apply
            </button>
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
