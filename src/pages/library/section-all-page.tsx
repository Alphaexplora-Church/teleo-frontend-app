import { ArrowLeft, Clock, BookOpen } from "lucide-react"
import { useNavigate, useLocation } from "react-router"
import { Card } from "@/components/ui/card"
import type { ContentItem, Tab } from "@/pages/library-page"

type LocationState = {
  title: string
  items: ContentItem[]
  tab: Tab
}

function ContentCard({ item, tab, onPress }: { item: ContentItem; tab: Tab; onPress: () => void }) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
    >
      <Card className="w-full gap-0 p-0 overflow-hidden">
        <div className="relative aspect-4/3 w-full bg-muted">
          {tab === "library" && (
            <BookOpen className="absolute top-2 right-2 size-4 text-accent" aria-hidden />
          )}
        </div>
        <div className="p-3 pt-2">
          <p className="text-sm font-semibold leading-tight">{item.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
          <div className="flex items-center gap-1 mt-1.5 text-accent text-xs font-medium">
            <Clock className="size-3" aria-hidden />
            <span>{item.duration}</span>
          </div>
        </div>
      </Card>
    </button>
  )
}

export default function SectionAllPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState | null

  if (!state) {
    navigate(-1)
    return null
  }

  const { title, items, tab } = state

  return (
    <div className="flex flex-col pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow shrink-0"
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>
        <h1 className="text-xl font-bold leading-tight">{title}</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => (
          <ContentCard
            key={i}
            item={item}
            tab={tab}
            onPress={() => navigate("/course/detail")}
          />
        ))}
      </div>
    </div>
  )
}
