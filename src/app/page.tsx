import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
      _count: {
        select: { comments: true },
      },
    },
  });

  const totalComments = posts.reduce(
    (sum, post) => sum + post._count.comments,
    0
  );

  return (
    <div className="space-y-8">
      {/* Welcome / hero + akcje */}
      <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            {session ? "Witaj ponownie! 👋" : "Witamy w LocalAid! 🎉"}
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-xl">
            LocalAid to platforma łącząca sąsiadów, którzy potrzebują pomocy z
            tymi, którzy mogą jej udzielić. Pożycz narzędzie, pomóż w zakupach,
            albo znajdź kogoś, kto pomoże w transporcie.
          </p>

          {!session && (
            <div className="mt-4 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
              <p className="font-semibold mb-1">🧪 Konto demo:</p>
              <p>
                Email:{" "}
                <code className="rounded bg-white px-2 py-1">
                  jan.kowalski@example.com
                </code>
              </p>
              <p>
                Hasło:{" "}
                <code className="rounded bg-white px-2 py-1">
                  password123
                </code>
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {session ? (
            <>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-500 transition"
                >
                  Wyloguj
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 transition"
              >
                Zaloguj się
              </Link>
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 transition"
              >
                Zarejestruj się
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Statystyki */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-indigo-600">
            {posts.length}
          </div>
          <div className="mt-1 text-sm text-slate-600">Aktywnych ogłoszeń</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-emerald-600">
            {totalComments}
          </div>
          <div className="mt-1 text-sm text-slate-600">Komentarzy</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-purple-600">3</div>
          <div className="mt-1 text-sm text-slate-600">Użytkowników (demo)</div>
        </div>
      </section>

      {/* Ostatnie ogłoszenia */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">
            📋 Najnowsze ogłoszenia
          </h2>
          <Link
            href="/posts"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Zobacz wszystkie
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-slate-500">
            Brak ogłoszeń. Dodaj pierwsze ogłoszenie, aby zacząć.
          </p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border-b border-slate-100 pb-4 last:border-b-0"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {post.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>👤 {post.author.name ?? post.author.email}</span>
                  <span>📁 {post.category}</span>
                  <span>💬 {post._count.comments} komentarzy</span>
                  <span>
                    🕒{" "}
                    {new Date(post.createdAt).toLocaleDateString("pl-PL", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Info o bazie – jako mały banner */}
      <section className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs text-emerald-900">
        <p className="font-semibold">✅ Baza danych działa poprawnie</p>
        <p className="mt-1">
          Połączenie z SQLite zostało nawiązane. Załadowano {posts.length}{" "}
          ogłoszenia.
        </p>
      </section>
    </div>
  );
}
