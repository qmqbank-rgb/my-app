import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prismaClient";

interface RegisterRequestBody {
  email: string;
  password: string;
  name?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RegisterRequestBody = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err: unknown) {
    console.error("Register API error:", err);

    // Handle unique constraint error (email already exists)
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as any).code === "P2002" &&
      "meta" in err &&
      (err as any).meta?.target?.includes("email")
    ) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 400 }
      );
    }

    const message =
      err instanceof Error
        ? err.message
        : "Failed to create user. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
