import React, { useEffect, useState } from "react";

const DesktopCart = ({
  cartItems,
  handleRemoveItem,
  handleQuantityChange,
  couponCode,
  setCouponCode,
  handleCouponApply,
}: any) => {
  // Calculate the subtotal, shipping, discount, and total based on cart items
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(50); // Default shipping cost, can be changed based on conditions
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let subtotalValue = 0;
    let discountValue = 0;

    cartItems.forEach((item: any) => {
      const price = item.product.price;
      const itemDiscount = item.product.discount || 0;
      const finalPrice =
        itemDiscount > 0
          ? Math.floor(price - (price * itemDiscount) / 100)
          : price;
      const totalItemPrice = finalPrice * item.quantity;

      subtotalValue += totalItemPrice;
      discountValue += (price - finalPrice) * item.quantity; // Calculating discount value
    });

    setSubtotal(subtotalValue);
    setDiscount(discountValue);

    // Calculate total with the shipping cost added
    setTotal(subtotalValue - discountValue + shipping);
  }, [cartItems, shipping]);

  return (
    <div className="hidden lg:flex lg:flex-row gap-6">
      {/* Cart Items */}
      <div className="lg:w-2/3 p-4 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="font-semibold">
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="pl-4 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item: any) => {
              const price = item.product.price;
              const discount = item.product.discount || 0;
              const finalPrice =
                discount > 0 ? price - (price * discount) / 100 : price;
              const finalPriceRounded = Math.floor(finalPrice);
              const total = finalPriceRounded * item.quantity;

              return (
                <tr key={item._id} className="border-b">
                  <td className="py-4 px-4 max-w-[400px] flex items-center">
                    <img
                      src={item.product.productImages[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover"
                    />
                    <p>{item.product.name}</p>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {discount > 0 ? (
                      <div>
                        <p className="font-semibold text-lg">
                          <span className="font-extrabold">৳</span>
                          {finalPriceRounded}
                        </p>
                        <p className="font-semibold line-through text-gray-500">
                          <span className="font-extrabold">৳</span>
                          {price}
                        </p>
                      </div>
                    ) : (
                      <p className="font-semibold">
                        <span className="font-extrabold">৳</span>
                        {price}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleQuantityChange(item._id, "decrease")}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="font-semibold mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, "increase")}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="font-extrabold">৳</span>
                    {total}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 text-2xl"
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
              <span className="font-extrabold">৳</span>
              {subtotal}
            </span>
          </div>
          <div className="flex my-2 justify-between">
            <span>Shipping Cost</span>
            <span className="font-semibold">
              <span className="font-extrabold">৳</span>
              {shipping}
            </span>
          </div>
          <div className="flex justify-between text-red-500">
            <span>Product Discount</span>
            <span className="font-semibold">
              <span className="font-extrabold">৳</span>
              {discount}
            </span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total Amount</span>
            <span>
              <span className="font-extrabold">৳</span>
              {total}
            </span>
          </div>
        </div>

        {/* Coupon Code */}
        <div className="mb-4">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full p-2 border border-gray-300 focus:ring-pink-50 rounded-md"
            placeholder="Enter your coupon code"
          />
          <button
            onClick={handleCouponApply}
            className={`mt-2 w-full py-2 rounded-md ${
              couponCode
                ? "bg-pink-500 text-white"
                : "bg-gray-300 text-gray-500"
            }`}
            disabled={!couponCode}
          >
            Apply
          </button>
        </div>

        <button
          className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md"
          onClick={() => alert("Proceeding to checkout")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default DesktopCart;
