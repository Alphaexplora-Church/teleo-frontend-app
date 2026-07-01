import { useEffect, useRef, useState } from "react"
import type { FormData } from "./model/form-schema"

type SetFormData = React.Dispatch<React.SetStateAction<FormData>>

export function useOtpViewModel(formData: FormData, setFormData: SetFormData) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(120)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const handleChange = (i: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return

    const otp = (formData.otp ?? "").split("")
    otp[i] = value
    const updated = otp.join("").padEnd(6, "").slice(0, 6)

    setFormData((prev) => ({ ...prev, otp: updated }))

    if (value && i < 5) inputsRef.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !(formData.otp ?? "")[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
    }
  }

  const resend = () => {
    if (timeLeft > 0) return
    setTimeLeft(120)
    // place to call resend OTP service if needed
  }

  return {
    inputsRef,
    timeLeft,
    handleChange,
    handleKeyDown,
    resend,
  }
}

export default useOtpViewModel
