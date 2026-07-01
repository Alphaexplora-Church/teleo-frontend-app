import type { FormEvent } from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { ROUTES } from "@/lib/routes"
import { login } from "@/lib/services/auth"
import type { LoginCredentials } from "./login.model"

export function useLogin() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const handleChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    if (!credentials.email.trim() || !credentials.password.trim()) {
      setError("Please enter both email and password.")
      return
    }

    setLoading(true)
    try {
      const response = await login(credentials)
      if (response.status === "success") {
        navigate(ROUTES.landing)
      } else {
        setError(response.error ?? "Login failed. Please check your credentials.")
      }
    } catch (err) {
      console.error(err)
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return {
    credentials,
    loading,
    error,
    handleChange,
    handleSubmit,
  }
}
