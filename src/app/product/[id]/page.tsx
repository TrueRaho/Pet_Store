/// <reference types="next" />
import { Metadata } from 'next'
import { Product } from '@/types/product'
import ProductClient from './product-client'

// Імітація даних продуктів
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Корм для собак преміум Royal Canin",
    price: 599,
    category: "food",
    description: "Високоякісний сухий корм для дорослих собак середніх порід. Збалансований склад забезпечує здоров'я та енергію вашого улюбленця на весь день.",
    rating: 4.5,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 128,
    inStock: true
  },
  {
    id: "2",
    name: "Іграшка для котів 'Миша'",
    price: 199,
    category: "toys",
    description: "М'яка іграшка у формі миші з натуральних матеріалів. Ідеальна для активних ігор вашого кота.",
    rating: 4.2,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 85,
    inStock: true
  },
  {
    id: "3",
    name: "Шампунь для собак",
    price: 249,
    category: "care",
    description: "Делікатний шампунь для собак усіх порід. Дбайливо очищує та доглядає за шерстю.",
    rating: 4.3,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 64,
    inStock: true
  },
  {
    id: "4",
    name: "Лежак для котів",
    price: 899,
    category: "accessories",
    description: "М'який та комфортний лежак для котів. Ідеальне місце для відпочинку вашого улюбленця.",
    rating: 4.7,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 156,
    inStock: true
  },
  {
    id: "5",
    name: "Корм для котів сухий",
    price: 499,
    category: "food",
    description: "Збалансований сухий корм для дорослих котів. Містить усі необхідні вітаміни та мінерали.",
    rating: 4.4,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 92,
    inStock: true
  },
  {
    id: "6",
    name: "М'ячик для собак",
    price: 149,
    category: "toys",
    description: "Міцний гумовий м'ячик для активних ігор. Ідеальний для тренувань та розваг.",
    rating: 4.6,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 73,
    inStock: true
  },
  {
    id: "7",
    name: "Наповнювач для котів",
    price: 349,
    category: "care",
    description: "Високоякісний комкуючий наповнювач для котячого туалету. Відмінно поглинає запахи.",
    rating: 4.5,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 118,
    inStock: true
  },
  {
    id: "8",
    name: "Повідець для собак",
    price: 299,
    category: "accessories",
    description: "Міцний нейлоновий повідець для собак. Зручний та надійний у використанні.",
    rating: 4.8,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 167,
    inStock: true
  },
  {
    id: "9",
    name: "Вітаміни для собак",
    price: 399,
    category: "care",
    description: "Комплекс вітамінів для підтримки здоров'я та імунітету собак.",
    rating: 4.4,
    image: "/placeholder.svg?height=500&width=500",
    reviews: 89,
    inStock: true
  }
]

// Функція для отримання продукту за ID
const getProductById = (id: string): Product => {
  return PRODUCTS.find((product) => product.id === id) || PRODUCTS[0]
}

// Функція для отримання рекомендованих продуктів
const getRecommendedProducts = (ids: string[]): Product[] => {
  return ids.map((id) => getProductById(id))
}

type SearchParams = { [key: string]: string | string[] | undefined }

type Props = {
  params: Promise<{ id: string }>
  searchParams?: Promise<SearchParams>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const product = getProductById(resolvedParams.id)
  
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params
  const product = getProductById(resolvedParams.id)
  const recommendedProducts = getRecommendedProducts(['1', '2', '3', '4'])

  return <ProductClient product={product} recommendedProducts={recommendedProducts} />
}
