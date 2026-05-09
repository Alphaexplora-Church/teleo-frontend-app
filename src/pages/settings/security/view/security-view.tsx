import { useEffect, useRef } from "react"
import { Pencil, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { FieldKey } from "../model/security-field-keys"
import {
  fieldConfig,
  successMessages,
  securityContent,
} from "../model/security-field-keys"
import { useSecurityViewModel } from "../viewmodel/use-security-view-model"

// ─── OtpStep ──────────────────────────────────────────────────────────────────

type OtpStepProps = {
  fieldKey: FieldKey
  otp: string
  setOtp: (otp: string) => void
  errors: Record<string, string>
  otpTimeLeft: number
  setOtpTimeLeft: (t: number) => void
  onConfirm: () => void
}

export function OtpStep({
  fieldKey,
  otp,
  setOtp,
  errors,
  otpTimeLeft,
  setOtpTimeLeft,
  onConfirm,
}: OtpStepProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const destination = fieldConfig[fieldKey].destination

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (otpTimeLeft <= 0) return
    const timer = setInterval(() => setOtpTimeLeft(otpTimeLeft - 1), 1000)
    return () => clearInterval(timer)
  }, [otpTimeLeft, setOtpTimeLeft])

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
    if (otpTimeLeft > 0) return
    setOtpTimeLeft(300)
  }

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

      {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}

      <Button size="lg" className="w-full" onClick={onConfirm}>
        Confirm
      </Button>

      <button
        type="button"
        onClick={resend}
        disabled={otpTimeLeft > 0}
        className="text-sm text-muted-foreground disabled:opacity-50"
      >
        {otpTimeLeft > 0 ? `Resend code within ${otpTimeLeft}s` : "Resend code"}
      </button>
    </div>
  )
}

// ─── FormStep ─────────────────────────────────────────────────────────────────

type FormStepProps = {
  fieldKey: FieldKey
  oldValue: string
  newValue: string
  setOldValue: (v: string) => void
  setNewValue: (v: string) => void
  errors: Record<string, string>
  onSave: () => void
}

export function FormStep({
  fieldKey,
  oldValue,
  newValue,
  setOldValue,
  setNewValue,
  errors,
  onSave,
}: FormStepProps) {
  const config = fieldConfig[fieldKey]

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
        {errors.oldValue && (
          <p className="text-sm text-red-500">{errors.oldValue}</p>
        )}
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
        {errors.newValue && (
          <p className="text-sm text-red-500">{errors.newValue}</p>
        )}
      </div>

      <Button size="lg" className="mt-2 w-full" onClick={onSave}>
        Save changes
      </Button>
    </div>
  )
}

// ─── SuccessStep ──────────────────────────────────────────────────────────────

type SuccessStepProps = {
  fieldKey: FieldKey
  onConfirm: () => void
}

export function SuccessStep({ fieldKey, onConfirm }: SuccessStepProps) {
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

// ─── EditModal ────────────────────────────────────────────────────────────────

type EditModalProps = {
  fieldKey: FieldKey
  onClose: () => void
  vm: ReturnType<typeof useSecurityViewModel>
}

function EditModal({ fieldKey, onClose, vm }: EditModalProps) {
  const stepTitles: Record<string, string> = {
    otp: `Verify ${fieldKey}`,
    form: `Update ${fieldKey}`,
    success: "Update Successful",
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="mx-4 w-[calc(100vw-2rem)] max-w-sm rounded-xl bg-background p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">{stepTitles[vm.step]}</h2>

        {vm.step === "otp" && (
          <OtpStep
            fieldKey={fieldKey}
            otp={vm.otp}
            setOtp={vm.setOtp}
            errors={vm.errors}
            otpTimeLeft={vm.otpTimeLeft}
            setOtpTimeLeft={vm.setOtpTimeLeft}
            onConfirm={vm.confirmOtp}
          />
        )}

        {vm.step === "form" && (
          <FormStep
            fieldKey={fieldKey}
            oldValue={vm.oldValue}
            newValue={vm.newValue}
            setOldValue={vm.setOldValue}
            setNewValue={vm.setNewValue}
            errors={vm.errors}
            onSave={vm.saveChanges}
          />
        )}

        {vm.step === "success" && (
          <SuccessStep
            fieldKey={fieldKey}
            onConfirm={vm.handleSuccessConfirm}
          />
        )}
      </div>
    </div>
  )
}

// ─── SecurityView ─────────────────────────────────────────────────────────────

export default function SecurityView() {
  const vm = useSecurityViewModel()

  return (
    <div className="space-y-4">
      {securityContent.map((item) => (
        <div key={item.label}>
          <label className="text-[14px] font-semibold">{item.label}</label>
          <div className="relative mt-1">
            <Input
              type="text"
              placeholder={item.placeholder}
              readOnly
              className="block w-full rounded-md border-gray-300 pr-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {vm.isEditing && (
              <button
                type="button"
                aria-label={`Edit ${item.label}`}
                onClick={() => vm.openModal(item.label)}
                className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ))}

      <Button size="lg" className="mt-4 w-full" onClick={vm.toggleEditing}>
        {vm.isEditing ? "Save Changes" : "Edit Profile"}
      </Button>

      {vm.activeField && (
        <EditModal
          fieldKey={vm.activeField}
          onClose={vm.closeModal}
          vm={vm}
        />
      )}
    </div>
  )
}
