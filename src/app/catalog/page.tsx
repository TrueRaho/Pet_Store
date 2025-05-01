import CatalogClient from "@/components/catalog/CatalogClient"

interface Product {
  id: number
  name: string
  price: number
  category: string
  pet: string
  brand: string
  image: string
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' })
    
    if (!res.ok) {
      throw new Error('Ошибка при загрузке товаров')
    }
    
    const data = await res.json()
    return data.products
  } catch (error) {
    console.error('Ошибка при загрузке товаров:', error)
    throw error
  }
}

export default async function CatalogPage() {
  let products: Product[] = []
  let error: Error | null = null
  
  try {
    products = await getProducts()
    console.log('Загруженные товары:', products)
  } catch (e) {
    error = e instanceof Error ? e : new Error('Произошла неизвестная ошибка')
  }

  return (
    <div className="page-transition container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Каталог товарів</h1>

      {error ? (
        <div className="py-12 text-center">
          <p className="text-red-500 text-lg">Ошибка: {error.message}</p>
        </div>
      ) : (
        <CatalogClient initialProducts={products} />
      )}
    </div>
  )
}
