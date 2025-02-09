import React, { useEffect, useState } from "react";

const MobileCart = ({
  cartItems,
  handleRemoveItem,
  handleQuantityChange,
  couponCode,
  setCouponCode,
  handleCouponApply,
}: any) => {
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
    <div className="space-y-6">
      <div>
        {cartItems?.map((item: any) => {
          const price = item.product.price;
          const discount = item.product.discount || 0;
          const finalPrice =
            discount > 0 ? price - (price * discount) / 100 : price;
          const finalPriceRounded = Math.floor(finalPrice);
          const total = finalPriceRounded * item.quantity;
          return (
            <div key={item._id} className="flex flex-col py-4 border-b">
              <div className="flex justify-between items-start">
                <div className="w-1/4">
                  <img
                    src={item.product.productImages[0]}
                    alt={item.product.name}
                    className="w-full h-16 object-cover"
                  />
                </div>
                <div className="w-2.5/4 ml-4 flex flex-col justify-between">
                  <p className="font-semibold">{item.product.name}</p>
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

              <div className="flex justify-between mt-2">
                <div className="w-1/4 text-center">
                  {discount > 0 ? (
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
                  ) : discount > 0 ? (
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-semibold text-lg mb-1 ">
                        <span className="font-extrabold">৳</span>
                        {price}
                      </p>
                      <p className="font-semibold line-through text-gray-500">
                        <span className="font-extrabold">৳</span>
                        {total}
                      </p>
                    </div>
                  ) : (
                    <p className="font-semibold mt-1">
                      <span className="font-extrabold">৳</span>
                      {price}
                    </p>
                  )}
                </div>

                <div className="w-2/4 flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, "decrease")}
                    className="bg-gray-300 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, "increase")}
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
            className="w-full p-2 border border-gray-300  rounded-md"
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

export default MobileCart;
