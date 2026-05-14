import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router"

type PageHeaderProps = {
  title: string
  backTo?: string | -1
}

export default function PageHeader({ title, backTo = -1 }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="relative mb-6 flex items-center justify-center">
      <button
        type="button"
        onClick={() => navigate(backTo as string)}
        className="absolute left-0 flex items-center text-foreground"
        aria-label="Go back"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <h1 className="text-[18px] font-bold">{title}</h1>
    </div>
  )
}
