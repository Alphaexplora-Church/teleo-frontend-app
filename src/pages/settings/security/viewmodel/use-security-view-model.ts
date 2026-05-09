import { useState } from "react"
import { useNavigate } from "react-router"
import { otpSchema, formSchemas } from "../model/form-schema"
import type { FieldKey, Step } from "../model/security-field-keys"

export function useSecurityViewModel() {
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [activeField, setActiveField] = useState<FieldKey | null>(null)
  const [step, setStep] = useState<Step>("otp")

  const [otp, setOtp] = useState("")
  const [oldValue, setOldValue] = useState("")
  const [newValue, setNewValue] = useState("")
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
    const result = schema.safeParse({ oldValue, newValue })

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
    navigate("/settings")
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
    errors,
    otpTimeLeft,

    // actions
    setOtp,
    setOldValue,
    setNewValue,
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
