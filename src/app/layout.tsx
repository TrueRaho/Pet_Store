import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/context/CartContext"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ЛапкиТапки - Інтернет-магазин товарів для домашніх тварин",
  description: "Найкращі товари для ваших домашніх улюбленців за доступними цінами",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen pt-20 pb-10">{children}</main>
            <Footer />
          </ThemeProvider>
        </CartProvider>
      </body>
    </html>
  )
}
