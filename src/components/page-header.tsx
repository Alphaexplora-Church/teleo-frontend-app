import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router"

type PageHeaderProps = {
  title: string
  backTo?: string | -1
}

export default function PageHeader({ title, backTo = -1 }: PageHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="relative -mx-8 mb-6 flex flex-col items-center justify-center px-8 py-3 sm:-mx-10 sm:px-10">
      <button
        type="button"
        onClick={() => navigate(backTo as string)}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-foreground sm:left-10"
        aria-label="Go back"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  )
}
