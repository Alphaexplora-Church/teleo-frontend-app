import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Props = {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  errors: Record<string, string>
}

export default function UsernameForm({ formData, setFormData, errors }: Props) {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                username: e.target.value,
              }))
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
