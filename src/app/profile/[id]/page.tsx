import { auth } from "@/lib/auth"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ProfilePageProps {
  params: {
    id: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const session = await auth()
  const { id } = params
  
  // TODO: Fetch user data from API
  const user = {
    id,
    name: "Jan Kowalski",
    email: "jan.kowalski@example.com",
    bio: "Mieszkam na Bemowie i chętnie pomogę sąsiadom. Mam wiertarkę, młotek i inne narzędzia.",
    phone: "+48 123 456 789",
    address: "Warszawa, Bemowo",
    createdAt: new Date("2024-01-15"),
  }

  // TODO: Fetch user's posts
  const userPosts = []

  // TODO: Fetch user's ratings
  const ratings = []
  const averageRating = 4.8
  const totalRatings = 12

  const isOwnProfile = session?.user?.email === user.email

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/posts" className="text-gray-600 hover:text-gray-900">
              ← Powrót
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - User Info */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user.name.charAt(0)}
                </div>
              </div>

              {/* Name & Stats */}
              <h2 className="text-2xl font-bold text-center mb-2">{user.name}</h2>
              <div className="flex justify-center items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= averageRating ? "text-yellow-400" : "text-gray-300"}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating} ({totalRatings} ocen)
                </span>
              </div>

              {/* Bio */}
              {user.bio && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">{user.bio}</p>
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span className="text-gray-700">{user.address}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span className="text-gray-700">{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span className="text-gray-700">
                    Dołączył {user.createdAt.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Actions */}
              {isOwnProfile ? (
                <Link
                  href="/profile/edit"
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold"
                >
                  ✏️ Edytuj profil
                </Link>
              ) : (
                <div className="space-y-2">
                  {session ? (
                    <>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold">
                        📧 Wyślij wiadomość
                      </button>
                      <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-semibold">
                        ⭐ Dodaj ocenę
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/auth/signin"
                      className="block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold"
                    >
                      Zaloguj się aby skontaktować
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-4">📊 Statystyki</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ogłoszenia:</span>
                  <span className="font-semibold">{userPosts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Średnia ocen:</span>
                  <span className="font-semibold">{averageRating} ⭐</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Liczba ocen:</span>
                  <span className="font-semibold">{totalRatings}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Na platformie:</span>
                  <span className="font-semibold">
                    {Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30))} mies.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="flex border-b">
                <button className="flex-1 px-4 py-3 font-semibold border-b-2 border-blue-600 text-blue-600">
                  📋 Ogłoszenia ({userPosts.length})
                </button>
                <button className="flex-1 px-4 py-3 font-semibold text-gray-600 hover:text-gray-900">
                  ⭐ Oceny ({totalRatings})
                </button>
              </div>
            </div>

            {/* User's Posts */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold">Ogłoszenia użytkownika</h3>
              {userPosts.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-600">
                    {isOwnProfile 
                      ? "Nie masz jeszcze żadnych ogłoszeń" 
                      : "Ten użytkownik nie ma jeszcze ogłoszeń"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {/* Placeholder posts */}
                  {[1, 2].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          🔧 Narzędzia
                        </span>
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Aktywne
                        </span>
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Przykładowe ogłoszenie #{i}</h4>
                      <p className="text-gray-600 text-sm mb-4">
                        Krótki opis ogłoszenia...
                      </p>
                      <div className="flex gap-4 text-xs text-gray-500 mb-4">
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
              )}
            </div>

            {/* User's Ratings */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Otrzymane oceny</h3>
              {ratings.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <div className="text-6xl mb-4">⭐</div>
                  <p className="text-gray-600">
                    {isOwnProfile 
                      ? "Nie masz jeszcze żadnych ocen" 
                      : "Ten użytkownik nie ma jeszcze ocen"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Placeholder ratings */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            A
                          </div>
                          <div>
                            <p className="font-semibold">Anna Nowak</p>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className="text-yellow-400">⭐</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">2 tygodnie temu</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Świetna współpraca! Bardzo pomocny i terminowy. Polecam!
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

