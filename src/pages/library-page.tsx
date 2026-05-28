import {
  ArrowUpDown,
  BookOpen,
  BookMarked,
  Download,
  Clock,
  ChevronRight,
  Home,
  HeartHandshake,
  Megaphone,
  CircleUser,
  CalendarDays,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router"

export type Tab = "library" | "bookshelf" | "downloads" | "history"
export type EventItem = {
  title: string
  date: string
  location: string
  description: string
}

const UPCOMING_EVENTS: EventItem[] = [
  {
    title: "Sunday Book Club",
    date: "Jun 1 · 4:00 PM",
    location: "Community Hall",
    description:
      "Join us for a guided reading and fellowship on transformative stories.",
  },
  {
    title: "Live Workshop",
    date: "Jun 8 · 6:30 PM",
    location: "Online Webinar",
    description:
      "An interactive session on unlocking your next chapter through faith-led habits.",
  },
  {
    title: "Author Spotlight",
    date: "Jun 15 · 7:00 PM",
    location: "Main Library",
    description:
      "Meet the authors behind the most inspirational books in your collection.",
  },
]

export type ContentItem = {
  title: string
  subtitle: string
  duration: string
}

export type HistoryItem = {
  number: number
  title: string
  subtitle: string
  duration: string
  type: "video" | "file"
}

export type Section = {
  title: string
  showAll: boolean
  items: ContentItem[]
}

const SECTIONS: Record<Tab, Section[]> = {
  library: [
    {
      title: "For Starters",
      showAll: true,
      items: [
        {
          title: "Faith Foundations",
          subtitle: "7 chapters",
          duration: "6h 30min",
        },
        {
          title: "Grace & Truth",
          subtitle: "5 chapters",
          duration: "4h 15min",
        },
        {
          title: "Walking in Purpose",
          subtitle: "6 chapters",
          duration: "5h 00min",
        },
        {
          title: "New Beginnings",
          subtitle: "4 chapters",
          duration: "3h 45min",
        },
        {
          title: "The Narrow Path",
          subtitle: "8 chapters",
          duration: "7h 10min",
        },
      ],
    },
    {
      title: "Business",
      showAll: true,
      items: [
        {
          title: "Kingdom Entrepreneurship",
          subtitle: "Lesson",
          duration: "1h 20min",
        },
        {
          title: "Stewardship & Wealth",
          subtitle: "Lesson",
          duration: "2h 05min",
        },
        {
          title: "Leading with Integrity",
          subtitle: "Lesson",
          duration: "1h 45min",
        },
        {
          title: "Marketplace Ministry",
          subtitle: "Lesson",
          duration: "2h 30min",
        },
        {
          title: "Vision & Strategy",
          subtitle: "Lesson",
          duration: "1h 55min",
        },
        {
          title: "Servant Leadership",
          subtitle: "Lesson",
          duration: "1h 10min",
        },
      ],
    },
    {
      title: "Reading",
      showAll: true,
      items: [
        {
          title: "Psalms Deep Dive",
          subtitle: "Reading",
          duration: "3h 00min",
        },
        {
          title: "Proverbs for Today",
          subtitle: "Reading",
          duration: "2h 20min",
        },
        {
          title: "Letters of Paul",
          subtitle: "Reading",
          duration: "4h 10min",
        },
        {
          title: "The Sermon on the Mount",
          subtitle: "Reading",
          duration: "1h 30min",
        },
        {
          title: "Revelation Unpacked",
          subtitle: "Reading",
          duration: "5h 00min",
        },
      ],
    },
  ],
  bookshelf: [
    {
      title: "My Books",
      showAll: true,
      items: [
        {
          title: "Mere Christianity",
          subtitle: "C.S. Lewis",
          duration: "8h 00min",
        },
        {
          title: "The Purpose Driven Life",
          subtitle: "Rick Warren",
          duration: "7h 30min",
        },
        {
          title: "Knowing God",
          subtitle: "J.I. Packer",
          duration: "9h 15min",
        },
        {
          title: "Celebration of Discipline",
          subtitle: "Richard Foster",
          duration: "6h 45min",
        },
        {
          title: "The Pursuit of God",
          subtitle: "A.W. Tozer",
          duration: "4h 20min",
        },
        {
          title: "Desiring God",
          subtitle: "John Piper",
          duration: "10h 00min",
        },
      ],
    },
    {
      title: "Recently Added",
      showAll: true,
      items: [
        {
          title: "Gentle & Lowly",
          subtitle: "Dane Ortlund",
          duration: "5h 30min",
        },
        {
          title: "The Ruthless Elimination of Hurry",
          subtitle: "John Mark Comer",
          duration: "7h 00min",
        },
        {
          title: "Liturgy of the Ordinary",
          subtitle: "Tish Harrison Warren",
          duration: "4h 00min",
        },
        {
          title: "Every Moment Holy",
          subtitle: "Douglas McKelvey",
          duration: "3h 15min",
        },
      ],
    },
  ],
  downloads: [
    {
      title: "Downloaded",
      showAll: false,
      items: [
        {
          title: "Sunday Service — Week 1",
          subtitle: "Lesson",
          duration: "1h 10min",
        },
        {
          title: "Sunday Service — Week 2",
          subtitle: "Lesson",
          duration: "1h 05min",
        },
        {
          title: "Sunday Service — Week 3",
          subtitle: "Lesson",
          duration: "1h 20min",
        },
        {
          title: "Sunday Service — Week 4",
          subtitle: "Lesson",
          duration: "58min",
        },
        {
          title: "Sunday Service — Week 5",
          subtitle: "Lesson",
          duration: "1h 15min",
        },
      ],
    },
    {
      title: "Saved for Offline",
      showAll: true,
      items: [
        {
          title: "Faith Foundations",
          subtitle: "7 chapters",
          duration: "6h 30min",
        },
        {
          title: "Psalms Deep Dive",
          subtitle: "Reading",
          duration: "3h 00min",
        },
        {
          title: "Kingdom Entrepreneurship",
          subtitle: "Lesson",
          duration: "1h 20min",
        },
        {
          title: "Mere Christianity",
          subtitle: "C.S. Lewis",
          duration: "8h 00min",
        },
      ],
    },
  ],
  history: [],
}

const HISTORY_TABS = [
  { id: "main", label: "Main" },
  { id: "video", label: "Video" },
  { id: "file", label: "Files" },
] as const

type HistoryTab = (typeof HISTORY_TABS)[number]["id"]

const HISTORY_ITEMS: HistoryItem[] = [
  {
    number: 1,
    title: "Inferno",
    subtitle: "A violent heist at a Vatican City museum sparks chaos.",
    duration: "30m",
    type: "video",
  },
  {
    number: 2,
    title: "Our Lady of Sorrows",
    subtitle: "DARKCOM gathers mercenaries and hunts for a family heirloom.",
    duration: "29m",
    type: "video",
  },
  {
    number: 3,
    title: "Foundations of Faith",
    subtitle: "Reference file for chapter notes and study prep.",
    duration: "",
    type: "file",
  },
  {
    number: 4,
    title: "Grace & Truth Notes",
    subtitle: "Downloadable study guide and reflection notes.",
    duration: "",
    type: "file",
  },
  {
    number: 5,
    title: "Morning Prayer Guide",
    subtitle: "PDF resource for daily devotion and reflection.",
    duration: "",
    type: "file",
  },
]

function HistoryPanel() {
  const navigate = useNavigate()
  const [activeHistoryTab, setActiveHistoryTab] = useState<HistoryTab>("main")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filtered = HISTORY_ITEMS.filter((item) =>
    activeHistoryTab === "main" ? true : item.type === activeHistoryTab
  )

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.number - b.number : b.number - a.number
  )

  return (
    <section className="mt-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="h-9 gap-2 rounded-full px-4"
          >
            <ArrowUpDown className="size-4" aria-hidden />
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>

        <div className="flex border-b border-border">
          {HISTORY_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveHistoryTab(tab.id)}
              className={cn(
                "flex-1 pb-3 text-center text-sm font-medium transition-colors",
                activeHistoryTab === tab.id
                  ? "border-b-2 border-foreground text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {sorted.map((item) => (
          <button
            key={item.number}
            type="button"
            onClick={() => navigate("/course/detail")}
            className="w-full rounded-3xl border border-border bg-muted p-4 text-left transition hover:border-accent"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-primary/10 text-base font-bold text-primary">
                {item.number}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base leading-tight font-semibold">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                {item.type === "file" ? "File" : item.duration}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

function ContentCard({
  item,
  onPress,
}: {
  item: ContentItem
  onPress: () => void
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <Card className="relative aspect-2/3 w-full gap-0 overflow-hidden rounded-lg bg-muted p-0">
        {/* Thumbnail placeholder */}
        <div className="absolute inset-0 h-full w-full bg-muted" />

        {/* Duration badge - bottom right */}
        <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <Clock className="size-3" aria-hidden />
          <span>{item.duration}</span>
        </div>
      </Card>
    </button>
  )
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <button
      type="button"
      className="w-full rounded-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <Card className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-muted p-0">
        <div className="absolute inset-0 h-full w-full bg-muted" />
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <CalendarDays className="size-3" aria-hidden />
              <span>Upcoming</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base leading-tight font-semibold">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground">{event.location}</p>
            </div>
          </div>
          <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Clock className="size-3" aria-hidden />
            <span>{event.date}</span>
          </div>
        </div>
      </Card>
    </button>
  )
}

function ContentSection({ section, tab }: { section: Section; tab: Tab }) {
  const navigate = useNavigate()

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{section.title}</h2>
        {section.showAll && (
          <button
            type="button"
            onClick={() =>
              navigate("/library/section", {
                state: { title: section.title, items: section.items, tab },
              })
            }
            className="flex items-center gap-0.5 text-xs font-medium text-accent"
          >
            Show all
            <ChevronRight className="size-3.5" aria-hidden />
          </button>
        )}
      </div>
      {/* Horizontally scrollable row */}
      <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {section.items.map((item, i) => (
          <div key={i} className="w-40 shrink-0 snap-start">
            <ContentCard
              item={item}
              onPress={() => navigate("/course/detail")}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "library", label: "Library", icon: BookOpen },
  { id: "bookshelf", label: "Bookshelf", icon: BookMarked },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "history", label: "History", icon: Clock },
]

const BOTTOM_NAV = [
  { icon: Home, label: "Home", href: "/" },
  { icon: HeartHandshake, label: "Support", href: "/support" },
  { icon: Megaphone, label: "Announcements", href: "/announcements" },
  { icon: BookMarked, label: "Library", href: "/library" },
  { icon: CircleUser, label: "Profile", href: "/profile" },
]

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t border-border bg-background px-2 py-3"
      aria-label="Main navigation"
    >
      {BOTTOM_NAV.map(({ icon: Icon, label, href }) => {
        const isActive = location.pathname === href
        return (
          <button
            key={href}
            type="button"
            onClick={() => navigate(href)}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            className="flex items-center justify-center"
          >
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-colors",
                isActive
                  ? "bg-accent text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-5" aria-hidden />
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("library")

  return (
    <div className="flex flex-col pb-24">
      {/* Greeting */}
      <h1 className="mb-5 text-2xl leading-tight font-bold">
        Ready to Explore?
      </h1>

      {/* Upcoming events */}
      <section className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Upcoming Events</h2>
          <button type="button" className="text-sm font-medium text-accent">
            View all
          </button>
        </div>
        <div className="scrollbar-none mt-4 flex gap-4 overflow-x-auto pb-2">
          {UPCOMING_EVENTS.map((event, i) => (
            <div key={i} className="w-40 shrink-0 snap-start">
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </section>

      {/* Tab bar */}
      <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
        {TABS.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(id)}
            className={cn(
              "h-9 shrink-0 gap-1.5 rounded-full px-4",
              activeTab === id && "bg-primary text-primary-foreground"
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {label}
          </Button>
        ))}
      </div>

      {/* Content sections */}
      {activeTab === "history" ? (
        <HistoryPanel />
      ) : (
        SECTIONS[activeTab].map((section, i) => (
          <ContentSection key={i} section={section} tab={activeTab} />
        ))
      )}

      <BottomNav />
    </div>
  )
}
