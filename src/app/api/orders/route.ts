import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// POST /api/orders - создание нового заказа
export async function POST(request: NextRequest) {
  try {
    const { userId, items, total, address, city, phone, notes } = await request.json();
    
    // Проверяем обязательные поля
    if (!userId || !items || !total) {
      return NextResponse.json(
        { error: "Обов'язкові поля відсутні" },
        { status: 400 }
      );
    }
    
    // Создаем заказ с вложенными позициями
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        address,
        city,
        phone,
        notes,
        items: {
          create: items.map((item: any) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          }))
        }
      },
      include: {
        items: true
      }
    });
    
    return NextResponse.json(order);
  } catch (error) {
    console.error("Помилка створення замовлення:", error);
    return NextResponse.json(
      { error: "Помилка створення замовлення" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET /api/orders?userId=123 - получение списка заказов пользователя
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: "ID користувача не вказано" },
        { status: 400 }
      );
    }
    
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Помилка отримання замовлень:", error);
    return NextResponse.json(
      { error: "Помилка отримання замовлень" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 