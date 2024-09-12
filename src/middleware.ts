import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/userDashboard",
  "/profile",
  "/users",
  "/products",
  "/categories",
];

export default function middleware(req: any) {
  //get token
  const token = "dff";
  //const token = localStorage.getItem("token")\;
  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    const aboutUrl = new URL("/auth/loginPage", req.nextUrl.origin);
    return NextResponse.redirect(aboutUrl.toString());
  }
}
