import { useEffect, useRef, useState } from "react"
import { CircleCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { FormData } from "../model/form-schema"
import { forgotPasswordSteps } from "../model/forgot-password-steps"
import { useForgotPasswordViewModel } from "../viewmodel/use-forgot-password-view-model"

// ── ContactForm ──────────────────────────────────────────────────────────────

type ContactFormProps = {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  errors: Record<string, string>
}

function ContactForm({ formData, setFormData, errors }: ContactFormProps) {
  return (
    <div className="space-y-16">
      <p className="text-xs text-muted-foreground">
        Please enter your email or phone number to reset your password.
      </p>

      <form>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="contact">
              Email Address or Phone Number
            </FieldLabel>
            <Input
              id="contact"
              type="text"
              placeholder="Email or Phone Number"
              value={formData.contact}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, contact: e.target.value }))
              }
            />
            {errors.contact && (
              <p className="text-sm text-red-500">{errors.contact}</p>
            )}
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}

// ── OTPForm ──────────────────────────────────────────────────────────────────

type OTPFormProps = {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  errors: Record<string, string>
}

function OTPForm({ formData, setFormData, errors }: OTPFormProps) {
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

    setFormData((prev) => ({
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
      <h1 className="text-lg font-bold">Check your email</h1>
      <p className="text-xs text-muted-foreground">
        We sent a reset link to alpha...@gmai.com enter 6 digit code that
        mentioned in the email
      </p>
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

// ── PasswordForm ─────────────────────────────────────────────────────────────

type PasswordFormProps = {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  errors: Record<string, string>
}

function PasswordForm({ formData, setFormData, errors }: PasswordFormProps) {
  return (
    <form className="space-y-4">
      <h1 className="text-xl font-bold">Set a new password</h1>
      <p className="text-sm text-muted-foreground">
        Create a new password. Ensure it differs from from previous ones for
        security.
      </p>
      <FieldGroup>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input
            type="password"
            value={formData.new_password}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                new_password: e.target.value,
              }))
            }
          />
          {errors.new_password && (
            <p className="text-sm text-red-500">{errors.new_password}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input
            type="password"
            value={formData.confirm_password}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                confirm_password: e.target.value,
              }))
            }
          />
          {errors.confirm_password && (
            <p className="text-sm text-red-500">{errors.confirm_password}</p>
          )}
        </Field>
      </FieldGroup>
    </form>
  )
}

// ── Success ──────────────────────────────────────────────────────────────────

function Success() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <div>
        
      </div>
      <CircleCheck className="size-16 text-green-500" />

      <h1 className="text-xl font-bold">Successful</h1>
      <p className="text-muted-foreground">
        Congratulations! Your password has been changed. Click to confirm to
        login
      </p>
    </div>
  )
}

// ── ForgotPasswordView ───────────────────────────────────────────────────────

export { ContactForm, OTPForm, PasswordForm, Success }

export default function ForgotPasswordView() {
  const vm = useForgotPasswordViewModel()

  const isSuccess = vm.currentStep >= forgotPasswordSteps.length - 1
  const CurrentForm = forgotPasswordSteps[
    Math.min(vm.currentStep, forgotPasswordSteps.length - 1)
  ].Content

  return (
    <div className="space-y-2 text-center">
      <div className="py-8">
        <CurrentForm
          formData={vm.formData}
          setFormData={vm.setFormData}
          errors={vm.errors}
          setErrors={vm.setErrors}
        />
      </div>

      <Button className="mt-6 w-full" size="lg" onClick={isSuccess ? vm.finish : vm.next}>
        {isSuccess ? "Go to Login" : "Confirm"}
      </Button>
    </div>
  )
}
