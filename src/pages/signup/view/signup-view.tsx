import { useEffect, useRef, useState } from "react"
import { Plus, Mars, Venus, VenusAndMars, Eye, EyeOff } from "lucide-react"
import Picker from "react-mobile-picker"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { signupSteps } from "../model/signup-steps"
import { useSignupViewModel } from "../viewmodel/use-signup-view-model"
import type { FormData } from "../model/form-schema"

type Errors = Record<string, string>
type SetFormData = React.Dispatch<React.SetStateAction<FormData>>
type SetErrors = React.Dispatch<React.SetStateAction<Errors>>

// ─── AnimatedSplash ───────────────────────────────────────────────────────────

type SplashProps = {
  show: boolean
  text: string
  onDone?: () => void
}

export function AnimatedSplash({ show, text, onDone }: SplashProps) {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    if (!show) return

    const t0 = setTimeout(() => setFade(false), 0)
    const t1 = setTimeout(() => setFade(true), 1000)
    const t2 = setTimeout(() => onDone?.(), 3000)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [show, onDone])

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-blue-500 text-4xl text-white transition ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      {text}
    </div>
  )
}

// ─── NameForm ─────────────────────────────────────────────────────────────────

type NameFormProps = {
  formData: FormData
  setFormData: SetFormData
  errors: Errors
}

export function NameForm({ formData, setFormData, errors }: NameFormProps) {
  return (
    <form className="space-y-4">
      <FieldGroup>
        <Field>
          <Input
            placeholder="First Name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, first_name: e.target.value }))
            }
          />
          {errors.first_name && (
            <p className="text-sm text-red-500">{errors.first_name}</p>
          )}
        </Field>

        <Field>
          <Input
            placeholder="Last Name"
            value={formData.last_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, last_name: e.target.value }))
            }
          />
          {errors.last_name && (
            <p className="text-sm text-red-500">{errors.last_name}</p>
          )}
        </Field>
      </FieldGroup>
    </form>
  )
}

// ─── BirthdayForm ─────────────────────────────────────────────────────────────

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]
const days = Array.from({ length: 31 }, (_, i) => i + 1)
const years = Array.from({ length: 100 }, (_, i) => 2024 - i)

type PickerValue = { month: string; day: number; year: number }

type BirthdayFormProps = {
  formData: FormData
  setFormData: SetFormData
  errors: Errors
}

export function BirthdayForm({ setFormData, errors }: BirthdayFormProps) {
  const [value, setValue] = useState<PickerValue>({ month: "September", day: 17, year: 2021 })

  const handleChange = (next: PickerValue) => {
    setValue(next)

    const formatted = `${next.year}-${String(
      months.indexOf(next.month) + 1
    ).padStart(2, "0")}-${String(next.day).padStart(2, "0")}`

    setFormData((prev) => ({ ...prev, birthday: formatted }))
  }

  return (
    <div>
      <Picker value={value} onChange={handleChange}>
        <Picker.Column name="month">
          {months.map((m) => (
            <Picker.Item key={m} value={m}>{m}</Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column name="day">
          {days.map((d) => (
            <Picker.Item key={d} value={d}>{d}</Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column name="year">
          {years.map((y) => (
            <Picker.Item key={y} value={y}>{y}</Picker.Item>
          ))}
        </Picker.Column>
      </Picker>

      {errors.birthday && (
        <p className="text-sm text-red-500">{errors.birthday}</p>
      )}
    </div>
  )
}

// ─── GenderForm ───────────────────────────────────────────────────────────────

type GenderFormProps = {
  formData: FormData
  setFormData: SetFormData
  errors: Errors
}

export function GenderForm({ formData, setFormData, errors }: GenderFormProps) {
  const base =
    "flex size-24 items-center justify-center rounded-full border-2 transition"

  const style = (val: string) =>
    `${base} ${
      formData.gender === val
        ? "border-primary bg-primary"
        : "border-gray-300 bg-gray-500"
    }`

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className={style("male")}
          onClick={() => setFormData((prev) => ({ ...prev, gender: "male" }))}
        >
          <Mars className="size-16 text-white" />
        </button>

        <button
          type="button"
          className={style("both")}
          onClick={() => setFormData((prev) => ({ ...prev, gender: "both" }))}
        >
          <VenusAndMars className="size-16 text-white" />
        </button>

        <button
          type="button"
          className={style("female")}
          onClick={() => setFormData((prev) => ({ ...prev, gender: "female" }))}
        >
          <Venus className="size-16 text-white" />
        </button>
      </div>

      {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
    </div>
  )
}

// ─── UsernameForm ─────────────────────────────────────────────────────────────

type UsernameFormProps = {
  formData: FormData
  setFormData: SetFormData
  errors: Errors
}

export function UsernameForm({ formData, setFormData, errors }: UsernameFormProps) {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}
        </Field>
      </FieldGroup>
    </form>
  )
}

// ─── LocationForm ─────────────────────────────────────────────────────────────

type LocationFormProps = {
  formData: FormData
  setFormData: SetFormData
  errors: Errors
}

export function LocationForm({ formData, setFormData, errors }: LocationFormProps) {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input
            placeholder="Select your area"
            value={formData.area}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, area: e.target.value }))
            }
          />
          {errors.area && <p className="text-sm text-red-500">{errors.area}</p>}
        </Field>
      </FieldGroup>
    </form>
  )
}

