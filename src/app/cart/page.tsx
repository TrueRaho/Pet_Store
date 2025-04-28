"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

// Імітація даних кошика
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Корм для собак преміум Royal Canin",
    price: 599,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Шампунь для собак",
    price: 249,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "М'ячик для собак",
    price: 149,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const calculateDelivery = () => {
    const subtotal = calculateSubtotal()
    return subtotal > 1000 ? 0 : 100
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateDelivery()
  }

  if (cartItems.length === 0) {
    return (
      <div className="page-transition container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-gray-400" />
          <h1 className="text-2xl font-semibold mb-4">Ваш кошик порожній</h1>
          <p className="text-gray-600 mb-8">Здається, ви ще не додали жодного товару до кошика.</p>
          <Link href="/catalog">
            <Button className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">Перейти до каталогу</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-transition container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Кошик</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Список товарів */}
        <div className="flex-1">
          <Card className="border-[#e8e5e0]">
            <CardContent className="p-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-[#e8e5e0] last:border-0 last:pb-0">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <Link href={`/product/${item.id}`} className="font-medium hover:text-[#a8d5a2] transition-colors">
                        {item.name}
                      </Link>
                      <div className="text-gray-600 mt-1">{item.price} ₴</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-[#e8e5e0] rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 rounded-none"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="w-8 text-center text-sm">{item.quantity}</div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 rounded-none"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="font-semibold w-20 text-right">{item.price * item.quantity} ₴</div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Підсумок замовлення */}
        <div className="w-full lg:w-80 shrink-0">
          <Card className="border-[#e8e5e0] sticky top-24">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Підсумок замовлення</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Вартість товарів:</span>
                  <span>{calculateSubtotal()} ₴</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка:</span>
                  <span>{calculateDelivery() === 0 ? "Безкоштовно" : `${calculateDelivery()} ₴`}</span>
                </div>
                <div className="pt-3 border-t border-[#e8e5e0] flex justify-between font-semibold">
                  <span>Разом:</span>
                  <span>{calculateTotal()} ₴</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full bg-[#a8d5a2] hover:bg-[#97c491] text-white">Оформити замовлення</Button>
              </Link>

              <div className="mt-4">
                <Link href="/catalog" className="text-sm text-[#a8d5a2] hover:underline">
                  ← Продовжити покупки
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
