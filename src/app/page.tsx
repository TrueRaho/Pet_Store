import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Gift, Heart } from "lucide-react"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"

// Імітація даних продуктів
const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Корм для собак преміум Royal Canin",
    price: 599,
    category: "food",
    description: "Високоякісний сухий корм для дорослих собак середніх порід.",
    rating: 4.5,
    image: "/placeholder.svg?height=250&width=250",
    reviews: 128
  },
  {
    id: "2",
    name: "Іграшка для котів 'Миша'",
    price: 199,
    category: "toys",
    description: "М'яка іграшка у формі миші з натуральних матеріалів.",
    rating: 4.2,
    image: "/placeholder.svg?height=250&width=250",
    reviews: 85
  },
  {
    id: "3",
    name: "Шампунь для собак",
    price: 249,
    category: "care",
    description: "Делікатний шампунь для собак усіх порід.",
    rating: 4.3,
    image: "/placeholder.svg?height=250&width=250",
    reviews: 64
  },
  {
    id: "4",
    name: "Лежак для котів",
    price: 899,
    category: "accessories",
    description: "М'який та комфортний лежак для котів.",
    rating: 4.7,
    image: "/placeholder.svg?height=250&width=250",
    reviews: 50
  },
  {
    id: "5",
    name: "Корм для котів сухий",
    price: 499,
    category: "food",
    description: "Збалансований сухий корм для дорослих котів.",
    rating: 4.4,
    image: "/placeholder.svg?height=250&width=250",
    reviews: 36
  },
  {
    id: "6",
    name: "М'ячик для собак",
    price: 149,
    category: "toys",
    description: "Міцний гумовий м'ячик для активних ігор.",
    rating: 4.6,
    image: "/placeholder.svg?height=250&width=250",
    reviews: 24
  }
]

export default function Home() {
  return (
    <div className="page-transition">
      {/* Головні категорії */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/catalog?category=food" className="block">
            <Card className="category-card overflow-hidden border-[#e8e5e0]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#a8d5a2] flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Пошук корму</h3>
                <p className="text-gray-600 mb-4">Знайдіть ідеальний корм для вашого улюбленця</p>
                <Button className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">Перейти до каталогу</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/catalog?category=toys" className="block">
            <Card className="category-card overflow-hidden border-[#e8e5e0]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#a8d5a2] flex items-center justify-center mb-4">
                  <Gift className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Іграшки для веселощів</h3>
                <p className="text-gray-600 mb-4">Великий вибір іграшок для активного дозвілля</p>
                <Button className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">Дивитись іграшки</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/catalog?category=care" className="block">
            <Card className="category-card overflow-hidden border-[#e8e5e0]">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#a8d5a2] flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Догляд за улюбленцем</h3>
                <p className="text-gray-600 mb-4">Все необхідне для здоров'я та гігієни</p>
                <Button className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">Товари для догляду</Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Товари для вашого улюбленця */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Товари для вашого улюбленця</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/catalog?pet=dog" className="block">
            <Card className="category-card overflow-hidden border-[#e8e5e0]">
              <CardContent className="p-0">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-4">Для собак</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Корм для собак"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Іграшки для собак"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Аксесуари для собак"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/catalog?pet=cat" className="block">
            <Card className="category-card overflow-hidden border-[#e8e5e0]">
              <CardContent className="p-0">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-4">Для котів</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Корм для котів"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Іграшки для котів"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Аксесуари для котів"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/catalog?pet=other" className="block">
            <Card className="category-card overflow-hidden border-[#e8e5e0]">
              <CardContent className="p-0">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-4">Для інших тварин</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Товари для гризунів"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Товари для птахів"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt="Товари для риб"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Ми підібрали для вас */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Ми підібрали для вас</h2>
        <div className="flex overflow-x-auto pb-4 gap-6 hide-scrollbar">
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.id} className="min-w-[250px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
