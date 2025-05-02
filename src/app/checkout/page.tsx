"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { useCart } from "@/context/CartContext"

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  notes: string
  paymentMethod: "card" | "cash"
}

export default function CheckoutPage() {
  const { cartItems, clearCart, itemsCount } = useCart()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
    paymentMethod: "card",
  })

  // Загружаем информацию о пользователе, если она есть
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      
      // Заполняем форму данными пользователя
      setFormState(prev => ({
        ...prev,
        firstName: userData.firstName || prev.firstName,
        lastName: userData.lastName || prev.lastName,
        email: userData.email || prev.email,
        phone: userData.phone || prev.phone,
        address: userData.address || prev.address,
        city: userData.city || prev.city,
        postalCode: userData.zipCode || prev.postalCode
      }))
    } else {
      // Если пользователь не авторизован, перенаправляем на страницу логина
      router.push('/login?redirect=checkout')
    }
  }, [router])

  // Проверяем, что корзина не пуста
  useEffect(() => {
    if (itemsCount === 0) {
      router.push('/cart')
    }
  }, [itemsCount, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: "card" | "cash") => {
    setFormState((prev) => ({ ...prev, paymentMethod: value }))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!user || cartItems.length === 0) {
      setError("Помилка при оформленні замовлення. Перевірте авторизацію та наявність товарів у кошику.")
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          items: cartItems,
          total: calculateTotal(),
          address: formState.address,
          city: formState.city,
          phone: formState.phone,
          notes: formState.notes
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Помилка при створенні замовлення")
      }

      // Очищаем корзину
      clearCart()
      setIsSubmitted(true)
      
      // После небольшой задержки для показа благодарственного экрана, перенаправляем на профиль
      setTimeout(() => {
        router.push('/profile')
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Невідома помилка")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="page-transition container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <CheckCircle2 className="h-16 w-16 mx-auto mb-6 text-[#a8d5a2]" />
          <h1 className="text-2xl font-semibold mb-4">Дякуємо за замовлення!</h1>
          <p className="text-gray-600 mb-8">
            Ваше замовлення успішно оформлено. Ми зв'яжемося з вами найближчим часом для підтвердження.
          </p>
          <p className="text-gray-600 mb-8">
            Зараз вас буде перенаправлено на сторінку профілю...
          </p>
          <Link href="/profile">
            <Button className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">Перейти до профілю</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!user || cartItems.length === 0) {
    return <div className="container mx-auto px-4 py-8">Завантаження...</div>
  }

  return (
    <div className="page-transition container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Оформлення замовлення</h1>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <Card className="border-[#e8e5e0] mb-6">
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Контактна інформація</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ім'я *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      required
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Прізвище *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      required
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      required
                      className="border-[#e8e5e0]"
                      placeholder="+380"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>
                </div>

                <h2 className="font-semibold text-lg mb-4">Адреса доставки</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Адреса *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formState.address}
                      onChange={handleChange}
                      required
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Місто *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formState.city}
                      onChange={handleChange}
                      required
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Поштовий індекс</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formState.postalCode}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#e8e5e0] mb-6">
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Спосіб оплати</h2>

                <RadioGroup value={formState.paymentMethod} onValueChange={handleRadioChange} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer">
                      Оплата карткою онлайн
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer">
                      Оплата при отриманні
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="border-[#e8e5e0] mb-6">
              <CardContent className="p-6">
                <h2 className="font-semibold text-lg mb-4">Додаткова інформація</h2>

                <div className="space-y-2">
                  <Label htmlFor="notes">Примітки до замовлення</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formState.notes}
                    onChange={handleChange}
                    className="border-[#e8e5e0]"
                    placeholder="Додаткова інформація щодо доставки або замовлення"
                  />
                </div>
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full bg-[#a8d5a2] hover:bg-[#97c491] text-white"
              disabled={isLoading}
            >
              {isLoading ? "Обробка замовлення..." : "Підтвердити замовлення"}
            </Button>
          </form>
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <Card className="border-[#e8e5e0] sticky top-24">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Ваше замовлення</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}</span>
                    <span>{item.price * item.quantity} ₴</span>
                  </div>
                ))}
                
                <div className="flex justify-between text-gray-600">
                  <span>Доставка:</span>
                  <span>Безкоштовно</span>
                </div>
                <div className="pt-3 border-t border-[#e8e5e0] flex justify-between font-semibold">
                  <span>Разом:</span>
                  <span>{calculateTotal()} ₴</span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                Натискаючи кнопку "Підтвердити замовлення", ви погоджуєтесь з нашими{" "}
                <Link href="/privacy" className="text-[#a8d5a2] hover:underline">
                  умовами та політикою конфіденційності
                </Link>
                .
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
