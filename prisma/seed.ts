import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

const PRODUCTS = [
  {
    name: "Корм для собак преміум Royal Canin",
    price: 599,
    category: "food",
    pet: "dog",
    brand: "Royal Canin",
    description: "Високоякісний сухий корм для дорослих собак середніх порід. Збалансований склад забезпечує здоров'я та енергію вашого улюбленця на весь день.",
    rating: 4.5,
    image: "/RoyalCanin.png",
    reviews: 128,
  },
  {
    name: "Іграшка для котів 'Миша'",
    price: 199,
    category: "toys",
    pet: "cat",
    brand: "PetPlay",
    description: "М'яка іграшка у формі миші з натуральних матеріалів. Ідеальна для активних ігор вашого кота.",
    rating: 4.2,
    image: "/CatToy.png",
    reviews: 85,
  },
  {
    name: "Шампунь для собак",
    price: 249,
    category: "care",
    pet: "dog",
    brand: "PetCare",
    description: "Делікатний шампунь для собак усіх порід. Дбайливо очищує та доглядає за шерстю.",
    rating: 4.3,
    image: "/DogShampoo.png",
    reviews: 64,
  },
  {
    name: "Лежак для котів",
    price: 899,
    category: "accessories",
    pet: "cat",
    brand: "PetCare",
    description: "М'який та комфортний лежак для котів. Ідеальне місце для відпочинку вашого улюбленця.",
    rating: 4.7,
    image: "/CatBed.png",
    reviews: 156,
  },
  {
    name: "Корм для котів сухий",
    price: 499,
    category: "food",
    pet: "cat",
    brand: "Whiskas",
    description: "Збалансований сухий корм для дорослих котів. Містить усі необхідні вітаміни та мінерали.",
    rating: 4.4,
    image: "/Whiskas.png",
    reviews: 92,
  },
  {
    name: "М'ячик для собак",
    price: 149,
    category: "toys",
    pet: "dog",
    brand: "PetPlay",
    description: "Міцний гумовий м'ячик для активних ігор. Ідеальний для тренувань та розваг.",
    rating: 4.6,
    image: "/DogToy.png",
    reviews: 73,
  },
  {
    name: "Наповнювач для котів",
    price: 349,
    category: "care",
    pet: "cat",
    brand: "Whiskas",
    description: "Високоякісний комкуючий наповнювач для котячого туалету. Відмінно поглинає запахи.",
    rating: 4.5,
    image: "/CatLitter.png",
    reviews: 118,
  },
  {
    name: "Повідець для собак",
    price: 299,
    category: "accessories",
    pet: "dog",
    brand: "Royal Canin",
    description: "Міцний нейлоновий повідець для собак. Зручний та надійний у використанні.",
    rating: 4.8,
    image: "/DogLeash.png",
    reviews: 167,
  },
  {
    name: "Вітаміни для собак",
    price: 399,
    category: "care",
    pet: "dog",
    brand: "PetCare",
    description: "Комплекс вітамінів для підтримки здоров'я та імунітету собак.",
    rating: 4.4,
    image: "/DogVitamins.png",
    reviews: 89,
  }
]

async function main() {
  console.log(`Начало очистки базы данных...`);

  // Удаляем данные в правильном порядке
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});

  console.log(`База данных очищена`);
  console.log(`Начало заполнения базы данных...`);

  // Создаем товары
  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: product.name },
      update: {},
      create: product,
    }).catch(e => {
      console.error(`Ошибка при создании товара ${product.name}:`, e);
    });
  }

  console.log(`База данных заполнена.`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 