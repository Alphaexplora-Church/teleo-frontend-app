// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface LoginCredentials {
  email: string
  password: string
}

export interface UserProfile {
  uid: string
  email: string
  profile_picture_url: string
  username: string
  roles: string[]
  home_church_id: number
}

export interface AuthSession {
  access_token: string
  refresh_token: string
  expires_in: number
  token_type: string
}

export interface LoginResponse {
  status: "success" | "failed"
  userProfile?: UserProfile
  session?: AuthSession
  error?: string
}

export interface AuthMeResponse {
  message?: string
  user?: {
    id: string
    email: string
  }
  error?: string
}

// ─── Library ───────────────────────────────────────────────────────────────────
export type Tab = "library" | "bookshelf" | "downloads" | "history"
export type ContentItem = {
  title: string
  subtitle: string
  duration: string
  genre?: string
}
export type EventItem = {
  title: string
  date: string
  location: string
  description: string
}
export type HistoryItem = {
  number: number
  title: string
  subtitle: string
  duration: string
  type: "video" | "file"
}
export type Section = {
  title: string
  showAll: boolean
  items: ContentItem[]
}

export type Chapter = {
  number: number
  title: string
  duration: string
  completed: boolean
  type: "file" | "video"
  downloaded?: boolean
}

export type Attachment = {
  id: string
  name: string
  size: string
  type: "pdf" | "image" | "other"
}

export type CourseDetail = {
  title: string
  author: string
  date: string
  progress: number
  totalChapters: number
  currentChapter: number
  about: string
  tags: string[]
  chapters: Chapter[]
  attachments: Attachment[]
  relatedTopics: string[]
}

// ─── Settings ──────────────────────────────────────────────────────────────────
export type FieldKey = "Email" | "Phone Number" | "Password"
export type SecurityStep = "otp" | "form" | "success"

export type AccountUserData = {
  username: string
  firstName: string
  lastName: string
  birthdate: string
  pronouns: string
  photo: string
}

// ─── Register ──────────────────────────────────────────────────────────────────
export interface RegisterPayload {
  first_name: string
  last_name: string
  birthday: string
  gender: string
  username: string
  area: string
  email: string
  phone: string
  password: string
  confirm_password: string
  terms: boolean
  otp: string
  avatar_upload: File | null
}

export interface RegisterResponse {
  status: "success" | "failed"
  error?: string
}
