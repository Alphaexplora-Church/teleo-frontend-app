import { useState } from "react"
import { useNavigate } from "react-router"
import { formSchema, type FormData } from "../model/form-schema"
import { stepFields } from "../model/step-config"

export function useSignupViewModel() {
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

  const validateStep = () => {
    const result = formSchema.safeParse(formData)
    const currentFields = stepFields[currentStep]

    if (!result.success) {
      const stepErrors: Record<string, string> = {}
      let hasError = false

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string
        if (currentFields.includes(field as any)) {
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

  const next = () => {
    if (!validateStep()) return

    if (currentStep < stepFields.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setShowSuccess(true)
    }
  }

  const finish = () => {
    navigate("/login")
  }

  return {
    // state
    currentStep,
    formData,
    errors,
    setErrors,
    showSplash,
    showSuccess,

    // actions
    setFormData,
    next,
    setShowSplash,
    finish,
  }
}
