export interface User {
  id: string
  name: string | null
  email: string
  emailVerified: Date | null
  password: string | null
  image: string | null
  bio: string | null
  phone: string | null
  address: string | null
  latitude: number | null
  longitude: number | null
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  description: string
  category: string
  status: "active" | "completed" | "cancelled"
  authorId: string
  latitude: number | null
  longitude: number | null
  address: string | null
  createdAt: Date
  updatedAt: Date
  author?: User
  comments?: Comment[]
}

export interface Comment {
  id: string
  content: string
  postId: string
  authorId: string
  createdAt: Date
  updatedAt: Date
  author?: User
  post?: Post
}

export interface Rating {
  id: string
  rating: number
  comment: string | null
  reviewerId: string
  reviewedId: string
  createdAt: Date
  updatedAt: Date
  reviewer?: User
  reviewed?: User
}

export type PostCategory =
  | "pomoc_w_zakupach"
  | "prace_domowe"
  | "narzedzia"
  | "transport"
  | "opieka"
  | "nauka"
  | "inne"

export type PostStatus = "active" | "completed" | "cancelled"

