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
