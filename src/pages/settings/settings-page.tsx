import {
  Bell,
  Shield,
  User,
  FileText,
  AlertTriangle,
  ChevronRight,
} from "lucide-react"
import { Link } from "react-router"

export default function SettingsPage() {
  const content = [
    {
      link: "/account",
      icon: <User />,
      title: "Your account",
      description: "Edit your account information.",
    },
    {
      link: "/security",
      icon: <Shield />,
      title: "Security and Account Access",
      description: "Manage your account's security.",
    },
    {
      link: "/notifications",
      icon: <Bell />,
      title: "Manage Notifications",
      description: "Manage notifications recieved.",
    },
    {
      link: "/report",
      icon: <AlertTriangle />,
      title: "Report an Issue",
      description: "Report users.",
    },
    {
      link: "/terms",
      icon: <FileText />,
      title: "Terms and Conditions",
      description: "View the terms and conditions.",
    },
  ]

  return (
    <div>
      <div className="space-y-2">
        {content.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="flex flex-row items-center rounded-lg border p-4"
          >
            <div className="mr-4 text-muted-foreground">{item.icon}</div>

            <div>
              <h2 className="font-[poppins] text-[12px] font-semibold">
                {item.title}
              </h2>
              <span className="text-[8.63px] text-muted-foreground">
                {item.description}
              </span>
            </div>
            <ChevronRight className="ml-auto text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  )
}
