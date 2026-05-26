import { useState } from "react"
import { useNavigate, useLocation } from "react-router"
import {
  ArrowLeft,
  Bookmark,
  User,
  Calendar,
  Paperclip,
  Video,
  Home,
  HeartHandshake,
  Megaphone,
  BookMarked,
  CircleUser,
  Download,
  FileText,
  Image,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// ── Types ────────────────────────────────────────────────────────────────────

type Chapter = {
  number: number
  title: string
  duration: string
  completed: boolean
  type: "file" | "video"
  downloaded?: boolean
}

type Attachment = {
  id: string
  name: string
  size: string
  type: "pdf" | "image" | "other"
}

type CourseDetail = {
  title: string
  author: string
  date: string
  progress: number // 0–100
  totalChapters: number
  currentChapter: number // 1-based, 0 = not started
  about: string
  tags: string[]
  chapters: Chapter[]
  attachments: Attachment[]
  relatedTopics: string[]
}

// ── Mock data ────────────────────────────────────────────────────────────────

const MOCK_COURSE: CourseDetail = {
  title: "Building Friendships",
  author: "Juan Dela Cruz • Youth Ministry Team",
  date: "April 23, 2024",
  progress: 25,
  totalChapters: 12,
  currentChapter: 1,
  about:
    "In this course, we explore what the Bible says about true friendship, how to build lasting relationships, and how to be a friend who reflects Christ's love. Whether you're seeking to strengthen your friendships or understand their role in your faith journey, this course will provide biblical wisdom and practical insights.",
  tags: ["Personal growth", "Culture & society", "Art", "Theology"],
  chapters: [
    {
      number: 1,
      title: "Designed for Connection",
      duration: "05:22",
      completed: true,
      type: "video",
    },
    {
      number: 2,
      title: "Qualities of a Godly Friend",
      duration: "05:22",
      completed: false,
      type: "file",
      downloaded: false,
    },
    {
      number: 3,
      title: "Navigating Conflict with Grace",
      duration: "05:22",
      completed: false,
      type: "video",
    },
    {
      number: 4,
      title: "Friendship & Faith",
      duration: "05:22",
      completed: false,
      type: "file",
      downloaded: false,
    },
    {
      number: 5,
      title: "Building Trust",
      duration: "06:15",
      completed: false,
      type: "video",
    },
    {
      number: 6,
      title: "Communication Skills",
      duration: "07:45",
      completed: false,
      type: "file",
      downloaded: false,
    },
    {
      number: 7,
      title: "Handling Misunderstandings",
      duration: "05:58",
      completed: false,
      type: "video",
    },
    {
      number: 8,
      title: "Long-Distance Friendships",
      duration: "06:30",
      completed: false,
      type: "file",
      downloaded: false,
    },
    {
      number: 9,
      title: "Group Dynamics",
      duration: "05:40",
      completed: false,
      type: "video",
    },
    {
      number: 10,
      title: "Seasonal Friendships",
      duration: "06:00",
      completed: false,
      type: "file",
      downloaded: false,
    },
    {
      number: 11,
      title: "Mentorship Relationships",
      duration: "07:12",
      completed: false,
      type: "video",
    },
    {
      number: 12,
      title: "Reconciliation Guide",
      duration: "08:30",
      completed: false,
      type: "file",
      downloaded: false,
    },
  ],
  attachments: [
    {
      id: "1",
      name: "Friendship Workshop Photo.jpg",
      size: "3.3 MB",
      type: "image",
    },
    {
      id: "2",
      name: "Friendship Study Guide.pdf",
      size: "2.4 MB",
      type: "pdf",
    },
  ],
  relatedTopics: ["Church History", "Finding Peace", "Healthy You", "Healthy"],
}

// ── Bottom nav (shared) ───────────────────────────────────────────────────────

const BOTTOM_NAV = [
  { icon: Home, label: "Home", href: "/" },
  { icon: HeartHandshake, label: "Support", href: "/support" },
  { icon: Megaphone, label: "Announcements", href: "/announcements" },
  { icon: BookMarked, label: "Library", href: "/landing" },
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

// ── Attachment helpers ────────────────────────────────────────────────────────

function AttachmentIcon({ type }: { type: Attachment["type"] }) {
  if (type === "pdf")
    return <FileText className="size-5 shrink-0 text-destructive" aria-hidden />
  if (type === "image")
    return <Image className="size-5 shrink-0 text-accent" aria-hidden />
  return (
    <Paperclip className="size-5 shrink-0 text-muted-foreground" aria-hidden />
  )
}

// ── Attachments list dialog ───────────────────────────────────────────────────

function AttachmentsDialog({
  open,
  onOpenChange,
  attachments,
  onSelect,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  attachments: Attachment[]
  onSelect: (a: Attachment) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="w-[calc(100%-2rem)] max-w-sm gap-3 p-4"
      >
        <div className="flex flex-col gap-2">
          {attachments.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onSelect(a)}
              className="flex items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted"
            >
              <AttachmentIcon type={a.type} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.size}</p>
              </div>
              <Download
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// ── Single attachment preview dialog ─────────────────────────────────────────

function AttachmentPreviewDialog({
  attachment,
  onClose,
}: {
  attachment: Attachment | null
  onClose: () => void
}) {
  return (
    <Dialog open={!!attachment} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-2rem)] max-w-sm gap-3 p-4"
      >
        {attachment && (
          <>
            {/* File header */}
            <div className="flex items-center gap-3">
              <AttachmentIcon type={attachment.type} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {attachment.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {attachment.size}
                </p>
              </div>
              <button type="button" aria-label="Download">
                <Download
                  className="size-4 text-muted-foreground"
                  aria-hidden
                />
              </button>
            </div>

            {/* Preview area */}
            <div
              className="aspect-3/4 w-full rounded-lg bg-muted"
              aria-label="File preview"
            />

            {/* Close */}
            <DialogFooter className="mx-0 mb-0 border-0 bg-transparent p-0">
              <DialogClose asChild>
                <Button variant="outline" className="w-full rounded-lg">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ── Helper to get chapter type label ────────────────────────────────────────
function getChapterTypeLabel(chapter: Chapter): string {
  return chapter.type === "file" ? "PDF File" : "Video"
}

function ChapterRow({
  chapter,
  onToggle,
  onDownload,
}: {
  chapter: Chapter
  onToggle: (number: number) => void
  onDownload?: (number: number) => void
}) {
  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDownload?.(chapter.number)
  }

  return (
    <button
      type="button"
      onClick={() => onToggle(chapter.number)}
      className="flex w-full items-center gap-3 rounded-lg border-b border-border px-1 py-3 text-left transition-colors last:border-0 hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      aria-pressed={chapter.completed}
      aria-label={`${chapter.title} – ${getChapterTypeLabel(chapter)} – ${chapter.completed ? "completed, click to mark incomplete" : "click to mark complete"}`}
    >
      {/* Number badge */}
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
          chapter.completed
            ? "bg-accent text-white"
            : "bg-muted text-muted-foreground"
        )}
      >
        {chapter.number}
      </span>

      {/* Title + Type + Duration */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm leading-tight font-medium transition-colors",
            chapter.completed ? "text-muted-foreground" : "text-foreground"
          )}
        >
          {chapter.title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-xs font-medium text-foreground">
            {getChapterTypeLabel(chapter)}
          </p>
          {chapter.type === "video" && (
            <>
              <span className="text-xs text-muted-foreground">•</span>
              <p className="text-xs text-muted-foreground">
                {chapter.duration}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Download button for all chapters */}
      <button
        type="button"
        onClick={handleDownloadClick}
        aria-label={
          chapter.downloaded
            ? `${chapter.title} is downloaded`
            : `Download ${chapter.title}`
        }
        className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-accent/10 active:bg-accent/20"
      >
        {chapter.downloaded ? (
          <Check className="size-5 shrink-0 text-accent" aria-hidden />
        ) : (
          <Download
            className="size-5 shrink-0 text-muted-foreground"
            aria-hidden
          />
        )}
      </button>
    </button>
  )
}

function RelatedCard({ label }: { label: string }) {
  return (
    <div className="flex w-20 shrink-0 flex-col items-center gap-1.5">
      <div className="aspect-square w-full rounded-xl bg-muted" />
      <span className="line-clamp-2 text-center text-xs leading-tight text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CourseDetailPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"chapters" | "description">(
    "chapters"
  )
  const [attachmentsOpen, setAttachmentsOpen] = useState(false)
  const [selectedAttachment, setSelectedAttachment] =
    useState<Attachment | null>(null)
  const [chapterFilter, setChapterFilter] = useState<
    "all" | "file" | "video" | "downloaded"
  >("all")
  const [isChaptersExpanded, setIsChaptersExpanded] = useState(false)

  // Local mutable chapter state so toggling completion works without a backend
  const [bookmarked, setBookmarked] = useState(false)
  const [chapters, setChapters] = useState<Chapter[]>(MOCK_COURSE.chapters)

  const completedCount = chapters.filter((c) => c.completed).length
  const progress = Math.round((completedCount / chapters.length) * 100)
  const currentChapter = completedCount // last completed chapter index (0 = none)

  const course = {
    ...MOCK_COURSE,
    chapters,
    progress,
    currentChapter,
    totalChapters: chapters.length,
  }

  function toggleChapter(number: number) {
    setChapters((prev) =>
      prev.map((ch) =>
        ch.number === number ? { ...ch, completed: !ch.completed } : ch
      )
    )
  }

  function handleDownloadChapter(number: number) {
    setChapters((prev) =>
      prev.map((ch) =>
        ch.number === number ? { ...ch, downloaded: !ch.downloaded } : ch
      )
    )
    // In a real app, this would trigger an actual download
    console.log(`Downloading chapter ${number}...`)
  }

  function getFilteredChapters() {
    switch (chapterFilter) {
      case "file":
        return chapters.filter((ch) => ch.type === "file")
      case "video":
        return chapters.filter((ch) => ch.type === "video")
      case "downloaded":
        return chapters.filter((ch) => ch.downloaded)
      case "all":
      default:
        return chapters
    }
  }

  function getDisplayedChapters() {
    const filtered = getFilteredChapters()
    if (!isChaptersExpanded && filtered.length > 10) {
      return filtered.slice(0, 10)
    }
    return filtered
  }

  const progressLabel =
    currentChapter > 0 ? `${currentChapter}/${course.totalChapters}` : undefined

  return (
    <div className="flex flex-col pb-12">
      {/* ── Hero area ── */}
      <div className="relative -mx-8 sm:-mx-10">
        {/* Thumbnail placeholder */}
        <div className="aspect-video w-full bg-muted" />

        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute top-4 left-4 flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow"
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>

        {/* Bookmark button */}
        <button
          type="button"
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          aria-pressed={bookmarked}
          onClick={() => setBookmarked((prev) => !prev)}
          className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow"
        >
          <Bookmark
            className={cn(
              "size-4 transition-colors",
              bookmarked && "fill-primary-foreground"
            )}
            aria-hidden
          />
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div className="mt-4">
        <div className="mb-1 flex items-center justify-between">
          <span>Course Progress</span>
          {progressLabel && (
            <span className="text-xs text-muted-foreground">
              {progressLabel}
            </span>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${course.progress}%` }}
            role="progressbar"
            aria-valuenow={course.progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* ── Title block ── */}
      <div className="mt-4">
        <h1 className="text-2xl leading-tight font-bold">{course.title}</h1>
        {/* Tags */}
        <div className="mt-1 flex flex-wrap gap-2">
          {course.tags.map((tag, index) => (
            <span key={tag} className="flex items-center gap-2">
              <span className="text-xs text-foreground">{tag}</span>
              {index < course.tags.length - 1 && (
                <span className="text-xs text-foreground">•</span>
              )}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs">
          <User className="size-3.5 shrink-0" aria-hidden />
          <span>{course.author}</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs">
          <Calendar className="size-3.5 shrink-0" aria-hidden />
          <span>{course.date}</span>
        </div>

        {/* Offered in section */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Offered in:
          </span>
          <div className="flex items-center gap-1.5">
            {course.chapters.some((ch) => ch.type === "video") && (
              <Video
                className="size-3.5 text-muted-foreground"
                aria-label="Video content"
              />
            )}
            {course.chapters.some((ch) => ch.type === "file") && (
              <FileText
                className="size-3.5 text-muted-foreground"
                aria-label="File attachments"
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Attachments dialogs ── */}
      <AttachmentsDialog
        open={attachmentsOpen}
        onOpenChange={setAttachmentsOpen}
        attachments={course.attachments}
        onSelect={(a) => {
          setAttachmentsOpen(false)
          setSelectedAttachment(a)
        }}
      />
      <AttachmentPreviewDialog
        attachment={selectedAttachment}
        onClose={() => setSelectedAttachment(null)}
      />

      {/* ── Course description ── */}
      <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
        <p className="text-sm leading-relaxed text-foreground">
          In this course, we explore what the Bible says about true friendship,
          how to build lasting relationships, and how to be a friend who
          reflects Christ's love.
        </p>
      </div>

      {/* ── Tabs ── */}
      <div className="mt-6 flex border-b border-border">
        {(["chapters", "description"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 pb-2 text-sm font-medium capitalize transition-colors",
              activeTab === tab
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      {activeTab === "chapters" ? (
        <div className="mt-2">
          {/* Chapter Filters */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["all", "file", "video", "downloaded"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setChapterFilter(filter)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                  chapterFilter === filter
                    ? "bg-accent text-white"
                    : "border border-border bg-background text-foreground hover:bg-muted"
                )}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Chapters List */}
          {getDisplayedChapters().map((ch) => (
            <ChapterRow
              key={ch.number}
              chapter={ch}
              onToggle={toggleChapter}
              onDownload={handleDownloadChapter}
            />
          ))}

          {/* Expand/Collapse button */}
          {getFilteredChapters().length > 10 && (
            <button
              type="button"
              onClick={() => setIsChaptersExpanded((prev) => !prev)}
              className="mt-3 w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {isChaptersExpanded
                ? `Show less (${getFilteredChapters().length - 10} hidden)`
                : `Expand all (${getFilteredChapters().length - 10} more)`}
            </button>
          )}
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="mb-2 text-base font-bold">
            Chapter {course.currentChapter || 1}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            What does the Bible say about being a true friend? Learn the key
            traits of Christ-centered friendships, including love, honesty, and
            loyalty.
          </p>
        </div>
      )}

      {/* ── More to explore ── */}
      <div className="mt-8">
        <h2 className="mb-3 text-base font-bold">
          More to explore on this topic
        </h2>
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {course.relatedTopics.map((topic) => (
            <RelatedCard key={topic} label={topic} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