// ─── ContactForm ──────────────────────────────────────────────────────────────

type ContactFormProps = {
  formData: FormData
  setFormData: SetFormData
  errors: Errors
  setErrors: SetErrors
}

export function ContactForm({
  formData,
  setFormData,
  errors,
  setErrors,
}: ContactFormProps) {
  return (
    <form className="space-y-4">
      <FieldGroup>
        <FieldLabel>Email</FieldLabel>
        <Field>
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              const value = e.target.value
              setFormData((prev) => ({ ...prev, email: value }))
              if (errors.email) {
                setErrors((prev) => {
                  const copy = { ...prev }
                  delete copy.email
                  return copy
                })
              }
            }}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </Field>

        <FieldLabel>Phone</FieldLabel>
        <Field>
          <Input
            type="tel"
            placeholder="+63 123 456 7890"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value
              setFormData((prev) => ({ ...prev, phone: value }))
              if (errors.phone) {
                setErrors((prev) => {
                  const copy = { ...prev }
                  delete copy.phone
                  return copy
                })
              }
            }}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </Field>
      </FieldGroup>
    </form>
  )
}

// ─── PasswordForm ─────────────────────────────────────────────────────────────

type PasswordFormProps = {
  formData: FormData
  setFormData: SetFormData
  errors: Errors
}

export function PasswordForm({ formData, setFormData, errors }: PasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <form className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              className="pr-10"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirm_password}
              className="pr-10"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, confirm_password: e.target.value }))
              }
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirm_password && (
            <p className="text-sm text-red-500">{errors.confirm_password}</p>
          )}
        </Field>

        <div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.terms}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, terms: e.target.checked }))
              }
            />

            <label className="ml-2 text-sm text-gray-600">
              I accept the{" "}
              <Drawer>
                <DrawerTrigger asChild>
                  <button className="text-blue-500 underline">
                    terms and conditions
                  </button>
                </DrawerTrigger>

                <DrawerContent className="max-h-[80vh] overflow-y-auto p-4">
                  <DrawerHeader>
                    <DrawerTitle>Terms</DrawerTitle>
                  </DrawerHeader>
                  <p>Lorem ipsum...</p>
                </DrawerContent>
              </Drawer>
            </label>
          </div>

          {errors.terms && (
            <p className="mt-2 text-sm text-red-500">{errors.terms}</p>
          )}
        </div>
      </FieldGroup>
    </form>
  )
}

// ─── OTPForm ──────────────────────────────────────────────────────────────────

type OTPFormProps = {
  formData: FormData
  setFormData: SetFormData
  errors: Errors
}

export function OTPForm({ formData, setFormData, errors }: OTPFormProps) {
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
    console.log("resend OTP")
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-2">
        {[...Array(6)].map((_, i) => (
          <Input
            key={i}
            ref={(el) => { inputsRef.current[i] = el }}
            maxLength={1}
            className="h-12 w-12 text-center"
            value={(formData.otp ?? "")[i] || ""}
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

// ─── AvatarUploadForm ─────────────────────────────────────────────────────────

type AvatarUploadFormProps = {
  formData: FormData
  setFormData: SetFormData
}

export function AvatarUploadForm({ formData, setFormData }: AvatarUploadFormProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (file?: File) => {
    if (!file) return
    setFormData((prev) => ({ ...prev, avatar_upload: file }))
    setPreview(URL.createObjectURL(file))
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className="flex flex-col items-center">
      <label className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border">
        {preview ? (
          <img src={preview} className="h-full w-full object-cover" />
        ) : (
          <Plus />
        )}
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>

      {formData.avatar_upload && (
        <p className="mt-2 text-sm text-green-500">Image selected</p>
      )}
    </div>
  )
}

// ─── SignupView ───────────────────────────────────────────────────────────────

export default function SignupView() {
  const vm = useSignupViewModel()

  const CurrentStep = signupSteps[vm.currentStep]
  const CurrentForm = CurrentStep.Content

  return (
    <>
      {/* Splash */}
      <AnimatedSplash
        show={vm.showSplash}
        text="Hello!"
        onDone={() => vm.setShowSplash(false)}
      />

      {/* Success */}
      {vm.showSuccess && (
        <AnimatedSplash show text="Your account is ready!" onDone={vm.finish} />
      )}

      {/* Main */}
      {!vm.showSplash && !vm.showSuccess && (
        <div className="space-y-8 text-center">
          <h1 className="text-[35px] font-bold" >{CurrentStep.title}</h1>
          <p className="text-xl">{CurrentStep.description}</p>

          <div className="py-8">
            <CurrentForm
              formData={vm.formData}
              setFormData={vm.setFormData}
              errors={vm.errors}
              setErrors={vm.setErrors}
            />
          </div>

          <Button size="lg" className="mt-6 w-full" onClick={vm.next}>
            {CurrentStep.buttonText
              ? CurrentStep.buttonText
              : vm.currentStep === signupSteps.length - 1
                ? vm.formData.avatar_upload
                  ? "Finish"
                  : "Upload"
                : "Next"}
          </Button>
        </div>
      )}
    </>
  )
}
