import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Props = {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  errors: Record<string, string>
}

export default function LocationForm({ formData, setFormData, errors }: Props) {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input
            placeholder="Select your area"
            value={formData.area}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                area: e.target.value,
              }))
            }
          />
          {errors.area && <p className="text-sm text-red-500">{errors.area}</p>}
        </Field>
      </FieldGroup>
    </form>
  )
}
