"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Package, LogOut } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Интерфейс для пользователя
interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string | null
  address: string | null
  city: string | null
  zipCode: string | null
}

// Імітація даних замовлень
const orderData = [
  {
    id: "ORD-2023-001",
    date: "2023-12-15",
    status: "completed",
    total: 1246,
    items: [
      { name: "Корм для собак преміум", quantity: 1, price: 599 },
      { name: "Шампунь для собак", quantity: 2, price: 249 },
      { name: "М'ячик для собак", quantity: 1, price: 149 },
    ],
  },
  {
    id: "ORD-2023-002",
    date: "2024-01-05",
    status: "processing",
    total: 748,
    items: [
      { name: "Лежак для котів", quantity: 1, price: 899 },
      { name: "Наповнювач для котів", quantity: 1, price: 349 },
    ],
  },
]

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const router = useRouter()

  // Загрузка профиля пользователя
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // Проверяем, авторизован ли пользователь
        const savedUser = localStorage.getItem("user")
        
        if (!savedUser) {
          // Если пользователь не авторизован, перенаправляем на страницу входа
          router.push("/login")
          return
        }
        
        const userData = JSON.parse(savedUser)
        
        // Загружаем актуальные данные пользователя с сервера
        const response = await fetch(`/api/profile?email=${userData.email}`)
        
        if (!response.ok) {
          throw new Error("Не вдалося завантажити профіль")
        }
        
        const profileData = await response.json()
        setUser(profileData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Помилка завантаження профілю")
        console.error("Ошибка загрузки профиля:", err)
      } finally {
        setLoading(false)
      }
    }
    
    loadUserProfile()
  }, [router])

  // Обработка изменения полей формы
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (user) {
      setUser((prev) => prev ? { ...prev, [name]: value } : null)
    }
  }

  // Отправка формы для обновления профиля
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!user) return
    
    setError(null)
    setUpdateSuccess(false)
    
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Не вдалося оновити профіль")
      }
      
      const updatedUser = await response.json()
      
      // Обновляем пользователя в состоянии и localStorage
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      
      setUpdateSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка оновлення профілю")
      console.error("Ошибка обновления профиля:", err)
    }
  }

  // Выход из системы
  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  // Получение статуса заказа
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Виконано</Badge>
      case "processing":
        return <Badge className="bg-blue-500">В обробці</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Скасовано</Badge>
      default:
        return <Badge className="bg-gray-500">В очікуванні</Badge>
    }
  }

  // Отображение сообщения загрузки
  if (loading) {
    return (
      <div className="page-transition container mx-auto px-4 py-8 text-center">
        <p>Завантаження профілю...</p>
      </div>
    )
  }

  // Если пользователь не авторизован, показываем пустую страницу
  // (Перенаправление на /login происходит в useEffect)
  if (!user) {
    return null
  }

  return (
    <div className="page-transition container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Особистий кабінет</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Мій профіль
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Мої замовлення
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-[#e8e5e0]">
            <CardContent className="p-6">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {updateSuccess && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <AlertDescription className="text-green-800">
                    Профіль успішно оновлено
                  </AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ім'я</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Прізвище</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={user.phone || ""}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Адреса</Label>
                    <Input
                      id="address"
                      name="address"
                      value={user.address || ""}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Місто</Label>
                    <Input
                      id="city"
                      name="city"
                      value={user.city || ""}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Поштовий індекс</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={user.zipCode || ""}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button type="submit" className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">
                    Зберегти зміни
                  </Button>

                  <Button 
                    type="button"
                    variant="outline" 
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Вийти
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-6">
            {orderData.map((order) => (
              <Card key={order.id} className="border-[#e8e5e0]">
                <CardContent className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold">Замовлення {order.id}</h3>
                      <p className="text-gray-600 text-sm">Дата: {new Date(order.date).toLocaleDateString("uk-UA")}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      {getStatusBadge(order.status)}
                      <span className="font-semibold">{order.total} ₴</span>
                    </div>
                  </div>

                  <div className="border-t border-[#e8e5e0] pt-4">
                    <h4 className="font-medium mb-2">Товари:</h4>
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} {item.quantity > 1 && `(x${item.quantity})`}
                          </span>
                          <span>{item.price * item.quantity} ₴</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
