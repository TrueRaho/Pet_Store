"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Помилка авторизації")
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
      <Card className="w-full max-w-md border-[#e8e5e0]">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold mb-2">Вхід до облікового запису</h1>
            <p className="text-gray-600">Увійдіть, щоб отримати доступ до свого профілю</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#e8e5e0]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#e8e5e0]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#a8d5a2] hover:bg-[#97c491] text-white"
                disabled={isLoading}
              >
                {isLoading ? "Завантаження..." : "Увійти"}
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Ще не маєте облікового запису? <Link href="/register" className="text-[#a8d5a2] hover:underline">Зареєструватися</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 