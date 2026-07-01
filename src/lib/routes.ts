export const ROUTES = {
  root: "/",
  login: "/login",
  signup: "/signup",
  terms: "/terms",
  forgotPassword: "/forgot-password",
  landing: "/landing",
  library: "/library",
  librarySection: "/library/section",
  settings: "/settings",
  account: "/account",
  security: "/security",
  notifications: "/notifications",
  courseDetail: "/course/detail",
  profile: "/profile",
} as const

export type RouteKey = keyof typeof ROUTES
