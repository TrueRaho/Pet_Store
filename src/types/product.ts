export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
} 