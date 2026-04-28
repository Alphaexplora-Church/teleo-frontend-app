import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"

type Props = {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  errors: Record<string, string>
}

export default function OTPForm({ formData, setFormData, errors }: Props) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(120)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleChange = (i: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return

    const otp = formData.otp.split("")
    otp[i] = value

    const updated = otp.join("").padEnd(6, "").slice(0, 6)

    setFormData((prev: any) => ({
      ...prev,
      otp: updated,
    }))

    if (value && i < 5) {
      inputsRef.current[i + 1]?.focus()
    }
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !formData.otp[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
    }
  }

  const resend = () => {
    if (timeLeft > 0) return
    setTimeLeft(120)
    console.log("resend OTP")
  }

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2">
        {[...Array(6)].map((_, i) => (
          <Input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el
            }}
            maxLength={1}
            className="h-12 w-12 text-center"
            value={formData.otp[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        ))}
      </div>

      {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}

      <button onClick={resend} disabled={timeLeft > 0}>
        {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend"}
      </button>
    </div>
  )
}
