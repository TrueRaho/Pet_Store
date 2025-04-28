"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: number
  name: string
  price: number
  category: string
  pet: string
  brand: string
  image: string
}

interface Filters {
  category: string[]
  pet: string[]
  brand: string[]
  price: [number, number]
}

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
}

// Імітація даних продуктів
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Корм для собак преміум",
    price: 599,
    category: "food",
    pet: "dog",
    brand: "Royal Canin",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Іграшка для котів 'Миша'",
    price: 199,
    category: "toys",
    pet: "cat",
    brand: "PetPlay",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Шампунь для собак",
    price: 249,
    category: "care",
    pet: "dog",
    brand: "PetCare",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Лежак для котів",
    price: 899,
    category: "accessories",
    pet: "cat",
    brand: "ComfyPet",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Корм для котів сухий",
    price: 499,
    category: "food",
    pet: "cat",
    brand: "Whiskas",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "М'ячик для собак",
    price: 149,
    category: "toys",
    pet: "dog",
    brand: "PetPlay",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Наповнювач для котів",
    price: 349,
    category: "care",
    pet: "cat",
    brand: "CleanCat",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Повідець для собак",
    price: 299,
    category: "accessories",
    pet: "dog",
    brand: "WalkDog",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 9,
    name: "Вітаміни для собак",
    price: 399,
    category: "care",
    pet: "dog",
    brand: "PetCare",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category")
  const initialPet = searchParams.get("pet")

  const [filters, setFilters] = useState<Filters>({
    category: initialCategory ? [initialCategory] : [],
    pet: initialPet ? [initialPet] : [],
    brand: [],
    price: [0, 1000],
  })

  const [sortBy, setSortBy] = useState<string>("default")

  const handleFilterChange = (type: keyof Filters, value: string | [number, number]) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      if (type === "price") {
        newFilters.price = value as [number, number]
      } else {
        const stringValue = value as string
        if (newFilters[type].includes(stringValue)) {
          newFilters[type] = newFilters[type].filter((item) => item !== stringValue)
        } else {
          newFilters[type] = [...newFilters[type], stringValue]
        }
      }

      return newFilters
    })
  }

  const filteredProducts = PRODUCTS.filter((product) => {
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false
    }
    if (filters.pet.length > 0 && !filters.pet.includes(product.pet)) {
      return false
    }
    if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
      return false
    }
    if (product.price < filters.price[0] || product.price > filters.price[1]) {
      return false
    }
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  return (
    <div className="page-transition container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Каталог товарів</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Фільтри */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white p-4 rounded-lg border border-[#e8e5e0] sticky top-24">
            <h2 className="font-semibold text-lg mb-4">Фільтри</h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Тип тварини</h3>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.pet.includes("dog")}
                    onCheckedChange={() => handleFilterChange("pet", "dog")}
                  />
                  Собаки
                </Label>
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.pet.includes("cat")}
                    onCheckedChange={() => handleFilterChange("pet", "cat")}
                  />
                  Коти
                </Label>
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.pet.includes("other")}
                    onCheckedChange={() => handleFilterChange("pet", "other")}
                  />
                  Інші тварини
                </Label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Категорія</h3>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.category.includes("food")}
                    onCheckedChange={() => handleFilterChange("category", "food")}
                  />
                  Корм
                </Label>
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.category.includes("toys")}
                    onCheckedChange={() => handleFilterChange("category", "toys")}
                  />
                  Іграшки
                </Label>
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.category.includes("care")}
                    onCheckedChange={() => handleFilterChange("category", "care")}
                  />
                  Догляд
                </Label>
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.category.includes("accessories")}
                    onCheckedChange={() => handleFilterChange("category", "accessories")}
                  />
                  Аксесуари
                </Label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Бренд</h3>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.brand.includes("Royal Canin")}
                    onCheckedChange={() => handleFilterChange("brand", "Royal Canin")}
                  />
                  Royal Canin
                </Label>
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.brand.includes("Whiskas")}
                    onCheckedChange={() => handleFilterChange("brand", "Whiskas")}
                  />
                  Whiskas
                </Label>
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.brand.includes("PetPlay")}
                    onCheckedChange={() => handleFilterChange("brand", "PetPlay")}
                  />
                  PetPlay
                </Label>
                <Label className="flex items-center gap-2 font-normal cursor-pointer">
                  <Checkbox
                    checked={filters.brand.includes("PetCare")}
                    onCheckedChange={() => handleFilterChange("brand", "PetCare")}
                  />
                  PetCare
                </Label>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Ціна</h3>
              <div className="space-y-4">
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={filters.price}
                  onValueChange={(value: [number, number]) => handleFilterChange("price", value)}
                />
                <div className="flex justify-between text-sm">
                  <span>{filters.price[0]} ₴</span>
                  <span>{filters.price[1]} ₴</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Список товарів */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">Знайдено товарів: {sortedProducts.length}</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Сортувати за" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">За замовчуванням</SelectItem>
                <SelectItem value="price-asc">Ціна: від дешевих до дорогих</SelectItem>
                <SelectItem value="price-desc">Ціна: від дорогих до дешевих</SelectItem>
                <SelectItem value="name-asc">Назва: А-Я</SelectItem>
                <SelectItem value="name-desc">Назва: Я-А</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}

            {sortedProducts.length === 0 && (
              <div className="col-span-3 py-12 text-center">
                <p className="text-gray-500 text-lg">Товари не знайдено. Спробуйте змінити фільтри.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ id, name, price, image }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className="group">
      <div className="product-card bg-white rounded-lg border border-[#e8e5e0] overflow-hidden">
        <div className="relative aspect-square">
          <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-medium group-hover:text-[#a8d5a2] transition-colors">{name}</h3>
          <div className="mt-2 font-semibold">{price} ₴</div>
          <Button className="w-full mt-4 bg-[#a8d5a2] hover:bg-[#97c491] text-white">
            Додати в кошик
          </Button>
        </div>
      </div>
    </Link>
  )
}
