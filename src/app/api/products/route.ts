import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Помилка при отриманні продуктів:", error);
    return NextResponse.json(
      { error: "Не вдалося отримати продукти" },
      { status: 500 }
    );
  }
} 