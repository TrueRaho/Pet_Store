"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Помилка реєстрації")
      }

      const user = await response.json()
      
      // Сохраняем пользователя в localStorage
      localStorage.setItem("user", JSON.stringify(user))
      
      // Перенаправляем на страницу профиля
      router.push("/profile")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Невідома помилка")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-transition container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-lg border-[#e8e5e0]">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold mb-2">Реєстрація нового користувача</h1>
            <p className="text-gray-600">Заповніть форму, щоб створити обліковий запис</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ім'я</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="border-[#e8e5e0]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Прізвище</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="border-[#e8e5e0]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-[#e8e5e0]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-[#e8e5e0]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border-[#e8e5e0]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">Поштовий індекс</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="border-[#e8e5e0]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Адреса</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="border-[#e8e5e0]"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="city">Місто</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="border-[#e8e5e0]"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#a8d5a2] hover:bg-[#97c491] text-white mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Завантаження..." : "Зареєструватися"}
            </Button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Вже маєте обліковий запис? <Link href="/login" className="text-[#a8d5a2] hover:underline">Увійти</Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 