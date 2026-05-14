import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import PageHeader from "@/components/page-header"

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
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function handleEditProfile() {
    setDraft(userData)
    setIsEditing(true)
  }

  function handleSaveChanges() {
    setIsDialogOpen(true)
  }

  function handleConfirmSave() {
    // Persist draft back to the "database" (state)
    setUserData(draft)
    setIsEditing(false)
    setIsDialogOpen(false)
  }

  return (
    <div>
      <PageHeader title="Account" backTo="/settings" />
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
                  isEditing &&
                  setDraft((prev) => ({ ...prev, pronouns: option }))
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to save your profile changes?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSave}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
