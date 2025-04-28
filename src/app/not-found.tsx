import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-[#a8d5a2]">404</h1>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Сторінку не знайдено</h2>
        <p className="text-gray-600 mb-8">Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.</p>
        <Link href="/">
          <Button className="bg-[#a8d5a2] hover:bg-[#97c491] text-white">На головну</Button>
        </Link>
      </div>
    </div>
  )
}
