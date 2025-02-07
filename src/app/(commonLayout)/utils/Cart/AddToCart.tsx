// utils/cartUtils.ts

import nexiosInstance from "@/config/nexios.config";

export const addToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  // Send the request to add the item to the cart
  const response = await nexiosInstance.post("/cart", {
    user: userId,
    product: productId,
    quantity,
  });

  return response.data;
};
