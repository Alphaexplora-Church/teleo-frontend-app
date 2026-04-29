import { useEffect, useState } from "react"
import { Plus } from "lucide-react"

type Props = {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
}

export default function AvatarUploadForm({ formData, setFormData }: Props) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (file?: File) => {
    if (!file) return

    setFormData((prev: any) => ({
      ...prev,
      avatar_upload: file,
    }))

    setPreview(URL.createObjectURL(file))
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className="flex flex-col items-center">
      <label className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border">
        {preview ? (
          <img src={preview} className="h-full w-full object-cover" />
        ) : (
          <Plus />
        )}

        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </label>

      {formData.avatar_upload && (
        <p className="mt-2 text-sm text-green-500">Image selected</p>
      )}
    </div>
  )
}
