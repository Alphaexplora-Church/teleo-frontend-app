import { useMemo, useState } from "react"

export type AccountUserData = {
  username: string
  firstName: string
  lastName: string
  birthdate: string
  pronouns: string
  photo: string
}

export const pronounOptions = ["He/Him", "She/Her", "They/Them"]

export const fields: { label: string; key: keyof AccountUserData }[] = [
  { label: "Username", key: "username" },
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" },
  { label: "Birthdate", key: "birthdate" },
]

const initialUserData: AccountUserData = {
  username: "@juandelacruz",
  firstName: "Juan",
  lastName: "de la Cruz",
  birthdate: "01/25/1999",
  pronouns: "He/Him",
  photo: "",
}

export function useAccountViewModel() {
  const [userData, setUserData] = useState<AccountUserData>(initialUserData)
  const [draft, setDraft] = useState<AccountUserData>(initialUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const displayPhoto = useMemo(
    () => (isEditing ? draft.photo : userData.photo),
    [draft.photo, isEditing, userData.photo]
  )

  const handleEditProfile = () => {
    setDraft(userData)
    setIsEditing(true)
  }

  const handleSaveChanges = () => setIsDialogOpen(true)

  const handleConfirmSave = () => {
    setUserData(draft)
    setIsEditing(false)
    setIsDialogOpen(false)
  }

  const handlePhotoChange = (file?: File) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setDraft((prev) => ({ ...prev, photo: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  return {
    userData,
    draft,
    isEditing,
    isDialogOpen,
    displayPhoto,
    fields,
    pronounOptions,
    handleEditProfile,
    handleSaveChanges,
    handleConfirmSave,
    handlePhotoChange,
    setDraft,
    setIsDialogOpen,
  }
}
