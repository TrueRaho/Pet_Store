'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Интерфейс для элемента корзины
export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

// Интерфейс для контекста корзины
interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: any, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemsCount: number
}

// Создаем контекст
const CartContext = createContext<CartContextType | undefined>(undefined)

// Провайдер контекста
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  // Загрузка корзины из localStorage при первом рендере
  useEffect(() => {
    setIsClient(true)
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error)
        localStorage.removeItem('cart')
      }
    }
  }, [])

  // Обновление localStorage при изменении корзины
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('cart', JSON.stringify(cartItems))
      
      // Создаем кастомное событие для обновления счетчика в хедере
      const cartUpdatedEvent = new Event('cartUpdated', { bubbles: true })
      window.dispatchEvent(cartUpdatedEvent)
    }
  }, [cartItems, isClient])

  // Добавление товара в корзину
  const addToCart = (product: any, quantity = 1) => {
    setCartItems(prevItems => {
      // Проверяем, есть ли уже такой товар в корзине
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id)
      
      if (existingItemIndex >= 0) {
        // Если товар уже есть, создаем новый массив с обновленным количеством
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Если товара нет, добавляем новый элемент
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.image
        }
        return [...prevItems, newItem]
      }
    })
  }

  // Удаление товара из корзины
  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  // Обновление количества товара
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return

    setCartItems(prevItems => 
      prevItems.map(item => item.id === id ? { ...item, quantity } : item)
    )
  }

  // Очистка корзины
  const clearCart = () => {
    setCartItems([])
  }

  // Подсчет общего количества товаров
  const itemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        itemsCount 
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Хук для использования контекста корзины
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 