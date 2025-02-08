// "use client";

// import React, { useState, useEffect } from "react";
// import MobileCart from "../../utils/Cart/MobileCart";
// import DesktopCart from "../../utils/Cart/DesktopCart";
// import { toast, ToastContainer } from "react-toastify";
// import nexiosInstance from "@/config/nexios.config";

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true); // For loading state
//   const [error, setError] = useState<string | null>(null); // For error handling

//   // Fetch cart data from backend using userId
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const user = localStorage.getItem("user");
//         const userId = user ? JSON.parse(user)._id : null;

//         if (!userId) {
//           toast.error("Please login to add product to cart");

//           // Redirect to login page after 2 seconds
//           setTimeout(() => {
//             window.location.href = "/login";
//           }, 2000);

//           return;
//         }

//         const response = await nexiosInstance.get(`/cart/${userId}`);
//         console.log(response.data.data);
//         setCartItems(response.data.data);
//       } catch (error) {
//         setError("Error fetching cart data.");
//         console.error("Error fetching cart:", error);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchCart();
//   }, []); // Only runs once when the component mounts

//   // Handle removing an item from the cart
//   const handleRemoveItem = async (id: string) => {
//     try {
//       // Make a request to remove the item from the backend
//       await axios.delete(`/api/cart/${id}`);

//       // Remove the item from the cart state
//       setCartItems(cartItems.filter((item) => item.id !== id));
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // Handle changing the quantity of an item
//   const handleQuantityChange = async (
//     itemId: string,
//     operation: "increase" | "decrease"
//   ) => {
//     const updatedCart = cartItems.map((item) => {
//       if (item.id === itemId) {
//         let newQuantity = item.quantity;

//         // Adjust quantity based on the operation
//         if (
//           operation === "increase" &&
//           item.quantity < item.product.availableQuantity
//         ) {
//           newQuantity += 1;
//         } else if (operation === "decrease" && item.quantity > 1) {
//           newQuantity -= 1;
//         }

//         return { ...item, quantity: newQuantity };
//       }
//       return item;
//     });

//     setCartItems(updatedCart);

//     // Update the backend with the new quantity
//     try {
//       await axios.put(`/api/cart/${itemId}`, {
//         quantity: updatedCart.find((item) => item.id === itemId)?.quantity,
//       });
//     } catch (error) {
//       console.error("Error updating quantity:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-6 mt-20">
//       <h2 className="text-xl md:text-3xl md:ml-5 font-bold mb-8 text-gray-800">
//         My Shopping Cart
//       </h2>
//       {/* Mobile View */}
//       <div className="lg:hidden">
//         <MobileCart
//           cartItems={cartItems}
//           handleRemoveItem={handleRemoveItem}
//           handleQuantityChange={handleQuantityChange}
//         />
//       </div>
//       {/* Desktop View */}
//       <div className="hidden lg:block">
//         <DesktopCart
//           cartItems={cartItems}
//           handleRemoveItem={handleRemoveItem}
//           handleQuantityChange={handleQuantityChange}
//         />
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default CartPage;
