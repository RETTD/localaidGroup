import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

// Format date relative to now
export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "teraz"
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} min temu`
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} godz. temu`
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} dni temu`

  return date.toLocaleDateString("pl-PL")
}

