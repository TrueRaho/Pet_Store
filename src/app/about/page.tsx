import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="page-transition container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Про нас</h1>

      <div className="max-w-3xl mx-auto">
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=400&width=800" alt="Команда ЛапкиТапки" fill className="object-cover" />
        </div>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Наша місія</h2>
          <p className="mb-6">
            Ми в ЛапкиТапки віримо, що кожна тварина заслуговує на найкраще. Наша місія — забезпечити власників домашніх
            улюбленців якісними товарами, які сприятимуть здоров'ю, комфорту та щастю їхніх чотирилапих друзів.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Наша історія</h2>
          <p className="mb-6">
            ЛапкиТапки було засновано у 2018 році групою ентузіастів та любителів тварин. Все почалося з невеликого
            магазину в центрі Києва, де ми пропонували обмежений асортимент товарів для домашніх улюбленців. З часом,
            завдяки нашій відданості якості та обслуговуванню клієнтів, ми виросли до національної мережі з
            онлайн-присутністю.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Наші цінності</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Якість понад усе.</strong> Ми ретельно відбираємо кожен товар, щоб забезпечити найвищу якість для
              ваших улюбленців.
            </li>
            <li>
              <strong>Турбота про тварин.</strong> Ми підтримуємо ініціативи з захисту тварин та сприяємо
              відповідальному власництву.
            </li>
            <li>
              <strong>Екологічна відповідальність.</strong> Ми прагнемо мінімізувати наш вплив на навколишнє середовище,
              обираючи екологічно чисті продукти та пакування.
            </li>
            <li>
              <strong>Клієнтоорієнтованість.</strong> Ми завжди прислухаємося до наших клієнтів та прагнемо перевершити
              їхні очікування.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Наша команда</h2>
          <p className="mb-6">
            Наша команда складається з досвідчених фахівців та ентузіастів, які поділяють любов до тварин. Багато з
            наших співробітників є власниками домашніх улюбленців, тому вони розуміють потреби та проблеми, з якими ви
            можете зіткнутися.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="border-[#e8e5e0]">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#a8d5a2] mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">5+</span>
              </div>
              <h3 className="font-semibold mb-2">Років на ринку</h3>
              <p className="text-gray-600 text-sm">Досвід та експертиза у сфері товарів для тварин</p>
            </CardContent>
          </Card>

          <Card className="border-[#e8e5e0]">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#a8d5a2] mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">1000+</span>
              </div>
              <h3 className="font-semibold mb-2">Товарів</h3>
              <p className="text-gray-600 text-sm">Широкий асортимент для всіх видів домашніх улюбленців</p>
            </CardContent>
          </Card>

          <Card className="border-[#e8e5e0]">
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#a8d5a2] mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">10k+</span>
              </div>
              <h3 className="font-semibold mb-2">Щасливих клієнтів</h3>
              <p className="text-gray-600 text-sm">Довіра та задоволення наших покупців</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
