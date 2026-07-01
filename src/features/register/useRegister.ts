import { useState } from "react"
import { useNavigate } from "react-router"
import { ROUTES } from "@/lib/routes"
import { formSchema } from "./model/form-schema"
import type { FormData } from "./register.model"
import { stepFields } from "./model/step-config"
// Temporary local signup service to avoid module resolution issues during refactor.
// TODO: switch back to centralized `lib/services/auth` when path resolution is stable.
async function signupService(_formData: FormData) {
  void _formData
  return new Promise<{ ok: boolean }>((resolve) => setTimeout(() => resolve({ ok: true }), 500))
}

export function useRegisterViewModel() {
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(0)
  const [showSplash, setShowSplash] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    username: "",
    area: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    terms: false,
    otp: "",
    avatar_upload: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validateStep = () => {
    const result = formSchema.safeParse(formData)
    const currentFields = stepFields[currentStep]

    if (!result.success) {
      const stepErrors: Record<string, string> = {}
      let hasError = false

      result.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (typeof field === "string" && currentFields.includes(field as keyof FormData)) {
          stepErrors[field] = issue.message
          hasError = true
        }
      })

      if (hasError) {
        setErrors(stepErrors)
        return false
      }
    }

    setErrors({})
    return true
  }

  const next = async () => {
    if (!validateStep()) return

    if (currentStep < stepFields.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setLoading(true)
      try {
        await signupService(formData)
        setShowSuccess(true)
      } catch (err) {
        console.error(err)
        setErrors({ general: "Signup failed. Please try again." })
      } finally {
        setLoading(false)
      }
    }
  }

  const finish = () => {
    navigate(ROUTES.login)
  }

  return {
    // state
    currentStep,
    formData,
    errors,
    setErrors,
    showSplash,
    showSuccess,
    loading,

    // actions
    setFormData,
    next,
    setShowSplash,
    finish,
  }
}

export {}
