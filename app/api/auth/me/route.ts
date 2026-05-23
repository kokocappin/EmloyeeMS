import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { id: string };

    const user = await prisma.user.findUnique({
  where: { id: decoded.id },
  select: {
    id: true,
    name: true,
    email: true,
    role: true,

    phone: true,
    address: true,
    department: true,
    position: true,

    birthdate: true,
    salary: true,
    sex: true,

    isActive: true,
  },
});

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });

  } catch (err) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }
}