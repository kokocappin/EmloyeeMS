import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing user id" },
        { status: 400 }
      );
    }

    let body: any = {};

    try {
      body = await req.json();
    } catch {
      body = {};
    }

    // =========================
    // TOGGLE ACTIVE USER
    // =========================
    if (body.toggleActive) {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      const updated = await prisma.user.update({
        where: { id },
        data: {
          isActive: !user.isActive,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
        },
      });

      return NextResponse.json(updated);
    }

    // =========================
    // UPDATE USER DATA
    // =========================
    const data: any = {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      address: body.address || null,
      department: body.department || null,
      position: body.position || null,
      sex: body.sex || null,
      notes: body.notes || null,
    };

    // birthdate
    if (body.birthdate) {
      data.birthdate = body.birthdate;
    }

    // salary
    if (body.salary) {
      data.salary = body.salary;
    }

    // =========================
    // PASSWORD UPDATE
    // =========================
    if (body.password && body.password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(
        body.password,
        10
      );

      data.password = hashedPassword;
    }

    const updated = await prisma.user.update({
      where: { id },
      data,

      // NEVER RETURN PASSWORD
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
        notes: true,
        isActive: true,
      },
    });

    return NextResponse.json(updated);

  } catch (error: any) {
    console.error("PATCH ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}