import type { FormData } from "../../features/register/model/form-schema"
import type { LoginCredentials, LoginResponse, AuthMeResponse } from "@/features/login/login.model"

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  void credentials
  // TODO: replace with POST /api/auth/login
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          status: "success",
          userProfile: {
            uid: "user-123",
            email: credentials.email,
            profile_picture_url: "",
            username: "teleo-user",
            roles: ["member"],
            home_church_id: 1,
          },
          session: {
            access_token: "fake-access-token",
            refresh_token: "fake-refresh-token",
            expires_in: 3600,
            token_type: "Bearer",
          },
        }),
      500
    )
  })
}

export async function me(): Promise<AuthMeResponse> {
  // TODO: replace with GET /api/auth/me
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          message: "Authenticated",
          user: {
            id: "user-123",
            email: "user@example.com",
          },
        }),
      300
    )
  })
}

export async function signup(formData: FormData) {
  void formData
  // TODO: replace with real API call
  return new Promise<{ ok: boolean }>((resolve) => {
    setTimeout(() => resolve({ ok: true }), 500)
  })
}

export default { signup, login, me }
