import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Unauthorized - silakan login terlebih dahulu" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/penugasan/update/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    const data = await res.json().catch(() => ({}));

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Update penugasan error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}