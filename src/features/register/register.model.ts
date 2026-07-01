import type { FormData as SignupFormData } from "./model/form-schema"

export type FormData = SignupFormData

export interface RegisterPayload extends FormData {}

export interface RegisterResponse {
  status: "success" | "failed"
  error?: string
}
