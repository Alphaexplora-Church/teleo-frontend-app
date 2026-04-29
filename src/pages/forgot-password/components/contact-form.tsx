import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { FormData } from "../model/form-schema"

type Props = {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  errors: Record<string, string>
}

export default function ContactForm({ formData, setFormData, errors }: Props) {
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
