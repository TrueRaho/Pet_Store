import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

// Инициализируем Prisma
const prisma = new PrismaClient();

// POST /api/register - регистрация нового пользователя
export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password, phone, address, city, zipCode } = await request.json();
    
    // Проверяем обязательные поля
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Необхідно заповнити обов'язкові поля" },
        { status: 400 }
      );
    }
    
    // Проверяем, существует ли уже пользователь с таким email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "Користувач з таким email вже існує" },
        { status: 409 }
      );
    }
    
    // Создаем нового пользователя
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password, // В реальном проекте здесь должно быть хеширование пароля
        phone: phone || null,
        address: address || null,
        city: city || null,
        zipCode: zipCode || null,
      },
    });
    
    // Не отправляем пароль клиенту
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    return NextResponse.json(
      { error: "Помилка реєстрації" },
      { status: 500 }
    );
  } finally {
    // Закрываем соединение с базой данных
    await prisma.$disconnect();
  }
} 