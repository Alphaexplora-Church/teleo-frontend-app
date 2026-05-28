import { ArrowUpDown, Clock, ChevronRight, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useLibraryViewModel } from "@/pages/library/viewmodel/use-library-view-model"
import { useNavigate, useLocation } from "react-router"
import type { ElementType } from "react"
import type {
  Tab,
  ContentItem,
  EventItem,
  HistoryItem,
  Section,
} from "@/pages/library/model/library-data"

type HistoryTab = "main" | "video" | "file"

function HistoryPanel({
  activeHistoryTab,
  historyTabs,
  historyItems,
  sortOrder,
  onTabChange,
  onSortToggle,
}: {
  activeHistoryTab: HistoryTab
  historyTabs: readonly { id: HistoryTab; label: string }[]
  historyItems: readonly HistoryItem[]
  sortOrder: "asc" | "desc"
  onTabChange: (value: HistoryTab) => void
  onSortToggle: () => void
}) {
  const navigate = useNavigate()

  return (
    <section className="mt-6">
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={onSortToggle}
            className="h-9 gap-2 rounded-full px-4"
          >
            <ArrowUpDown className="size-4" aria-hidden />
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>

        <div className="flex border-b border-border">
          {historyTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
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
        {historyItems.map((item) => (
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

type BottomNavItem = {
  icon: ElementType
  label: string
  href: string
}

function BottomNav({ items }: { items: BottomNavItem[] }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t border-border bg-background px-2 py-3"
      aria-label="Main navigation"
    >
      {items.map(({ icon: Icon, label, href }) => {
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
  const vm = useLibraryViewModel()

  return (
    <div className="flex flex-col pb-24">
      {/* Greeting */}
      <h1 className="mb-5 text-2xl leading-tight font-bold">
        Ready to Explore?
      </h1>

      {vm.activeTab !== "history" && (
        <section className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Upcoming Events</h2>
            <button type="button" className="text-sm font-medium text-accent">
              View all
            </button>
          </div>
          <div className="scrollbar-none mt-4 flex gap-4 overflow-x-auto pb-2">
            {vm.upcomingEvents.map((event, i) => (
              <div key={i} className="w-40 shrink-0 snap-start">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab bar */}
      <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
        {vm.tabs.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={vm.activeTab === id ? "default" : "outline"}
            size="sm"
            onClick={() => vm.setActiveTab(id)}
            className={cn(
              "h-9 shrink-0 gap-1.5 rounded-full px-4",
              vm.activeTab === id && "bg-primary text-primary-foreground"
            )}
          >
            <Icon className="size-3.5" aria-hidden />
            {label}
          </Button>
        ))}
      </div>

      {/* Content sections */}
      {vm.activeTab === "history" ? (
        <HistoryPanel
          activeHistoryTab={vm.activeHistoryTab}
          historyTabs={vm.historyTabs}
          historyItems={vm.historyItems}
          sortOrder={vm.sortOrder}
          onTabChange={vm.setActiveHistoryTab}
          onSortToggle={() =>
            vm.setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        />
      ) : (
        vm.sections[vm.activeTab].map((section, i) => (
          <ContentSection key={i} section={section} tab={vm.activeTab} />
        ))
      )}

      <BottomNav items={vm.bottomNav} />
    </div>
  )
}
