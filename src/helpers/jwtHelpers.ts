import { jwtVerify as joseVerify } from "jose";

export const jwtVerify = async (token: string) => {
  try {
    // Verify and decode the JWT token using jose
    const { payload } = await joseVerify(
      token,
      new TextEncoder().encode(process.env.JWT_ACCESS_SECRET)
    );
    return payload;
  } catch (error) {
    console.log("JWT verification failed:", error);
    return null;
  }
};
