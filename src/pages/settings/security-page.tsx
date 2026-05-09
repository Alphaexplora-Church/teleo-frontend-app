import { useEffect, useRef, useState } from "react"
import { Pencil, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router"

// ─── Types ────────────────────────────────────────────────────────────────────

type FieldKey = "Email" | "Phone Number" | "Password"
type Step = "otp" | "form" | "success"

// ─── OTP Step ─────────────────────────────────────────────────────────────────

function OtpStep({
  fieldKey,
  onConfirm,
}: {
  fieldKey: FieldKey
  onConfirm: () => void
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(300)

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleChange = (i: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return
    const digits = otp.split("")
    digits[i] = value
    const updated = digits.join("").padEnd(6, "").slice(0, 6)
    setOtp(updated)
    if (value && i < 5) inputsRef.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
    }
  }

  const resend = () => {
    if (timeLeft > 0) return
    setTimeLeft(300)
  }

  const destination =
    fieldKey === "Email"
      ? "email"
      : fieldKey === "Phone Number"
        ? "phone number"
        : "email"

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        Enter the six-digit code sent to your old {destination}
      </p>

      <div className="flex gap-2">
        {[...Array(6)].map((_, i) => (
          <Input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el
            }}
            maxLength={1}
            className="h-12 w-12 text-center text-lg"
            value={otp[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
          />
        ))}
      </div>

      <Button size="lg" className="w-full" onClick={onConfirm}>
        Confirm
      </Button>

      <button
        type="button"
        onClick={resend}
        disabled={timeLeft > 0}
        className="text-sm text-muted-foreground disabled:opacity-50"
      >
        {timeLeft > 0 ? `Resend code within ${timeLeft}s` : "Resend code"}
      </button>
    </div>
  )
}

// ─── Form Step ────────────────────────────────────────────────────────────────

const fieldConfig: Record<
  FieldKey,
  {
    oldLabel: string
    newLabel: string
    oldPlaceholder: string
    newPlaceholder: string
    inputType: string
  }
> = {
  Email: {
    oldLabel: "Old Email",
    newLabel: "New Email",
    oldPlaceholder: "Enter old email",
    newPlaceholder: "Enter new email",
    inputType: "email",
  },
  "Phone Number": {
    oldLabel: "Old Phone Number",
    newLabel: "New Phone Number",
    oldPlaceholder: "Enter old phone number",
    newPlaceholder: "Enter new phone number",
    inputType: "tel",
  },
  Password: {
    oldLabel: "Old Password",
    newLabel: "New Password",
    oldPlaceholder: "Enter old password",
    newPlaceholder: "Enter new password",
    inputType: "password",
  },
}

function FormStep({
  fieldKey,
  onSave,
}: {
  fieldKey: FieldKey
  onSave: () => void
}) {
  const config = fieldConfig[fieldKey]
  const [oldValue, setOldValue] = useState("")
  const [newValue, setNewValue] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-[14px] font-semibold">{config.oldLabel}</label>
        <Input
          type={config.inputType}
          placeholder={config.oldPlaceholder}
          value={oldValue}
          onChange={(e) => setOldValue(e.target.value)}
          className="mt-1"
        />
      </div>

      <div>
        <label className="text-[14px] font-semibold">{config.newLabel}</label>
        <Input
          type={config.inputType}
          placeholder={config.newPlaceholder}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="mt-1"
        />
      </div>

      <Button size="lg" className="mt-2 w-full" onClick={onSave}>
        Save changes
      </Button>
    </div>
  )
}

// ─── Success Step ─────────────────────────────────────────────────────────────

const successMessages: Record<FieldKey, string> = {
  Email: "Congratulations your email has been updated.",
  "Phone Number": "Congratulations your phone number has been updated.",
  Password: "Congratulations your password has been updated.",
}

function SuccessStep({
  fieldKey,
  onConfirm,
}: {
  fieldKey: FieldKey
  onConfirm: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-500" />
      <div>
        <p className="text-lg font-semibold">Successful</p>
        <span className="text-sm text-muted-foreground">
          {successMessages[fieldKey]}
        </span>
      </div>
      <Button size="lg" className="w-full" onClick={onConfirm}>
        Confirm
      </Button>
    </div>
  )
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditModal({
  fieldKey,
  onClose,
}: {
  fieldKey: FieldKey
  onClose: () => void
}) {
  const [step, setStep] = useState<Step>("otp")
  const navigate = useNavigate()

  const stepTitles: Record<Step, string> = {
    otp: `Verify ${fieldKey}`,
    form: `Update ${fieldKey}`,
    success: "Update Successful",
  }

  const handleSuccessConfirm = () => {
    onClose()
    navigate("/settings")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="w-full max-w-sm rounded-xl bg-background p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">{stepTitles[step]}</h2>

        {step === "otp" && (
          <OtpStep fieldKey={fieldKey} onConfirm={() => setStep("form")} />
        )}

        {step === "form" && (
          <FormStep fieldKey={fieldKey} onSave={() => setStep("success")} />
        )}

        {step === "success" && (
          <SuccessStep fieldKey={fieldKey} onConfirm={handleSuccessConfirm} />
        )}
      </div>
    </div>
  )
}

// ─── SecurityPage ─────────────────────────────────────────────────────────────

export default function SecurityPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeField, setActiveField] = useState<FieldKey | null>(null)

  const content: { label: FieldKey; placeholder: string }[] = [
    { label: "Email", placeholder: "juandelacruz1999@yahoo.com" },
    { label: "Phone Number", placeholder: "+63 | 09123467485" },
    { label: "Password", placeholder: "********" },
  ]

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev)
  }

  return (
    <div className="space-y-4">
      {content.map((item) => (
        <div key={item.label}>
          <label className="text-[14px] font-semibold">{item.label}</label>
          <div className="relative mt-1">
            <Input
              type="text"
              placeholder={item.placeholder}
              readOnly
              className="block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {isEditing && (
              <button
                type="button"
                aria-label={`Edit ${item.label}`}
                onClick={() => setActiveField(item.label)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ))}

      <Button size="lg" className="mt-4 w-full" onClick={handleEditToggle}>
        {isEditing ? "Save Changes" : "Edit Profile"}
      </Button>

      {activeField && (
        <EditModal
          fieldKey={activeField}
          onClose={() => setActiveField(null)}
        />
      )}
    </div>
  )
}
