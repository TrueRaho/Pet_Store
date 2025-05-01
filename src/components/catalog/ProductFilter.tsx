"use client"

import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface Product {
  id: number
  name: string
  price: number
  category: string
  pet: string
  brand: string
  image: string
}

interface Filters {
  category: string[]
  pet: string[]
  brand: string[]
  price: [number, number]
}

interface ProductFilterProps {
  products: Product[]
  onFilterChange: (filteredProducts: Product[]) => void
  initialCategory?: string
  initialPet?: string
}

export default function ProductFilter({ products, onFilterChange, initialCategory, initialPet }: ProductFilterProps) {
  console.log("ProductFilter received:", { initialCategory, initialPet, productsCount: products.length });
  
  // Инициализация фильтров с начальными значениями из URL
  const [filters, setFilters] = useState<Filters>(() => {
    console.log("Initializing filters with:", { initialCategory, initialPet });
    return {
      category: initialCategory ? [initialCategory] : [],
      pet: initialPet ? [initialPet] : [],
      brand: [],
      price: [0, 1000],
    };
  });

  const handleFilterChange = (type: keyof Filters, value: string | [number, number]) => {
    setFilters((prev) => {
      const newFilters = { ...prev }

      if (type === "price") {
        newFilters.price = value as [number, number]
      } else {
        const stringValue = value as string
        if (newFilters[type].includes(stringValue)) {
          newFilters[type] = newFilters[type].filter((item) => item !== stringValue)
        } else {
          newFilters[type] = [...newFilters[type], stringValue]
        }
      }

      return newFilters
    })
  }

  // Функция для фильтрации продуктов
  const filterProducts = () => {
    console.log("Applying filters:", filters);
    const filtered = products.filter((product) => {
      if (filters.category.length > 0 && !filters.category.includes(product.category)) {
        return false
      }
      if (filters.pet.length > 0 && !filters.pet.includes(product.pet)) {
        return false
      }
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
        return false
      }
      if (product.price < filters.price[0] || product.price > filters.price[1]) {
        return false
      }
      return true
    });
    
    console.log(`Filtered products: ${filtered.length} of ${products.length}`);
    return filtered;
  };
  
  // Применяем фильтры при изменении любого из параметров фильтрации или списка продуктов
  useEffect(() => {
    const filteredProducts = filterProducts();
    onFilterChange(filteredProducts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, products, onFilterChange]);
  
  // При изменении initialCategory или initialPet обновляем фильтры
  useEffect(() => {
    console.log("URL params changed:", { initialCategory, initialPet });
    setFilters(prev => ({
      ...prev,
      category: initialCategory ? [initialCategory] : prev.category,
      pet: initialPet ? [initialPet] : prev.pet
    }));
  }, [initialCategory, initialPet]);

  return (
    <div className="w-full md:w-64 shrink-0">
      <div className="bg-white p-4 rounded-lg border border-[#e8e5e0] sticky top-24">
        <h2 className="font-semibold text-lg mb-4">Фільтри</h2>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Тип тварини</h3>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.pet.includes("dog")}
                onCheckedChange={() => handleFilterChange("pet", "dog")}
              />
              Собаки
            </Label>
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.pet.includes("cat")}
                onCheckedChange={() => handleFilterChange("pet", "cat")}
              />
              Коти
            </Label>
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.pet.includes("other")}
                onCheckedChange={() => handleFilterChange("pet", "other")}
              />
              Інші тварини
            </Label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Категорія</h3>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.category.includes("food")}
                onCheckedChange={() => handleFilterChange("category", "food")}
              />
              Корм
            </Label>
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.category.includes("toys")}
                onCheckedChange={() => handleFilterChange("category", "toys")}
              />
              Іграшки
            </Label>
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.category.includes("care")}
                onCheckedChange={() => handleFilterChange("category", "care")}
              />
              Догляд
            </Label>
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.category.includes("accessories")}
                onCheckedChange={() => handleFilterChange("category", "accessories")}
              />
              Аксесуари
            </Label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Бренд</h3>
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.brand.includes("Royal Canin")}
                onCheckedChange={() => handleFilterChange("brand", "Royal Canin")}
              />
              Royal Canin
            </Label>
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.brand.includes("Whiskas")}
                onCheckedChange={() => handleFilterChange("brand", "Whiskas")}
              />
              Whiskas
            </Label>
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.brand.includes("PetPlay")}
                onCheckedChange={() => handleFilterChange("brand", "PetPlay")}
              />
              PetPlay
            </Label>
            <Label className="flex items-center gap-2 font-normal cursor-pointer">
              <Checkbox
                checked={filters.brand.includes("PetCare")}
                onCheckedChange={() => handleFilterChange("brand", "PetCare")}
              />
              PetCare
            </Label>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-medium mb-2">Ціна</h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={filters.price}
              onValueChange={(value: [number, number]) => handleFilterChange("price", value)}
            />
            <div className="flex justify-between text-sm">
              <span>{filters.price[0]} ₴</span>
              <span>{filters.price[1]} ₴</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 