import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
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
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <div className="flex justify-between items-center">
            <span className="font-semibold">{product.price} ₴</span>
            <Button size="sm" className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">
              Купити
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard 