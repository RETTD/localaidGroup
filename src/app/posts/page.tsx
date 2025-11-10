import { auth } from "@/lib/auth"
import Link from "next/link"
import { POST_CATEGORIES, POST_STATUSES } from "@/constants/categories"

export default async function PostsPage() {
  const session = await auth()
  
  // TODO: Fetch posts from API with filters
  const posts = [] // Placeholder

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📋 Ogłoszenia</h1>
              <p className="text-sm text-gray-600">Przeglądaj ogłoszenia w swojej okolicy</p>
            </div>
            {session && (
              <Link
                href="/posts/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                ➕ Dodaj ogłoszenie
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h3 className="font-bold text-lg mb-4">🔍 Filtry</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wyszukaj
                </label>
                <input
                  type="text"
                  placeholder="Szukaj ogłoszeń..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategoria
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Wszystkie</option>
                  {POST_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Wszystkie</option>
                  {POST_STATUSES.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sorting */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sortowanie
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="newest">Najnowsze</option>
                  <option value="oldest">Najstarsze</option>
                  <option value="popular">Popularne</option>
                </select>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Zastosuj filtry
              </button>
            </div>
          </aside>

          {/* Main Content - Posts Grid */}
          <div className="lg:col-span-3">
            {/* View Toggle */}
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Znaleziono <strong>0</strong> ogłoszeń
              </p>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                  Grid
                </button>
                <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm">
                  Lista
                </button>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Placeholder Posts */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      🔧 Narzędzia
                    </span>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Aktywne
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Przykładowe ogłoszenie #{i}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    To jest przykładowy opis ogłoszenia. Tutaj będzie prawdziwa treść z bazy danych.
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>👤 Jan Kowalski</span>
                    <span>📍 Warszawa</span>
                  </div>
                  <div className="flex gap-2 text-xs text-gray-500 mb-4">
                    <span>💬 0 komentarzy</span>
                    <span>🕒 2 dni temu</span>
                  </div>
                  <Link
                    href={`/posts/${i}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Zobacz szczegóły
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50" disabled>
                ← Poprzednia
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md">1</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">2</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">3</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                Następna →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

