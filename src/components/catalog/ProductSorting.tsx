"use client"

import { useState } from "react"
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

interface ProductSortingProps {
  products: Product[]
  onSort: (sortedProducts: Product[]) => void
}

export default function ProductSorting({ products, onSort }: ProductSortingProps) {
  const [sortBy, setSortBy] = useState<string>("default")

  const handleSortChange = (value: string) => {
    setSortBy(value)
    
    const sortedProducts = [...products].sort((a, b) => {
      switch (value) {
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
    
    onSort(sortedProducts)
  }

  return (
    <div className="flex justify-between items-center mb-6">
      <p className="text-gray-600">Знайдено товарів: {products.length}</p>
      <Select value={sortBy} onValueChange={handleSortChange}>
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
  )
} 