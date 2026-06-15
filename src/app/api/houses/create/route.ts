import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const token =
      (await cookies()).get("accessToken")?.value;

    console.log("TOKEN =>", token);
    console.log("BODY =>", body);


    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await fetch(
      "http://188.121.111.8:3003/api/houses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(body),
      }

    );

    const data = await res.json();

    console.log("STATUS =>", res.status);
    console.log("DATA =>", data);

    return NextResponse.json(
      data,
      { status: res.status }
    );

  } catch (error) {

    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );

  }
}