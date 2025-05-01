"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProductFilter from "./ProductFilter"
import ProductSorting from "./ProductSorting"

interface Product {
  id: number
  name: string
  price: number
  category: string
  pet: string
  brand: string
  image: string
}

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
}

interface CatalogClientProps {
  initialProducts: Product[]
  initialCategory?: string
  initialPet?: string
}

export default function CatalogClient({ initialProducts, initialCategory, initialPet }: CatalogClientProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(initialProducts)

  console.log("CatalogClient received:", { initialCategory, initialPet });

  const handleFilterChange = useCallback((newFilteredProducts: Product[]) => {
    setFilteredProducts(newFilteredProducts)
    setDisplayedProducts(newFilteredProducts)
  }, [])

  const handleSort = useCallback((sortedProducts: Product[]) => {
    setDisplayedProducts(sortedProducts)
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <ProductFilter 
        products={initialProducts} 
        onFilterChange={handleFilterChange} 
        initialCategory={initialCategory}
        initialPet={initialPet}
      />

      <div className="flex-1">
        <ProductSorting products={filteredProducts} onSort={handleSort} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <p className="text-gray-500 text-lg">Товари не знайдено. Спробуйте змінити фільтри.</p>
            </div>
          )}
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