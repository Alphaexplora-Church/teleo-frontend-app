import type { FormData } from "./form-schema"

export const stepFields: (keyof FormData)[][] = [
  ["email"],
  ["password", "confirm_password", "terms"],
  ["first_name", "last_name", "birthday", "gender", "username", "area", "avatar_upload"],
]
