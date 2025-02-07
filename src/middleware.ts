import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "./helpers/jwtHelpers";

const authRoutes = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(request);

  // Retrieve the cookies from the request
  const accessToken = request.cookies.get("accessToken")?.value; // Make sure this is the right cookie name
  console.log("token", accessToken);

  // If no accessToken is found, handle redirect for non-auth routes
  if (!accessToken) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next(); // Allow access to auth routes like login/signup
    } else {
      // Redirect to login with the current path as a query parameter
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  // Decode the JWT token if it exists
  let decodedToken = null;
  try {
    decodedToken = await jwtVerify(accessToken); // Using the async jwtVerify function from jose
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Assuming the token has a 'role' field to manage access control
  const role = decodedToken?.role;
  console.log("User role:", role);

  // Role-based Access Control for admins
  if (role === "admin" && pathname === "/admin/user-management") {
    return NextResponse.next();
  }
  // Role-based Access Control for admins
  if (role === "admin" && pathname === "/admin/product-management") {
    return NextResponse.next();
  }
  if (role === "admin" && pathname === "/admin/category-management") {
    return NextResponse.next();
  }
  if (role === "admin" && pathname === "/admin/order-management") {
    return NextResponse.next();
  }
  if (role === "user" && pathname === "/cart") {
    return NextResponse.next();
  }

  // Default redirect if the user doesn't have the correct role
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/admin",
    "/admin/user-management",
    "/admin/product-management",
    "/category-management",
    "/order-management",
  ],
};
