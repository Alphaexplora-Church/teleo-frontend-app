import { useState } from "react"
import Picker from "react-mobile-picker"

type Props = {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  errors: Record<string, string>
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const days = Array.from({ length: 31 }, (_, i) => i + 1)
const years = Array.from({ length: 100 }, (_, i) => 2024 - i)

export default function BirthdayForm({ setFormData, errors }: Props) {
  const [value, setValue] = useState({
    month: "September",
    day: 17,
    year: 2021,
  })

  const handleChange = (next: any) => {
    setValue(next)

    const formatted = `${next.year}-${String(
      months.indexOf(next.month) + 1
    ).padStart(2, "0")}-${String(next.day).padStart(2, "0")}`

    setFormData((prev: any) => ({
      ...prev,
      birthday: formatted,
    }))
  }

  return (
    <div>
      <Picker value={value} onChange={handleChange}>
        <Picker.Column name="month">
          {months.map((m) => (
            <Picker.Item key={m} value={m}>
              {m}
            </Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column name="day">
          {days.map((d) => (
            <Picker.Item key={d} value={d}>
              {d}
            </Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column name="year">
          {years.map((y) => (
            <Picker.Item key={y} value={y}>
              {y}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>

      {errors.birthday && (
        <p className="text-sm text-red-500">{errors.birthday}</p>
      )}
    </div>
  )
}
