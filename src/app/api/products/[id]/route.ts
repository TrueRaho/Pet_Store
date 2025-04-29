import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Продукт не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(`Помилка при отриманні продукту з ID ${await params.then(p => p.id)}:`, error);
    return NextResponse.json(
      { error: "Не вдалося отримати продукт" },
      { status: 500 }
    );
  }
} 