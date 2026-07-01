import { useState } from "react"
import { useNavigate } from "react-router"
import { ROUTES } from "@/lib/routes"
import { otpSchema, formSchemas } from "./model/form-schema"
import type { FieldKey, Step } from "./model/security-field-keys"

export function useSecurityViewModel() {
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [activeField, setActiveField] = useState<FieldKey | null>(null)
  const [step, setStep] = useState<Step>("otp")

  const [otp, setOtp] = useState("")
  const [oldValue, setOldValue] = useState("")
  const [newValue, setNewValue] = useState("")
  const [confirmValue, setConfirmValue] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [otpTimeLeft, setOtpTimeLeft] = useState(300)

  const toggleEditing = () => {
    setIsEditing((prev) => !prev)
  }

  const openModal = (field: FieldKey) => {
    setActiveField(field)
    setStep("otp")
    setOtp("")
    setOldValue("")
    setNewValue("")
    setConfirmValue("")
    setErrors({})
    setOtpTimeLeft(300)
  }

  const closeModal = () => {
    setActiveField(null)
    setErrors({})
  }

  const confirmOtp = () => {
    const result = otpSchema.safeParse({ otp })
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message
      })
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setStep("form")
  }

  const saveChanges = () => {
    if (!activeField) return

    const schema = formSchemas[activeField]
    const result = schema.safeParse({ oldValue, newValue, confirmValue })

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    setStep("success")
  }

  const handleSuccessConfirm = () => {
    closeModal()
    navigate(ROUTES.settings)
  }

  const resendOtp = (resetTimer: () => void) => {
    if (otpTimeLeft > 0) return
    resetTimer()
    setOtpTimeLeft(300)
  }

  return {
    // state
    isEditing,
    activeField,
    step,
    otp,
    oldValue,
    newValue,
    confirmValue,
    errors,
    otpTimeLeft,

    // actions
    setOtp,
    setOldValue,
    setNewValue,
    setConfirmValue,
    setOtpTimeLeft,
    toggleEditing,
    openModal,
    closeModal,
    confirmOtp,
    saveChanges,
    handleSuccessConfirm,
    resendOtp,
  }
}
