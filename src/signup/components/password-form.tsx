import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

type Props = {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  errors: Record<string, string>
}

export default function PasswordForm({ formData, setFormData, errors }: Props) {
  return (
    <form className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Confirm Password</FieldLabel>
          <Input
            type="password"
            value={formData.confirm_password}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                confirm_password: e.target.value,
              }))
            }
          />
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
                setFormData((prev: any) => ({
                  ...prev,
                  terms: e.target.checked,
                }))
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
