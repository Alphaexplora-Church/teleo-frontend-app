import { ArrowLeft, Clock, BookOpen, Search, SlidersHorizontal, ArrowUpDown, X } from "lucide-react"
import { useNavigate, useLocation } from "react-router"
import { useState, useMemo } from "react"
import { ROUTES } from "@/lib/routes"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { ContentItem, Tab } from "@/features/library/model/library-data"

type LocationState = {
  title: string
  items: ContentItem[]
  tab: Tab
}

type SortOption = "az" | "za" | "shortest" | "longest"

const SORT_LABELS: Record<SortOption, string> = {
  az: "A → Z",
  za: "Z → A",
  shortest: "Shortest first",
  longest: "Longest first",
}

/** Convert "1h 30min" / "58min" / "6h 00min" to total minutes for sorting */
function parseDuration(d: string): number {
  const hours = d.match(/(\d+)h/)
  const mins = d.match(/(\d+)min/)
  return (hours ? parseInt(hours[1]) * 60 : 0) + (mins ? parseInt(mins[1]) : 0)
}

function ContentCard({ item, onPress }: { item: ContentItem; onPress: () => void }) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
    >
      <Card className="w-full gap-0 p-0 overflow-hidden">
        <div className="relative aspect-4/3 w-full bg-muted">
          <BookOpen className="absolute top-2 right-2 size-4 text-accent" aria-hidden />
        </div>
        <div className="p-3 pt-2 flex flex-col gap-0.5 h-[120px]">
          <p className="text-sm font-semibold leading-tight line-clamp-2">{item.title}</p>
          <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
          <span className="mt-1 self-start rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent leading-tight truncate max-w-full">
            {item.genre}
          </span>
          <div className="flex items-center gap-1 mt-auto text-accent text-xs font-medium">
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

  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<SortOption>("az")
  const [activeGenres, setActiveGenres] = useState<Set<string>>(new Set())

  const items: ContentItem[] = useMemo(() => state?.items ?? [], [state])
  const title: string = state?.title ?? ""

  // Unique genres derived from items
  const allGenres: string[] = useMemo(() => {
    const arr = items.map((i) => i.genre ?? "").filter(Boolean) as string[]
    return Array.from(new Set(arr)).sort()
  }, [items])

  const toggleGenre = (genre: string) => {
    setActiveGenres((prev) => {
      const next = new Set(prev)
      if (next.has(genre)) {
        next.delete(genre)
      } else {
        next.add(genre)
      }
      return next
    })
  }

  const clearFilters = () => {
    setActiveGenres(new Set())
    setQuery("")
    setSort("az")
  }

  const filtered = useMemo(() => {
    let result = [...items]

    // Search
    if (query.trim()) {
      const q = query.toLowerCase()
      const getGenre = (it: ContentItem) => it.genre ?? ""
      result = result.filter((i) => i.title.toLowerCase().includes(q) || getGenre(i).toLowerCase().includes(q))
    }

    // Genre filter
    if (activeGenres.size > 0) {
      const getGenre = (it: ContentItem) => it.genre ?? ""
      result = result.filter((i) => activeGenres.has(getGenre(i)))
    }

    // Sort
    switch (sort) {
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case "shortest":
        result.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration))
        break
      case "longest":
        result.sort((a, b) => parseDuration(b.duration) - parseDuration(a.duration))
        break
    }

    return result
  }, [items, query, activeGenres, sort])

  if (!state) {
    navigate(-1)
    return null
  }

  const hasActiveFilters = activeGenres.size > 0 || query.trim() !== "" || sort !== "az"

  return (
    <div className="flex flex-col pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
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

      {/* Search + Sort + Filter row */}
      <div className="flex items-center gap-2 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search…"
            className="pl-9 h-9 text-sm"
            aria-label="Search items"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Sort */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn("h-9 px-3 gap-1.5 shrink-0", sort !== "az" && "border-accent text-accent")}
              aria-label="Sort"
            >
              <ArrowUpDown className="size-3.5" aria-hidden />
              <span className="text-xs">Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
              <DropdownMenuItem
                key={opt}
                onClick={() => setSort(opt)}
                className={cn("text-sm", sort === opt && "font-semibold text-accent")}
              >
                {SORT_LABELS[opt]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Filter */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn("h-9 px-3 gap-1.5 shrink-0 relative", activeGenres.size > 0 && "border-accent text-accent")}
              aria-label="Filter by genre"
            >
              <SlidersHorizontal className="size-3.5" aria-hidden />
              <span className="text-xs">Filter</span>
              {activeGenres.size > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-white">
                  {activeGenres.size}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl px-4 pb-8">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-left">Filter by Genre</SheetTitle>
            </SheetHeader>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((genre: string) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => toggleGenre(genre)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                    activeGenres.has(genre)
                      ? "bg-accent text-white border-accent"
                      : "bg-background text-foreground border-border hover:border-accent hover:text-accent"
                  )}
                >
                  {genre}
                </button>
              ))}
            </div>
            {activeGenres.size > 0 && (
              <button
                type="button"
                onClick={() => setActiveGenres(new Set())}
                className="mt-4 text-xs text-muted-foreground underline underline-offset-2"
              >
                Clear genre filters
              </button>
            )}
          </SheetContent>
        </Sheet>
      </div>

      {/* Active filter chips */}
      {activeGenres.size > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {Array.from(activeGenres).map((genre) => (
            <Badge
              key={genre}
              variant="secondary"
              className="gap-1 pr-1.5 text-xs cursor-pointer"
              onClick={() => toggleGenre(genre)}
            >
              {genre}
              <X className="size-3" aria-hidden />
            </Badge>
          ))}
        </div>
      )}

      {/* Results count + clear */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "result" : "results"}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-accent underline underline-offset-2"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((item, i) => (
            <ContentCard
              key={i}
              item={item}
              onPress={() => navigate(ROUTES.courseDetail)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
          <Search className="size-8 text-muted-foreground/40" aria-hidden />
          <p className="text-sm font-medium">No results found</p>
          <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
