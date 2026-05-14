import {
  Bell,
  Shield,
  User,
  FileText,
  AlertTriangle,
  ChevronRight,
} from "lucide-react"
import { Link } from "react-router"
import PageHeader from "@/components/page-header"

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
    <div className="px-3 py-2">
      <PageHeader title="Settings" backTo="/landing" />
      <div className="space-y-3">
        {content.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            className="flex flex-row items-center rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm"
          >
            <div className="mr-3 shrink-0 text-gray-400 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-[1.5]">
              {item.icon}
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <h2 className="font-[poppins] text-[11.5px] font-semibold leading-snug text-gray-900">
                {item.title}
              </h2>
              <span className="text-[9.5px] leading-tight text-gray-400">
                {item.description}
              </span>
            </div>
            <ChevronRight className="ml-2 h-4 w-4 shrink-0 text-gray-400 stroke-[1.5]" />
          </Link>
        ))}
      </div>
    </div>
  )
}
