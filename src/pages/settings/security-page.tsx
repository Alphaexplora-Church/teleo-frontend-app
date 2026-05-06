import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SecurityPage() {
  const content = [
    {
      label: "Email",
      placeholder: "juandelacruz1999@yahoo.com",
    },
    {
      label: "Phone Number",
      placeholder: "+63 | 09123467485",
    },
    {
      label: "Password",
      placeholder: "********",
    },
  ]

  return (
    <div>
      <div className="space-y-4">
        {content.map((item, index) => (
          <div key={index}>
            <label className="text-[14px] font-semibold">{item.label}</label>
            <Input
              type="text"
              placeholder={item.placeholder}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        ))}
      </div>
      <Button size="lg" className="mt-4 w-full">
        Edit Profile
      </Button>
    </div>
  )
}
