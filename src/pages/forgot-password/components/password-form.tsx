import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { FormData } from "../model/form-schema"

type Props = {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  errors: Record<string, string>
}

export default function PasswordForm({ formData, setFormData, errors }: Props) {
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
