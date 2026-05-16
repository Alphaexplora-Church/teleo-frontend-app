import { useRef, useState } from "react"
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
  photo: "",
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
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setDraft((prev) => ({ ...prev, photo: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const displayPhoto = isEditing ? draft.photo : userData.photo

  return (
    <div className="flex h-[calc(100svh-5rem)] flex-col">
      <PageHeader title="Account" backTo="/settings" />
      <div className="space-y-2">
        {/* Photo upload */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-full border-2 border-input bg-muted"
            onClick={() => isEditing && fileInputRef.current?.click()}
            title={isEditing ? "Change photo" : undefined}
          >
            {displayPhoto ? (
              <img
                src={displayPhoto}
                alt="Profile photo"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs font-medium text-white">
                Change
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
            aria-label="Upload profile photo"
          />
        </div>

        {fields.map((field) => (
          <div key={field.key}>
            <label className="text-[13px] font-semibold">{field.label}</label>
            <Input
              type="text"
              value={isEditing ? draft[field.key] : userData[field.key]}
              disabled={!isEditing}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))
              }
              className="mt-0.5 block w-full rounded-md shadow-sm sm:text-sm"
            />
          </div>
        ))}

        <div>
          <label className="text-[13px] font-semibold">Pronouns</label>
          <div className="mt-0.5 flex gap-2 font-medium">
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
      </div>

      <Button
        size="lg"
        className="mt-auto w-full"
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
