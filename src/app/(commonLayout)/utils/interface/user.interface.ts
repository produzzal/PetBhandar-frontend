export type TUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export type ApiResponse = {
  data: TUser[];
  message: string;
};
