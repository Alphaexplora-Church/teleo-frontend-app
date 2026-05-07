import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AccountPage() {
  const content = [
    {
      label: "Username",
      placeholder: "@juandelacruz",
    },
    {
      label: "First Name",
      placeholder: "Juan",
    },
    {
      label: "Last Name",
      placeholder: "de la Cruz",
    },
    {
      label: "Birthdate",
      placeholder: "01/25/1999",
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
        <label className="text-[14px] font-semibold">Pronouns</label>
        <div className="flex font-medium">
          <Button>He/Him</Button>
          <Button variant="secondary">She/Her</Button>
          <Button variant="secondary">They/Them</Button>
        </div>
      </div>
      <Button size="lg" className="mt-4 w-full">
        Edit Profile
      </Button>
    </div>
  )
}
