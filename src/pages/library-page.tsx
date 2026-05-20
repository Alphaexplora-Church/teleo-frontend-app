import { BookOpen, BookMarked, Download, Clock, ChevronRight, Home, HeartHandshake, Megaphone, CircleUser, GraduationCap, AlignLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router"

export type Tab = "library" | "bookshelf" | "downloads"

export type ContentItem = {
  title: string
  subtitle: string
  duration: string
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
        { title: "Faith Foundations", subtitle: "7 chapters", duration: "6h 30min" },
        { title: "Grace & Truth", subtitle: "5 chapters", duration: "4h 15min" },
        { title: "Walking in Purpose", subtitle: "6 chapters", duration: "5h 00min" },
        { title: "New Beginnings", subtitle: "4 chapters", duration: "3h 45min" },
        { title: "The Narrow Path", subtitle: "8 chapters", duration: "7h 10min" },
      ],
    },
    {
      title: "Business",
      showAll: true,
      items: [
        { title: "Kingdom Entrepreneurship", subtitle: "Lesson", duration: "1h 20min" },
        { title: "Stewardship & Wealth", subtitle: "Lesson", duration: "2h 05min" },
        { title: "Leading with Integrity", subtitle: "Lesson", duration: "1h 45min" },
        { title: "Marketplace Ministry", subtitle: "Lesson", duration: "2h 30min" },
        { title: "Vision & Strategy", subtitle: "Lesson", duration: "1h 55min" },
        { title: "Servant Leadership", subtitle: "Lesson", duration: "1h 10min" },
      ],
    },
    {
      title: "Reading",
      showAll: true,
      items: [
        { title: "Psalms Deep Dive", subtitle: "Reading", duration: "3h 00min" },
        { title: "Proverbs for Today", subtitle: "Reading", duration: "2h 20min" },
        { title: "Letters of Paul", subtitle: "Reading", duration: "4h 10min" },
        { title: "The Sermon on the Mount", subtitle: "Reading", duration: "1h 30min" },
        { title: "Revelation Unpacked", subtitle: "Reading", duration: "5h 00min" },
      ],
    },
  ],
  bookshelf: [
    {
      title: "My Books",
      showAll: true,
      items: [
        { title: "Mere Christianity", subtitle: "C.S. Lewis", duration: "8h 00min" },
        { title: "The Purpose Driven Life", subtitle: "Rick Warren", duration: "7h 30min" },
        { title: "Knowing God", subtitle: "J.I. Packer", duration: "9h 15min" },
        { title: "Celebration of Discipline", subtitle: "Richard Foster", duration: "6h 45min" },
        { title: "The Pursuit of God", subtitle: "A.W. Tozer", duration: "4h 20min" },
        { title: "Desiring God", subtitle: "John Piper", duration: "10h 00min" },
      ],
    },
    {
      title: "Recently Added",
      showAll: true,
      items: [
        { title: "Gentle & Lowly", subtitle: "Dane Ortlund", duration: "5h 30min" },
        { title: "The Ruthless Elimination of Hurry", subtitle: "John Mark Comer", duration: "7h 00min" },
        { title: "Liturgy of the Ordinary", subtitle: "Tish Harrison Warren", duration: "4h 00min" },
        { title: "Every Moment Holy", subtitle: "Douglas McKelvey", duration: "3h 15min" },
      ],
    },
  ],
  downloads: [
    {
      title: "Downloaded",
      showAll: false,
      items: [
        { title: "Sunday Service — Week 1", subtitle: "Lesson", duration: "1h 10min" },
        { title: "Sunday Service — Week 2", subtitle: "Lesson", duration: "1h 05min" },
        { title: "Sunday Service — Week 3", subtitle: "Lesson", duration: "1h 20min" },
        { title: "Sunday Service — Week 4", subtitle: "Lesson", duration: "58min" },
        { title: "Sunday Service — Week 5", subtitle: "Lesson", duration: "1h 15min" },
      ],
    },
    {
      title: "Saved for Offline",
      showAll: true,
      items: [
        { title: "Faith Foundations", subtitle: "7 chapters", duration: "6h 30min" },
        { title: "Psalms Deep Dive", subtitle: "Reading", duration: "3h 00min" },
        { title: "Kingdom Entrepreneurship", subtitle: "Lesson", duration: "1h 20min" },
        { title: "Mere Christianity", subtitle: "C.S. Lewis", duration: "8h 00min" },
      ],
    },
  ],
}

function ContentCard({ item, onPress }: { item: ContentItem; onPress: () => void }) {
  const sub = item.subtitle.toLowerCase()
  const CardIcon =
    sub === "lesson" ? GraduationCap :
    sub === "reading" ? AlignLeft :
    BookOpen  // chapters / fallback

  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
    >
      <Card className="w-full gap-0 p-0 overflow-hidden">
        {/* Thumbnail placeholder */}
        <div className="relative aspect-4/3 w-full bg-muted">
          <CardIcon
            className="absolute top-2 right-2 size-4 text-accent"
            aria-hidden
          />
        </div>
        {/* Info */}
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

function ContentSection({ section, tab }: { section: Section; tab: Tab }) {
  const navigate = useNavigate()

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold">{section.title}</h2>
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
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
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
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-background border-t border-border px-2 py-3"
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
                "flex items-center justify-center size-11 rounded-full transition-colors",
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
      <div className="mb-5">
        <p className="text-sm text-muted-foreground">Hello, Juan!</p>
        <h1 className="text-2xl font-bold leading-tight">Ready to Explore?</h1>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none -mx-4 px-4">
        {TABS.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(id)}
            className={cn(
              "rounded-full gap-1.5 px-4 h-9 shrink-0",
              activeTab === id && "bg-primary text-primary-foreground"
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {label}
          </Button>
        ))}
      </div>

      {/* Content sections */}
      {SECTIONS[activeTab].map((section, i) => (
        <ContentSection key={i} section={section} tab={activeTab} />
      ))}

      <BottomNav />
    </div>
  )
}
