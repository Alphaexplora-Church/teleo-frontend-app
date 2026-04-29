import { useState } from "react"
import { useNavigate } from "react-router"
import { formSchema, type FormData } from "../model/form-schema"
import { stepFields } from "../model/step-config"

export function useForgotPasswordViewModel() {
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    contact: "",
    otp: "",
    new_password: "",
    confirm_password: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = () => {
    const result = formSchema.safeParse(formData)
    const currentFields = stepFields[currentStep]

    if (!result.success) {
      const stepErrors: Record<string, string> = {}
      let hasError = false

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData
        if (currentFields.includes(field)) {
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
    if (currentStep < stepFields.length) {
      if (!validateStep()) return
    }

    setCurrentStep((prev) => prev + 1)
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
    showSuccess,

    // actions
    setFormData,
    next,
    finish,
  }
}
