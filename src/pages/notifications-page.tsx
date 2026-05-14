import { useState } from "react"
import PageHeader from "@/components/page-header"

type ToggleProps = {
  enabled: boolean
  onToggle: () => void
}

function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        enabled ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
          enabled ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  )
}

type NotificationRowProps = {
  label: string
  description: string
}

function NotificationRow({ label, description }: NotificationRowProps) {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Toggle enabled={enabled} onToggle={() => setEnabled((prev) => !prev)} />
    </div>
  )
}

export default function NotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" backTo="/settings" />
      <div className="space-y-1 divide-y">
        <NotificationRow
          label="Push Notifications"
          description="Receive push notifications"
        />
        <NotificationRow
          label="Push Notifications"
          description="Receive push notifications"
        />
      </div>
    </div>
  )
}
