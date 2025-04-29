import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

const PRODUCTS = [
  {
    name: "Корм для собак преміум Royal Canin",
    price: 599,
    category: "food",
    description: "Високоякісний сухий корм для дорослих собак середніх порід. Збалансований склад забезпечує здоров'я та енергію вашого улюбленця на весь день.",
    rating: 4.5,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 128,
  },
  {
    name: "Іграшка для котів 'Миша'",
    price: 199,
    category: "toys",
    description: "М'яка іграшка у формі миші з натуральних матеріалів. Ідеальна для активних ігор вашого кота.",
    rating: 4.2,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 85,
  },
  {
    name: "Шампунь для собак",
    price: 249,
    category: "care",
    description: "Делікатний шампунь для собак усіх порід. Дбайливо очищує та доглядає за шерстю.",
    rating: 4.3,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 64,
  },
  {
    name: "Лежак для котів",
    price: 899,
    category: "accessories",
    description: "М'який та комфортний лежак для котів. Ідеальне місце для відпочинку вашого улюбленця.",
    rating: 4.7,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 156,
  },
  {
    name: "Корм для котів сухий",
    price: 499,
    category: "food",
    description: "Збалансований сухий корм для дорослих котів. Містить усі необхідні вітаміни та мінерали.",
    rating: 4.4,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 92,
  },
  {
    name: "М'ячик для собак",
    price: 149,
    category: "toys",
    description: "Міцний гумовий м'ячик для активних ігор. Ідеальний для тренувань та розваг.",
    rating: 4.6,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 73,
  },
  {
    name: "Наповнювач для котів",
    price: 349,
    category: "care",
    description: "Високоякісний комкуючий наповнювач для котячого туалету. Відмінно поглинає запахи.",
    rating: 4.5,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 118,
  },
  {
    name: "Повідець для собак",
    price: 299,
    category: "accessories",
    description: "Міцний нейлоновий повідець для собак. Зручний та надійний у використанні.",
    rating: 4.8,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 167,
  },
  {
    name: "Вітаміни для собак",
    price: 399,
    category: "care",
    description: "Комплекс вітамінів для підтримки здоров'я та імунітету собак.",
    rating: 4.4,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 89,
  }
]

async function main() {
  console.log('Починаємо заповнення бази даних...')
  
  // Очищаем таблицу продуктов перед заполнением
  await prisma.product.deleteMany()
  
  // Загружаем тестовые данные
  for (const product of PRODUCTS) {
    await prisma.product.create({
      data: product,
    })
  }
  
  console.log('База даних успішно заповнена!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 