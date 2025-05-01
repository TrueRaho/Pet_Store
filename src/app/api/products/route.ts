import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    
    // Если есть параметр поиска, фильтруем продукты
    if (query) {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
          ]
        },
      });
      return NextResponse.json({ products });
    }
    
    // Иначе возвращаем все продукты
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