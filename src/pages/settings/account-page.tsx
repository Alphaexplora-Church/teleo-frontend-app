import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Simulated database record
const initialUserData = {
  username: "@juandelacruz",
  firstName: "Juan",
  lastName: "de la Cruz",
  birthdate: "01/25/1999",
  pronouns: "He/Him",
}

const pronounOptions = ["He/Him", "She/Her", "They/Them"]

const fields: { label: string; key: keyof typeof initialUserData }[] = [
  { label: "Username", key: "username" },
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Birthdate", key: "birthdate" },
]

export default function AccountPage() {
  const [userData, setUserData] = useState(initialUserData)
  const [draft, setDraft] = useState(initialUserData)
  const [isEditing, setIsEditing] = useState(false)

  function handleEditProfile() {
    setDraft(userData)
    setIsEditing(true)
  }

  function handleSaveChanges() {
    // Persist draft back to the "database" (state)
    setUserData(draft)
    setIsEditing(false)
  }

  return (
    <div>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-[14px] font-semibold">{field.label}</label>
            <Input
              type="text"
              value={isEditing ? draft[field.key] : userData[field.key]}
              disabled={!isEditing}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              className="mt-1 block w-full rounded-md shadow-sm sm:text-sm"
            />
          </div>
        ))}

        <label className="text-[14px] font-semibold">Pronouns</label>
        <div className="flex gap-2 font-medium">
          {pronounOptions.map((option) => {
            const isSelected = isEditing
              ? draft.pronouns === option
              : userData.pronouns === option

            return (
              <Button
                key={option}
                variant={isSelected ? "default" : "secondary"}
                disabled={!isEditing}
                onClick={() =>
                  isEditing && setDraft((prev) => ({ ...prev, pronouns: option }))
                }
              >
                {option}
              </Button>
            )
          })}
        </div>
      </div>

      <Button
        size="lg"
        className="mt-4 w-full"
        onClick={isEditing ? handleSaveChanges : handleEditProfile}
      >
        {isEditing ? "Save Changes" : "Edit Profile"}
      </Button>
    </div>
  )
}
