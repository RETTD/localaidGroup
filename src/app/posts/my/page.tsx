import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function MyPostsPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  // TODO: Fetch user's posts from API
  const posts = []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📝 Moje ogłoszenia</h1>
              <p className="text-sm text-gray-600">Zarządzaj swoimi ogłoszeniami</p>
            </div>
            <Link
              href="/posts/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              ➕ Nowe ogłoszenie
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">0</div>
            <div className="text-gray-600 text-sm">Wszystkie</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">0</div>
            <div className="text-gray-600 text-sm">Aktywne</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">0</div>
            <div className="text-gray-600 text-sm">Zakończone</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-red-600">0</div>
            <div className="text-gray-600 text-sm">Anulowane</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-4 items-center">
            <span className="text-sm font-medium text-gray-700">Filtruj:</span>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
              Wszystkie
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
              Aktywne
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
              Zakończone
            </button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300">
              Anulowane
            </button>
          </div>
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold mb-2">Nie masz jeszcze żadnych ogłoszeń</h3>
            <p className="text-gray-600 mb-6">
              Dodaj swoje pierwsze ogłoszenie i zacznij pomagać sąsiadom!
            </p>
            <Link
              href="/posts/create"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-semibold"
            >
              ➕ Dodaj pierwsze ogłoszenie
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Placeholder Posts */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        🔧 Narzędzia
                      </span>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Aktywne
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      Moje ogłoszenie #{i}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Przykładowy opis ogłoszenia...
                    </p>
                    <div className="flex gap-4 text-xs text-gray-500">
                      <span>💬 0 komentarzy</span>
                      <span>👁️ 0 wyświetleń</span>
                      <span>🕒 2 dni temu</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <Link
                      href={`/posts/${i}`}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 text-center"
                    >
                      👁️ Zobacz
                    </Link>
                    <Link
                      href={`/posts/${i}/edit`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600 text-center"
                    >
                      ✏️ Edytuj
                    </Link>
                    <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                      ✅ Zakończ
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">
                      🗑️ Usuń
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

