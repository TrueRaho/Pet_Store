import { Product } from "@/types/product";

// Получение базового URL в зависимости от окружения
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Клиентская сторона: используем относительный путь
    return '';
  }
  // Серверная сторона: используем абсолютный URL
  // В разработке - localhost, в продакшне - домен сайта
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
}

// Функция для получения всех продуктов
export async function getProducts(): Promise<Product[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/products`, {
    cache: "no-store", // Отключаем кеширование для получения свежих данных
  });

  if (!response.ok) {
    throw new Error("Не вдалося завантажити продукти");
  }

  const data = await response.json();
  return data.products;
}

// Функция для поиска продуктов по запросу
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/products?query=${encodeURIComponent(query)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Не вдалося знайти продукти");
  }

  const data = await response.json();
  return data.products;
}

// Функция для получения продуктов по типу животного
export async function getProductsByPet(pet: string, limit?: number): Promise<Product[]> {
  const products = await getProducts();
  const filteredProducts = products.filter(product => product.pet === pet);
  return limit ? filteredProducts.slice(0, limit) : filteredProducts;
}

// Функция для получения продуктов по категории и типу животного
export async function getProductsByCategoryAndPet(category: string, pet: string, limit?: number): Promise<Product[]> {
  const products = await getProducts();
  const filteredProducts = products.filter(product => product.category === category && product.pet === pet);
  return limit ? filteredProducts.slice(0, limit) : filteredProducts;
}

// Функция для получения продукта по ID
export async function getProductById(id: string): Promise<Product> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Продукт не знайдено");
    }
    throw new Error(`Не вдалося завантажити продукт з ID ${id}`);
  }

  return await response.json();
}

// Функция для получения рекомендованных продуктов
export async function getRecommendedProducts(limit = 4): Promise<Product[]> {
  const products = await getProducts();
  return products.slice(0, limit);
} 