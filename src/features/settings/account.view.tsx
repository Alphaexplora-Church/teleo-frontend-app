import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ROUTES } from "@/lib/routes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import PageHeader from "@/components/page-header"
import { useAccountViewModel } from "./useAccount"

export default function AccountPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const vm = useAccountViewModel()

  return (
    <div className="flex h-[calc(100svh-5rem)] flex-col">
      <PageHeader title="Account" backTo={ROUTES.settings} />
      <div className="space-y-2">
        {/* Photo upload */}
        <div className="flex flex-col items-center gap-1">
          <div
            className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border-2 border-input bg-muted"
            onClick={() => vm.isEditing && fileInputRef.current?.click()}
            title={vm.isEditing ? "Change photo" : undefined}
          >
            {vm.displayPhoto ? (
              <img
                src={vm.displayPhoto}
                alt="Profile photo"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            )}
            {vm.isEditing && (
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
            onChange={(e) => vm.handlePhotoChange(e.target.files?.[0])}
            aria-label="Upload profile photo"
          />
        </div>

        {vm.fields.map((field) => (
          <div key={field.key}>
            <label className="text-[13px] font-semibold">{field.label}</label>
            <Input
              type="text"
              value={
                vm.isEditing ? vm.draft[field.key] : vm.userData[field.key]
              }
              disabled={!vm.isEditing}
              onChange={(e) =>
                vm.setDraft((prev) => ({
                  ...prev,
                  [field.key]: e.target.value,
                }))
              }
              className="mt-0.5 block w-full rounded-md shadow-sm sm:text-sm"
            />
          </div>
        ))}

        <div>
          <label className="text-[13px] font-semibold">Pronouns</label>
          <div className="mt-0.5 flex gap-2 font-medium">
            {vm.pronounOptions.map((option) => {
              const isSelected = vm.isEditing
                ? vm.draft.pronouns === option
                : vm.userData.pronouns === option

              return (
                <Button
                  key={option}
                  variant={isSelected ? "default" : "secondary"}
                  disabled={!vm.isEditing}
                  onClick={() =>
                    vm.isEditing &&
                    vm.setDraft((prev) => ({ ...prev, pronouns: option }))
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
        onClick={vm.isEditing ? vm.handleSaveChanges : vm.handleEditProfile}
      >
        {vm.isEditing ? "Save Changes" : "Edit Profile"}
      </Button>

      <Dialog open={vm.isDialogOpen} onOpenChange={vm.setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to save your profile changes?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => vm.setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={vm.handleConfirmSave}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
