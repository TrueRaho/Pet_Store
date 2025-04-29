import { Product } from "@/types/product";

// Функция для получения всех продуктов
export async function getProducts(): Promise<Product[]> {
  const response = await fetch("/api/products", {
    cache: "no-store", // Отключаем кеширование для получения свежих данных
  });

  if (!response.ok) {
    throw new Error("Не вдалося завантажити продукти");
  }

  const data = await response.json();
  return data.products;
}

// Функция для получения продукта по ID
export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`/api/products/${id}`, {
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