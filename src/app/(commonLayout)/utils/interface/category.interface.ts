export type TCategory = {
  _id: string;
  name: string;
  image: string;
  description: string;
};

export type ApiResponse = {
  data: TCategory[];
  message: string;
};
