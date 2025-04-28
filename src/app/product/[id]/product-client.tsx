"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, Plus, Minus } from "lucide-react"
import { Product } from "@/types/product"

interface ProductClientProps {
  product: Product
  recommendedProducts: Product[]
}

export default function ProductClient({ product, recommendedProducts }: ProductClientProps) {
  const [selectedImage, setSelectedImage] = useState(product.image)
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  const addToCart = () => {
    alert(`Додано до кошика: ${product.name} (${quantity} шт.)`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Галерея зображень */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Інформація про продукт */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.reviews} відгуків
            </span>
          </div>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="text-3xl font-bold mb-6">{product.price} ₴</div>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-[#e8e5e0] rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="h-10 w-10 rounded-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={increaseQuantity}
                className="h-10 w-10 rounded-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              className="flex-1 bg-[#a8d5a2] hover:bg-[#97c491] text-white"
              size="lg"
              onClick={addToCart}
            >
              Додати до кошика
            </Button>
          </div>
        </div>
      </div>

      {/* Рекомендовані продукти */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Рекомендовані товари</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{product.price} ₴</span>
                  <Button
                    size="sm"
                    className="bg-[#a8d5a2] hover:bg-[#97c491] text-white"
                  >
                    Купити
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 