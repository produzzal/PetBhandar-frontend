export type TProduct = {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  productImages: string[];
  description: string;
  category: string;
  stockQuantity: number;
};

export type ApiResponse = {
  data: TProduct[];
};
