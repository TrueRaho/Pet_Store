import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

// Инициализируем Prisma
const prisma = new PrismaClient();

// POST /api/auth - вход в систему
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Ищем пользователя по email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    // Если пользователь не найден или пароль неверный
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Невірний email або пароль" },
        { status: 401 }
      );
    }
    
    // Никогда не передаем пароль клиенту
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Помилка авторизації:", error);
    return NextResponse.json(
      { error: "Помилка авторизації" },
      { status: 500 }
    );
  } finally {
    // Закрываем соединение с базой данных
    await prisma.$disconnect();
  }
} 