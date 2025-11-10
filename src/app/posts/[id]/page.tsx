import { auth } from "@/lib/auth"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PostDetailPageProps {
  params: {
    id: string
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const session = await auth()
  const { id } = params
  
  // TODO: Fetch post from API
  const post = {
    id,
    title: "Przykładowe ogłoszenie",
    description: "To jest szczegółowy opis ogłoszenia. W prawdziwej aplikacji te dane będą pobierane z bazy danych.",
    category: "narzedzia",
    status: "active",
    address: "Warszawa, ul. Przykładowa 123",
    createdAt: new Date(),
    author: {
      id: "1",
      name: "Jan Kowalski",
      email: "jan.kowalski@example.com"
    }
  }

  // TODO: Fetch comments from API
  const comments = []

  const isOwner = session?.user?.email === post.author.email

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/posts" className="text-gray-600 hover:text-gray-900">
              ← Powrót do listy
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Post Details */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    🔧 Narzędzia
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Aktywne
                  </span>
                </div>
                {isOwner && (
                  <div className="flex gap-2">
                    <Link
                      href={`/posts/${id}/edit`}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm hover:bg-yellow-600"
                    >
                      ✏️ Edytuj
                    </Link>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">
                      🗑️ Usuń
                    </button>
                  </div>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex gap-4 text-sm text-gray-600 mb-6">
                <span>📍 {post.address}</span>
                <span>🕒 {post.createdAt.toLocaleDateString('pl-PL')}</span>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-gray-700">{post.description}</p>
              </div>

              {isOwner && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                  <p className="text-sm font-semibold text-yellow-900 mb-2">
                    Zmień status ogłoszenia:
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600">
                      ✅ Oznacz jako zakończone
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">
                      ❌ Anuluj ogłoszenie
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">💬 Komentarze ({comments.length})</h2>

              {session ? (
                <div className="mb-6">
                  <textarea
                    placeholder="Dodaj komentarz..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    rows={3}
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Wyślij komentarz
                  </button>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                  <p className="text-sm text-blue-900">
                    <Link href="/auth/signin" className="font-semibold underline">
                      Zaloguj się
                    </Link>{" "}
                    aby dodać komentarz
                  </p>
                </div>
              )}

              {/* Comments List */}
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Brak komentarzy. Bądź pierwszy!
                </p>
              ) : (
                <div className="space-y-4">
                  {/* Placeholder for comments */}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">👤 Autor ogłoszenia</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <Link
                    href={`/profile/${post.author.id}`}
                    className="font-semibold hover:text-blue-600"
                  >
                    {post.author.name}
                  </Link>
                  <div className="text-xs text-gray-500">
                    ⭐ 4.8 (12 ocen)
                  </div>
                </div>
              </div>
              {session && !isOwner && (
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  📧 Wyślij wiadomość
                </button>
              )}
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">📍 Lokalizacja</h3>
              <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-gray-500 text-sm">Mapa będzie tutaj</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">{post.address}</p>
            </div>

            {/* Similar Posts */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-4">📋 Podobne ogłoszenia</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Link
                    key={i}
                    href={`/posts/${i}`}
                    className="block p-3 border border-gray-200 rounded-md hover:border-blue-500 hover:shadow"
                  >
                    <h4 className="font-semibold text-sm mb-1">Podobne ogłoszenie #{i}</h4>
                    <p className="text-xs text-gray-600">Krótki opis...</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

