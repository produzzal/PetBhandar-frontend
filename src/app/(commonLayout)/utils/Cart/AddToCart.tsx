import nexiosInstance from "@/config/nexios.config";

export const addToCart = async (user: any, product: any, quantity: number) => {
  try {
    // Send request to backend
    const response = await nexiosInstance.post("/cart", {
      user,
      product,
      quantity,
    });

    // Dispatch event to update UI if needed
    window.dispatchEvent(new Event("cartUpdated"));
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
