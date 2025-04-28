"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, CheckCircle2 } from "lucide-react"

interface FormState {
  name: string
  email: string
  message: string
}

export default function ContactsPage() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Тут була б логіка відправки повідомлення на сервер
    setIsSubmitted(true)
  }

  return (
    <div className="page-transition container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Контакти</h1>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Зв'яжіться з нами</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#a8d5a2] shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium">Адреса</h3>
                  <p className="text-gray-600">м. Київ, вул. Хрещатик, 1</p>
                  <p className="text-gray-600">Працюємо щодня: 9:00 - 21:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#a8d5a2] shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium">Телефон</h3>
                  <p className="text-gray-600">+380 (50) 123-45-67</p>
                  <p className="text-gray-600">+380 (67) 765-43-21</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#a8d5a2] shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">info@lapkytapky.ua</p>
                  <p className="text-gray-600">support@lapkytapky.ua</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-4">Ми на карті</h3>
              <div className="aspect-video bg-gray-200 rounded-lg relative">
                {/* Тут була б карта */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">Карта</div>
              </div>
            </div>
          </div>

          <div>
            <Card className="border-[#e8e5e0]">
              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-[#a8d5a2]" />
                    <h3 className="text-xl font-semibold mb-2">Дякуємо за повідомлення!</h3>
                    <p className="text-gray-600">Ми отримали ваше повідомлення і зв'яжемося з вами найближчим часом.</p>
                    <Button
                      className="mt-6 bg-[#a8d5a2] hover:bg-[#97c491] text-white"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Надіслати ще одне повідомлення
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold mb-6">Напишіть нам</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ваше ім'я *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="border-[#e8e5e0]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Ваш email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="border-[#e8e5e0]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Повідомлення *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          className="min-h-[150px] border-[#e8e5e0]"
                        />
                      </div>

                      <Button type="submit" className="w-full bg-[#a8d5a2] hover:bg-[#97c491] text-white">
                        Надіслати повідомлення
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
