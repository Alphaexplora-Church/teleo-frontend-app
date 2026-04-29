import type { FormData } from "./form-schema"

export const stepFields: (keyof FormData)[][] = [
  ["contact"],
  ["otp"],
  ["new_password", "confirm_password"],
]
