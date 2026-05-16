import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const { email, password } = body as {
    email?: string;
    password?: string;
  };

  if (email === "admin@gmail.com" && password === "asdf12A") {
    return NextResponse.json(
      {
        success: true,
        message: "Login success",
        data: {
          token: "MOCK_TOKEN_123456",
        },
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "ایمیل یا رمز عبور اشتباه است",
    },
    { status: 401 },
  );
}
