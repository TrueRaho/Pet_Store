"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#f8f5f0] border-b border-[#e8e5e0] z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#a8d5a2] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 9C8 10.1046 7.10457 11 6 11C4.89543 11 4 10.1046 4 9C4 7.89543 4.89543 7 6 7C7.10457 7 8 7.89543 8 9Z"
                fill="white"
              />
              <path
                d="M20 9C20 10.1046 19.1046 11 18 11C16.8954 11 16 10.1046 16 9C16 7.89543 16.8954 7 18 7C19.1046 7 20 7.89543 20 9Z"
                fill="white"
              />
              <path
                d="M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14C10 15.1046 10.8954 16 12 16Z"
                fill="white"
              />
              <path
                d="M8 19C8 20.1046 7.10457 21 6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17C7.10457 17 8 17.8954 8 19Z"
                fill="white"
              />
              <path
                d="M20 19C20 20.1046 19.1046 21 18 21C16.8954 21 16 20.1046 16 19C16 17.8954 16.8954 17 18 17C19.1046 17 20 17.8954 20 19Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold">ЛапкиТапки</span>
        </Link>

        <div className="hidden md:flex items-center justify-center flex-1 mx-4">
          <div className="relative w-full max-w-md">
            <Input type="search" placeholder="Пошук товарів..." className="pl-10 bg-white border-[#e8e5e0]" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Профіль</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-[#a8d5a2] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
              <span className="sr-only">Кошик</span>
            </Button>
          </Link>
        </div>
      </div>

      {isSearchOpen && (
        <div className="md:hidden p-4 border-t border-[#e8e5e0] bg-[#f8f5f0]">
          <div className="relative">
            <Input type="search" placeholder="Пошук товарів..." className="pl-10 bg-white border-[#e8e5e0]" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
      )}
    </header>
  )
}
