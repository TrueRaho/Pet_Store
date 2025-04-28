"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, Package, LogOut } from "lucide-react"

// Імітація даних користувача
const userData = {
  firstName: "Олександр",
  lastName: "Петренко",
  email: "oleksandr@example.com",
  phone: "+380501234567",
  address: "вул. Хрещатик, 1, кв. 10",
  city: "Київ",
  zipCode: "01001",
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
  const [user, setUser] = useState(userData)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Тут була б логіка оновлення даних користувача
    alert("Дані успішно оновлено")
  }

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
                      value={user.phone}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Адреса</Label>
                    <Input
                      id="address"
                      name="address"
                      value={user.address}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">Місто</Label>
                    <Input
                      id="city"
                      name="city"
                      value={user.city}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Поштовий індекс</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={user.zipCode}
                      onChange={handleChange}
                      className="border-[#e8e5e0]"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-6">
                  <Button type="submit" className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">
                    Зберегти зміни
                  </Button>

                  <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
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
