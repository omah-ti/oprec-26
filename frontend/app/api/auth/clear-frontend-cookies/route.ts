import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Frontend cookies cleared" });

  res.cookies.set({
    name: "accessToken",
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 0, 
  });

  res.cookies.set({
    name: "refreshToken",
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 0,
  });

  return res;
}
