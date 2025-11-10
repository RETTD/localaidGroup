import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function EditProfilePage() {
  const session = await auth()
  
  if (!session) {
    redirect("/auth/signin")
  }

  // TODO: Fetch current user data
  const user = {
    name: session.user?.name || "",
    email: session.user?.email || "",
    bio: "Mieszkam na Bemowie i chętnie pomogę sąsiadom.",
    phone: "+48 123 456 789",
    address: "Warszawa, Bemowo",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/profile/me" className="text-gray-600 hover:text-gray-900">
              ← Powrót do profilu
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">✏️ Edytuj profil</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-6">Podstawowe informacje</h2>
              <form>
                {/* Avatar Upload Placeholder */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zdjęcie profilowe
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                      >
                        📤 Wgraj zdjęcie
                      </button>
                      <p className="text-xs text-gray-500 mt-1">
                        JPG, PNG lub GIF (max. 2MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={user.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Email (read-only) */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email nie może być zmieniony
                  </p>
                </div>

                {/* Bio */}
                <div className="mb-6">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    O mnie
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    defaultValue={user.bio}
                    placeholder="Opowiedz coś o sobie..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maksymalnie 500 znaków
                  </p>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    defaultValue={user.phone}
                    placeholder="+48 123 456 789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                    defaultValue={user.address}
                    placeholder="np. Warszawa, Bemowo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pomaga innym znaleźć Cię w okolicy
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
                  >
                    💾 Zapisz zmiany
                  </button>
                  <Link
                    href="/profile/me"
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-semibold"
                  >
                    Anuluj
                  </Link>
                </div>
              </form>
            </div>

            {/* Change Password Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Zmiana hasła</h2>
              <form>
                {/* Current Password */}
                <div className="mb-6">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Aktualne hasło *
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* New Password */}
                <div className="mb-6">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Nowe hasło *
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 8 znaków
                  </p>
                </div>

                {/* Confirm New Password */}
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Potwierdź nowe hasło *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-600 text-white py-3 rounded-md hover:bg-yellow-700 font-semibold"
                >
                  🔒 Zmień hasło
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Tips & Privacy */}
          <div className="lg:col-span-1">
            {/* Privacy Info */}
            <div className="bg-blue-50 rounded-lg shadow p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">🔒 Prywatność</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Twój email jest zawsze prywatny</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Telefon widoczny tylko po kliknięciu</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Możesz ukryć swój profil w dowolnym momencie</span>
                </li>
              </ul>
            </div>

            {/* Tips */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">💡 Wskazówki</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Dodaj zdjęcie profilowe</span>
                </li>
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Napisz coś o sobie</span>
                </li>
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Dodaj numer telefonu</span>
                </li>
                <li className="flex gap-2">
                  <span>✅</span>
                  <span>Podaj swoją lokalizację</span>
                </li>
              </ul>
              <p className="text-xs text-gray-600 mt-4">
                Kompletny profil zwiększa zaufanie innych użytkowników!
              </p>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 border border-red-200 rounded-lg shadow p-6">
              <h3 className="font-bold text-lg mb-4 text-red-900">⚠️ Strefa niebezpieczna</h3>
              <button
                type="button"
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 font-semibold"
              >
                🗑️ Usuń konto
              </button>
              <p className="text-xs text-red-700 mt-2">
                Ta akcja jest nieodwracalna!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

