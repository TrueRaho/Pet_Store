import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Gift, Heart } from "lucide-react"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"
import { getRecommendedProducts, getProductsByCategoryAndPet, getProductsByPet } from "@/services/productService"

export const dynamic = 'force-dynamic';

// Компонент главной страницы
export default async function Home() {
  // Получение рекомендованных продуктов из API
  const featuredProducts = await getRecommendedProducts(6);
  
  // Получение товаров для категорий по типу животного
  const dogFood = await getProductsByCategoryAndPet("food", "dog", 1);
  const dogToys = await getProductsByCategoryAndPet("toys", "dog", 1);
  const dogAccessories = await getProductsByCategoryAndPet("accessories", "dog", 1);
  
  const catFood = await getProductsByCategoryAndPet("food", "cat", 1);
  const catToys = await getProductsByCategoryAndPet("toys", "cat", 1);
  const catAccessories = await getProductsByCategoryAndPet("accessories", "cat", 1);
  
  const otherPetProducts = await getProductsByPet("other", 3);
  
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
                        src={dogFood.length > 0 ? dogFood[0].image : "/placeholder.svg?height=100&width=100"}
                        alt="Корм для собак"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src={dogToys.length > 0 ? dogToys[0].image : "/placeholder.svg?height=100&width=100"}
                        alt="Іграшки для собак"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src={dogAccessories.length > 0 ? dogAccessories[0].image : "/placeholder.svg?height=100&width=100"}
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
                        src={catFood.length > 0 ? catFood[0].image : "/placeholder.svg?height=100&width=100"}
                        alt="Корм для котів"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src={catToys.length > 0 ? catToys[0].image : "/placeholder.svg?height=100&width=100"}
                        alt="Іграшки для котів"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="aspect-square relative rounded overflow-hidden">
                      <Image
                        src={catAccessories.length > 0 ? catAccessories[0].image : "/placeholder.svg?height=100&width=100"}
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
                    {otherPetProducts.length > 0 ? (
                      otherPetProducts.map((product: Product, index: number) => (
                        <div key={product.id} className="aspect-square relative rounded overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <>
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
                      </>
                    )}
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
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[250px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
