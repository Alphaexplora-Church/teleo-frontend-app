import { Mars, Venus, VenusAndMars } from "lucide-react"

type Props = {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  errors: Record<string, string>
}

export default function GenderForm({ formData, setFormData, errors }: Props) {
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
          onClick={() =>
            setFormData((prev: any) => ({ ...prev, gender: "male" }))
          }
        >
          <Mars className="size-16 text-white" />
        </button>

        <button
          type="button"
          className={style("both")}
          onClick={() =>
            setFormData((prev: any) => ({ ...prev, gender: "both" }))
          }
        >
          <VenusAndMars className="size-16 text-white" />
        </button>

        <button
          type="button"
          className={style("female")}
          onClick={() =>
            setFormData((prev: any) => ({ ...prev, gender: "female" }))
          }
        >
          <Venus className="size-16 text-white" />
        </button>
      </div>

      {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
    </div>
  )
}
