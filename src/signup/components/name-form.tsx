import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Props = {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  errors: Record<string, string>
}

export default function NameForm({ formData, setFormData, errors }: Props) {
  return (
    <form className="space-y-4">
      <FieldGroup>
        <Field>
          <Input
            placeholder="First Name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                first_name: e.target.value,
              }))
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
              setFormData((prev: any) => ({
                ...prev,
                last_name: e.target.value,
              }))
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
