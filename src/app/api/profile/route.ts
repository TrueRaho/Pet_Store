import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

// Инициализируем Prisma
const prisma = new PrismaClient();

// GET /api/profile?email=user@example.com - получение профиля пользователя
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: "Email не вказано" },
        { status: 400 }
      );
    }
    
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "Користувача не знайдено" },
        { status: 404 }
      );
    }
    
    // Не отправляем пароль клиенту
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Помилка отримання профілю:", error);
    return NextResponse.json(
      { error: "Помилка отримання профілю" },
      { status: 500 }
    );
  } finally {
    // Закрываем соединение с базой данных
    await prisma.$disconnect();
  }
}

// PUT /api/profile - обновление профиля пользователя
export async function PUT(request: NextRequest) {
  try {
    const { id, email, firstName, lastName, phone, address, city, zipCode } = await request.json();
    
    if (!id || !email) {
      return NextResponse.json(
        { error: "Відсутні обов'язкові поля" },
        { status: 400 }
      );
    }
    
    // Проверяем существование пользователя
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { error: "Користувача не знайдено" },
        { status: 404 }
      );
    }
    
    // Обновляем профиль пользователя
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        zipCode,
        updatedAt: new Date(),
      },
    });
    
    // Не отправляем пароль клиенту
    const { password, ...userWithoutPassword } = updatedUser;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Помилка оновлення профілю:", error);
    return NextResponse.json(
      { error: "Помилка оновлення профілю" },
      { status: 500 }
    );
  } finally {
    // Закрываем соединение с базой данных
    await prisma.$disconnect();
  }
} 