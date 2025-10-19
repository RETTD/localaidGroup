import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { signOut } from "@/lib/auth"

export default async function Home() {
  const session = await auth()
  
  // Fetch some posts from database
  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        }
      },
      _count: {
        select: { comments: true }
      }
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🏠 LocalAid</h1>
            <p className="text-sm text-gray-600">Pomoc sąsiedzka w Twojej okolicy</p>
          </div>
          <div className="flex gap-4 items-center">
            {session ? (
              <>
                <span className="text-sm text-gray-700">
                  Cześć, <strong>{session.user?.name || session.user?.email}</strong>
                </span>
                <form
                  action={async () => {
                    "use server"
                    await signOut()
                  }}
                >
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Wyloguj
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Zaloguj się
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  Zarejestruj się
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {session ? `Witaj ponownie! 👋` : 'Witamy w LocalAid! 🎉'}
          </h2>
          <p className="text-gray-600 mb-4">
            LocalAid to platforma łącząca sąsiadów, którzy potrzebują pomocy z tymi, którzy mogą jej udzielić.
            Pożycz narzędzie, pomóż w zakupach, lub znajdź kogoś kto pomoże w transporcie.
          </p>
          {!session && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm font-semibold text-blue-900 mb-2">🧪 Demo - konta testowe:</p>
              <p className="text-sm text-blue-800">Email: <code className="bg-white px-2 py-1 rounded">jan.kowalski@example.com</code></p>
              <p className="text-sm text-blue-800">Hasło: <code className="bg-white px-2 py-1 rounded">password123</code></p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{posts.length}</div>
            <div className="text-gray-600">Aktywnych ogłoszeń</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              {posts.reduce((sum, post) => sum + post._count.comments, 0)}
            </div>
            <div className="text-gray-600">Komentarzy</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">3</div>
            <div className="text-gray-600">Użytkowników</div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-4">📋 Najnowsze ogłoszenia</h3>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border-b pb-4 last:border-b-0">
                <h4 className="font-semibold text-lg">{post.title}</h4>
                <p className="text-gray-600 text-sm mb-2">{post.description}</p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>👤 {post.author.name}</span>
                  <span>📁 {post.category}</span>
                  <span>💬 {post._count.comments} komentarzy</span>
                  <span>🕒 {new Date(post.createdAt).toLocaleDateString('pl-PL')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Database Connection Test */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-green-900">
            ✅ Baza danych działa poprawnie!
          </p>
          <p className="text-xs text-green-700 mt-1">
            Połączenie z SQLite zostało nawiązane. Załadowano {posts.length} ogłoszenia.
          </p>
        </div>
      </main>
    </div>
  )
}
