import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { POST_CATEGORIES } from "@/constants/categories"

export default async function CreatePostPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/posts" className="text-gray-600 hover:text-gray-900">
              ← Powrót do listy
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">➕ Dodaj ogłoszenie</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <form>
                {/* Title */}
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Tytuł ogłoszenia *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="np. Pożyczę wiertarkę na weekend"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Kategoria *
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Wybierz kategorię</option>
                    {POST_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Wybierz kategorię, która najlepiej opisuje Twoje ogłoszenie
                  </p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Opis *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    placeholder="Opisz szczegółowo czego potrzebujesz lub co oferujesz..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 20 znaków
                  </p>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Adres / Lokalizacja
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="np. Warszawa, ul. Marszałkowska 1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pomaga innym znaleźć oferty w swojej okolicy
                  </p>
                </div>

                {/* Location Map Placeholder */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Wskaż lokalizację na mapie (opcjonalnie)
                  </label>
                  <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Interaktywna mapa będzie tutaj</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
                  >
                    📤 Opublikuj ogłoszenie
                  </button>
                  <Link
                    href="/posts"
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-semibold"
                  >
                    Anuluj
                  </Link>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar - Preview & Tips */}
          <div className="lg:col-span-1">
            {/* Preview */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">👁️ Podgląd</h3>
              <div className="border border-gray-200 rounded-md p-4">
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    🔧 Kategoria
                  </span>
                </div>
                <h4 className="font-semibold mb-2">Twój tytuł tutaj</h4>
                <p className="text-sm text-gray-600 mb-2">Twój opis tutaj...</p>
                <div className="text-xs text-gray-500">
                  <p>👤 {session.user?.name || "Ty"}</p>
                  <p>📍 Twoja lokalizacja</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-4">💡 Wskazówki</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Użyj jasnego i konkretnego tytułu</span>
                </li>
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Opisz szczegółowo swoją potrzebę</span>
                </li>
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Dodaj lokalizację dla lepszej widoczności</span>
                </li>
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Bądź uprzejmy i profesjonalny</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

