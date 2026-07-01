import { useState } from "react"
import PageHeader from "@/components/page-header"
import { ROUTES } from "@/lib/routes"

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
      className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
        enabled ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
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
        <p className="text-[13px] font-semibold">{label}</p>
        <p className="text-[10px] text-muted-foreground">{description}</p>
      </div>
      <Toggle enabled={enabled} onToggle={() => setEnabled((prev) => !prev)} />
    </div>
  )
}

export default function NotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" backTo={ROUTES.settings} />
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
