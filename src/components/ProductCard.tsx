"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    // Предотвращаем переход на страницу товара при клике на кнопку
    e.preventDefault()
    e.stopPropagation()
    
    // Добавляем товар в корзину через контекст
    addToCart(product, 1)
    
    // Показываем уведомление
    alert('Товар добавлен в корзину')
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card bg-white rounded-lg overflow-hidden border border-[#e8e5e0]">
        <div className="aspect-square relative">
          <Image 
            src={product.image || "/placeholder.svg"} 
            alt={product.name} 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{product.price} ₴</span>
            <Button 
              size="sm" 
              className="bg-[#a8d5a2] hover:bg-[#97c491] text-white"
              onClick={handleAddToCart}
            >
              Купити
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard 