import { searchProducts } from "@/services/productService";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // В Next.js 15+, searchParams - это промис, который нужно await
  const params = await searchParams;
  const searchQuery = typeof params.query === 'string' ? params.query : '';
  
  let products: Product[] = [];
  let error: string | null = null;
  
  if (searchQuery) {
    try {
      products = await searchProducts(searchQuery);
    } catch (e) {
      error = e instanceof Error ? e.message : "Помилка при пошуку товарів";
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-2xl font-semibold mb-6">
        {searchQuery ? `Результати пошуку для "${searchQuery}"` : 'Пошук товарів'}
      </h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {!error && searchQuery && products.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl mb-4">Товарів не знайдено</h2>
          <p className="text-gray-500 mb-8">
            На жаль, ми не змогли знайти товари за вашим запитом "{searchQuery}".
            Спробуйте змінити пошуковий запит або перегляньте наш каталог.
          </p>
          <Link href="/catalog">
            <Button className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">
              Перейти до каталогу
            </Button>
          </Link>
        </div>
      )}
      
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 