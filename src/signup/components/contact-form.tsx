import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { FormData } from "../model/form-schema"

type Errors = Record<string, string>

type Props = {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  errors: Errors
  setErrors: React.Dispatch<React.SetStateAction<Errors>>
}

export default function ContactForm({
  formData,
  setFormData,
  errors,
  setErrors,
}: Props) {
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

              setFormData((prev) => ({
                ...prev,
                email: value,
              }))

              // ✅ clear error while typing
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

              setFormData((prev) => ({
                ...prev,
                phone: value,
              }))

              // ✅ clear error while typing
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
