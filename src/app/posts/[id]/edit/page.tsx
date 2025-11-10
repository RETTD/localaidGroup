import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { POST_CATEGORIES, POST_STATUSES } from "@/constants/categories"

interface EditPostPageProps {
  params: {
    id: string
  }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const session = await auth()
  const { id } = params
  
  if (!session) {
    redirect("/auth/signin")
  }

  // TODO: Fetch post from API and check if user is owner
  const post = {
    id,
    title: "Przykładowe ogłoszenie do edycji",
    description: "To jest przykładowy opis, który możesz edytować.",
    category: "narzedzia",
    status: "active",
    address: "Warszawa, ul. Przykładowa 123",
    authorId: session.user?.id
  }

  // TODO: Check if user is owner
  const isOwner = true // Placeholder

  if (!isOwner) {
    redirect(`/posts/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href={`/posts/${id}`} className="text-gray-600 hover:text-gray-900">
              ← Powrót do ogłoszenia
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">✏️ Edytuj ogłoszenie</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
                defaultValue={post.title}
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
                defaultValue={post.category}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {POST_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                id="status"
                name="status"
                defaultValue={post.status}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {POST_STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
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
                defaultValue={post.description}
                placeholder="Opisz szczegółowo czego potrzebujesz lub co oferujesz..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
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
                defaultValue={post.address}
                placeholder="np. Warszawa, ul. Marszałkowska 1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location Map Placeholder */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zaktualizuj lokalizację na mapie (opcjonalnie)
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
                💾 Zapisz zmiany
              </button>
              <Link
                href={`/posts/${id}`}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-semibold"
              >
                Anuluj
              </Link>
              <button
                type="button"
                className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 font-semibold"
              >
                🗑️ Usuń
              </button>
            </div>
          </form>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-yellow-900">
            ⚠️ Uwaga: Edycja ogłoszenia spowoduje aktualizację daty modyfikacji. 
            Użytkownicy, którzy śledzą to ogłoszenie, mogą zostać powiadomieni o zmianach.
          </p>
        </div>
      </main>
    </div>
  )
}

