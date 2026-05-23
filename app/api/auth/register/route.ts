import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    name,
    email,
    password,
    phone,
    address,
    department,
    position,
    sex,
    birthdate,
  } = await req.json();

  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return NextResponse.json(
      { error: "User exists" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,

      phone,
      address,
      department,
      position,

      sex,
      birthdate,

      role: "EMPLOYEE",
    },
  });

  return NextResponse.json(user);
}