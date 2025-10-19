# 🏠 LocalAid - Platforma Pomocy Sąsiedzkiej

> Mikroogłoszenia pomocy sąsiedzkiej - Next.js Full-Stack Application

## 📋 O projekcie

LocalAid to platforma łącząca sąsiadów, którzy potrzebują pomocy z tymi, którzy mogą jej udzielić. Pożycz narzędzie, pomóż w zakupach, lub znajdź kogoś kto pomoże w transporcie.

## 🛠️ Stack Technologiczny

### Frontend
- **Next.js 15.5** - React framework z App Router + Turbopack
- **React 19** - najnowsza wersja React
- **TypeScript 5** - typowanie
- **Tailwind CSS v4** - stylowanie
- **NextAuth v5** - autentykacja

### Backend
- **Next.js API Routes** - backend API
- **Prisma ORM** - zarządzanie bazą danych
- **SQLite** - baza danych (zero konfiguracji!)
- **bcryptjs** - hashowanie haseł
- **Zod** - walidacja danych

## 🚀 Szybki Start

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/twoj-username/localaid.git
cd localaid
```

### 2. Instalacja zależności

```bash
npm install
```

### 3. Konfiguracja środowiska

Skopiuj `.env.example` do `.env`:

```bash
cp .env.example .env
```

Plik `.env` jest już skonfigurowany dla lokalnego developmentu.

### 4. Baza danych

**Projekt już zawiera bazę z przykładowymi danymi!** 

Jeśli chcesz zresetować bazę:

```bash
npm run db:reset
npm run db:seed
```

### 5. Uruchomienie aplikacji

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 👤 Konta Testowe

Aplikacja zawiera 3 przykładowych użytkowników:

| Email | Hasło | Opis |
|-------|-------|------|
| `jan.kowalski@example.com` | `password123` | Ma ogłoszenia o narzędziach |
| `anna.nowak@example.com` | `password123` | Oferuje pomoc w zakupach |
| `piotr.wisniewski@example.com` | `password123` | Prosi o pomoc w transporcie |

## 📊 Funkcje

### ✅ Zaimplementowane (MVP)

- ✅ **Autentykacja**
  - Rejestracja użytkowników
  - Logowanie (email + hasło)
  - Wylogowanie
  - Ochrona chronionych stron

- ✅ **Baza danych**
  - SQLite z Prisma ORM
  - Modele: User, Post, Comment, Rating
  - Seed z przykładowymi danymi

### 🚧 W planach

- 📝 Dodawanie ogłoszeń
- 🔍 Filtrowanie po kategorii i lokalizacji
- 💬 System komentarzy
- ⭐ Oceny użytkowników
- 🗺️ Mapa z lokalizacją ogłoszeń
- 👤 Profile użytkowników

## 📁 Struktura projektu

```
localaid/
├── prisma/
│   ├── schema.prisma      # Modele bazy danych
│   ├── seed.js            # Przykładowe dane
│   └── dev.db             # SQLite database (88KB)
│
├── src/
│   ├── app/
│   │   ├── api/           # Backend API Routes
│   │   ├── auth/          # Strony autentykacji
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Strona główna
│   │
│   ├── components/        # React components
│   │   └── providers/
│   │
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client
│   │   ├── auth.ts        # NextAuth config
│   │   └── utils.ts       # Helper functions
│   │
│   ├── types/             # TypeScript types
│   └── constants/         # Kategorie i stałe
│
├── .env                   # Konfiguracja (gitignored)
├── .env.example           # Przykładowa konfiguracja
└── package.json
```

## 🔧 Przydatne komendy

```bash
# Development
npm run dev              # Uruchom serwer dev

# Database
npm run db:generate      # Generuj Prisma Client
npm run db:push          # Wypchaj schemat do bazy
npm run db:seed          # Dodaj przykładowe dane
npm run db:reset         # Zresetuj bazę danych
npm run db:studio        # Otwórz Prisma Studio (GUI)

# Build
npm run build            # Build produkcyjny
npm start                # Uruchom build produkcyjny

# Lint
npm run lint             # Sprawdź kod
```

## 🗄️ Prisma Studio

Podgląd bazy danych w GUI:

```bash
npx prisma studio
```

Otwórz [http://localhost:5555](http://localhost:5555)

## 🐛 Troubleshooting

### Problem: "Cannot find module @prisma/client"
```bash
npx prisma generate
```

### Problem: "Database file doesn't exist"
```bash
npx prisma db push
npm run db:seed
```

### Problem: Port 3000 zajęty
```bash
npm run dev -- -p 3001
```

## 📝 Zmienne środowiskowe

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
AUTH_SECRET="your-secret-key-here"
```

Wygeneruj secret key:
```bash
openssl rand -base64 32
```

## 🤝 Contributing

Ten projekt został stworzony jako projekt inżynierski. Pull requesty są mile widziane!

## 📄 Licencja

MIT

## 👨‍💻 Autor

Projekt inżynierski - LocalAid
