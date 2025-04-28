import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e8e5e0] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-4">
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
            <p className="text-gray-600 mb-4">
              Ми піклуємося про ваших улюбленців так само, як і ви. Якісні товари для щасливих тварин.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Інформація</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#a8d5a2] transition-colors">
                  Про нас
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="text-gray-600 hover:text-[#a8d5a2] transition-colors">
                  Контакти
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-[#a8d5a2] transition-colors">
                  Політика конфіденційності
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Категорії</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog?category=food" className="text-gray-600 hover:text-[#a8d5a2] transition-colors">
                  Корм
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=toys" className="text-gray-600 hover:text-[#a8d5a2] transition-colors">
                  Іграшки
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=care" className="text-gray-600 hover:text-[#a8d5a2] transition-colors">
                  Догляд
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакти</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">+380 (50) 123-45-67</li>
              <li className="text-gray-600">info@lapkytapky.ua</li>
              <li className="text-gray-600">м. Київ, вул. Хрещатик, 1</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#e8e5e0] text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ЛапкиТапки. Всі права захищені.
        </div>
      </div>
    </footer>
  )
}
