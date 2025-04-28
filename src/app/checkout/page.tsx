"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2 } from "lucide-react"

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

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: "card" | "cash") => {
    setFormState((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Тут була б логіка відправки замовлення на сервер
    setIsSubmitted(true)
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
          <Link href="/">
            <Button className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">Повернутися на головну</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-transition container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Оформлення замовлення</h1>

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

            <Button type="submit" className="w-full bg-[#a8d5a2] hover:bg-[#97c491] text-white">
              Підтвердити замовлення
            </Button>
          </form>
        </div>

        <div className="w-full lg:w-80 shrink-0">
          <Card className="border-[#e8e5e0] sticky top-24">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Ваше замовлення</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Корм для собак преміум</span>
                  <span>599 ₴</span>
                </div>
                <div className="flex justify-between">
                  <span>Шампунь для собак (x2)</span>
                  <span>498 ₴</span>
                </div>
                <div className="flex justify-between">
                  <span>М'ячик для собак</span>
                  <span>149 ₴</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Доставка:</span>
                  <span>Безкоштовно</span>
                </div>
                <div className="pt-3 border-t border-[#e8e5e0] flex justify-between font-semibold">
                  <span>Разом:</span>
                  <span>1246 ₴</span>
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
