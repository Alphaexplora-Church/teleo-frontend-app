import type { FormData } from "./form-schema"

export const stepFields: (keyof FormData)[][] = [
  ["first_name", "last_name"],
  ["birthday"],
  ["gender"],
  ["username"],
  ["area"],
  ["email", "phone"],
  ["password", "confirm_password", "terms"],
  ["otp"],
  ["avatar_upload"],
]
