import type { Metadata } from 'next/types'
import ProductClient from './product-client'
import { ProductPageParams } from './types'
import { getProductById, getRecommendedProducts } from '@/services/productService'

interface Props {
  params: Promise<ProductPageParams>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const product = await getProductById(resolvedParams.id)
    
    return {
      title: product.name,
      description: product.description,
    }
  } catch (error) {
    return {
      title: 'Продукт не знайдено',
      description: 'Запитуваний товар не знайдений в магазині',
    }
  }
}

export default async function ProductPage({ params }: Props) {
  try {
    const resolvedParams = await params
    const product = await getProductById(resolvedParams.id)
    const recommendedProducts = await getRecommendedProducts(4)

    return <ProductClient product={product} recommendedProducts={recommendedProducts} />
  } catch (error) {
    return <div>Продукт не знайдено</div>
  }
} 