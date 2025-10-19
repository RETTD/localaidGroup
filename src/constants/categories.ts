export const POST_CATEGORIES = [
  {
    value: "pomoc_w_zakupach",
    label: "🛒 Pomoc w zakupach",
    description: "Zakupy spożywcze, lekarstwa, etc."
  },
  {
    value: "prace_domowe",
    label: "🏠 Prace domowe",
    description: "Sprzątanie, drobne naprawy, ogród"
  },
  {
    value: "narzedzia",
    label: "🔧 Narzędzia",
    description: "Wypożyczenie narzędzi, sprzętu"
  },
  {
    value: "transport",
    label: "🚗 Transport",
    description: "Podwiezienie, przewóz rzeczy"
  },
  {
    value: "opieka",
    label: "👥 Opieka",
    description: "Opieka nad dziećmi, zwierzętami"
  },
  {
    value: "nauka",
    label: "📚 Nauka",
    description: "Korepetycje, pomoc w nauce"
  },
  {
    value: "inne",
    label: "✨ Inne",
    description: "Pozostałe formy pomocy"
  }
] as const

export const POST_STATUSES = [
  { value: "active", label: "Aktywne", color: "green" },
  { value: "completed", label: "Zakończone", color: "blue" },
  { value: "cancelled", label: "Anulowane", color: "red" }
] as const

