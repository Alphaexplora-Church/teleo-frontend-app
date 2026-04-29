import { CircleCheck } from "lucide-react"

export default function Success() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <CircleCheck className="size-16 text-green-500" />

      <h1 className="text-xl font-bold">Successful</h1>
      <p className="text-sm text-muted-foreground">
        Congratulations! Your password has been changed. Click to confirm to
        login
      </p>
    </div>
  )
}
