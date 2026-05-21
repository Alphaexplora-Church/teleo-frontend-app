import { useState } from "react"
import { useNavigate, useLocation } from "react-router"
import {
  ArrowLeft,
  Bookmark,
  User,
  Calendar,
  Paperclip,
  BookOpen,
  Video,
  Home,
  HeartHandshake,
  Megaphone,
  BookMarked,
  CircleUser,
  Download,
  FileText,
  Image,
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
  type: "book" | "video"
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
  progress: number        // 0–100
  totalChapters: number
  currentChapter: number  // 1-based, 0 = not started
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
  totalChapters: 4,
  currentChapter: 1,
  about:
    "In this course, we explore what the Bible says about true friendship, how to build lasting relationships, and how to be a friend who reflects Christ's love. Whether you're seeking to strengthen your friendships or understand their role in your faith journey, this course will provide biblical wisdom and practical insights.",
  tags: ["Personal growth", "Culture & society", "Art", "Theology"],
  chapters: [
    { number: 1, title: "Designed for Connection", duration: "05:22", completed: true, type: "video" },
    { number: 2, title: "Qualities of a Godly Friend", duration: "05:22", completed: false, type: "book" },
    { number: 3, title: "Navigating Conflict with Grace", duration: "05:22", completed: false, type: "video" },
    { number: 4, title: "Friendship & Faith", duration: "05:22", completed: false, type: "book" },
  ],
  attachments: [
    { id: "1", name: "Friendship Workshop Photo.jpg", size: "3.3 MB", type: "image" },
    { id: "2", name: "Friendship Study Guide.pdf", size: "2.4 MB", type: "pdf" },
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

// ── Attachment helpers ────────────────────────────────────────────────────────

function AttachmentIcon({ type }: { type: Attachment["type"] }) {
  if (type === "pdf") return <FileText className="size-5 text-destructive shrink-0" aria-hidden />
  if (type === "image") return <Image className="size-5 text-accent shrink-0" aria-hidden />
  return <Paperclip className="size-5 text-muted-foreground shrink-0" aria-hidden />
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
      <DialogContent showCloseButton className="w-[calc(100%-2rem)] max-w-sm p-4 gap-3">
        <div className="flex flex-col gap-2">
          {attachments.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onSelect(a)}
              className="flex items-center gap-3 rounded-lg border border-border p-3 text-left hover:bg-muted transition-colors"
            >
              <AttachmentIcon type={a.type} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{a.name}</p>
                <p className="text-xs text-muted-foreground">{a.size}</p>
              </div>
              <Download className="size-4 text-muted-foreground shrink-0" aria-hidden />
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
      <DialogContent showCloseButton={false} className="w-[calc(100%-2rem)] max-w-sm p-4 gap-3">
        {attachment && (
          <>
            {/* File header */}
            <div className="flex items-center gap-3">
              <AttachmentIcon type={attachment.type} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{attachment.name}</p>
                <p className="text-xs text-muted-foreground">{attachment.size}</p>
              </div>
              <button type="button" aria-label="Download">
                <Download className="size-4 text-muted-foreground" aria-hidden />
              </button>
            </div>

            {/* Preview area */}
            <div className="w-full aspect-3/4 rounded-lg bg-muted" aria-label="File preview" />

            {/* Close */}
            <DialogFooter className="border-0 bg-transparent p-0 mx-0 mb-0">
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



function ChapterRow({
  chapter,
  onToggle,
}: {
  chapter: Chapter
  onToggle: (number: number) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(chapter.number)}
      className="w-full flex items-center gap-3 py-3 border-b border-border last:border-0 text-left transition-colors hover:bg-muted/40 rounded-lg px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-pressed={chapter.completed}
      aria-label={`${chapter.title} – ${chapter.completed ? "completed, click to mark incomplete" : "click to mark complete"}`}
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

      {/* Title + duration */}
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium leading-tight transition-colors", chapter.completed ? "text-muted-foreground" : "text-foreground")}>
          {chapter.title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{chapter.duration}</p>
      </div>

      {/* Book / Video icon */}
      {chapter.type === "video" ? (
        <Video
          className={cn(
            "size-4 shrink-0 transition-colors",
            chapter.completed ? "text-accent" : "text-muted-foreground"
          )}
          aria-hidden
        />
      ) : (
        <BookOpen
          className={cn(
            "size-4 shrink-0 transition-colors",
            chapter.completed ? "text-accent" : "text-muted-foreground"
          )}
          aria-hidden
        />
      )}
    </button>
  )
}

function RelatedCard({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-20 shrink-0">
      <div className="w-full aspect-square rounded-xl bg-muted" />
      <span className="text-xs text-center leading-tight text-muted-foreground line-clamp-2">
        {label}
      </span>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CourseDetailPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"chapters" | "description">("chapters")
  const [attachmentsOpen, setAttachmentsOpen] = useState(false)
  const [selectedAttachment, setSelectedAttachment] = useState<Attachment | null>(null)

  // Local mutable chapter state so toggling completion works without a backend
  const [bookmarked, setBookmarked] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [chapters, setChapters] = useState<Chapter[]>(MOCK_COURSE.chapters)

  const completedCount = chapters.filter((c) => c.completed).length
  const progress = Math.round((completedCount / chapters.length) * 100)
  const currentChapter = completedCount  // last completed chapter index (0 = none)

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

  const progressLabel =
    currentChapter > 0
      ? `${currentChapter}/${course.totalChapters}`
      : undefined

  return (
    <div className="flex flex-col pb-12">
      {/* ── Hero area ── */}
      <div className="relative -mx-8 sm:-mx-10">
        {/* Thumbnail placeholder */}
        <div className="w-full aspect-video bg-muted" />

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
            className={cn("size-4 transition-colors", bookmarked && "fill-primary-foreground")}
            aria-hidden
          />
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Course Progress</span>
          {progressLabel && (
            <span className="text-xs text-muted-foreground">{progressLabel}</span>
          )}
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
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
        <h1 className="text-2xl font-bold leading-tight">{course.title}</h1>
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
          <User className="size-3.5 shrink-0" aria-hidden />
          <span>{course.author}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
          <Calendar className="size-3.5 shrink-0" aria-hidden />
          <span>{course.date}</span>
        </div>
      </div>

      {/* ── View attachments + Download ── */}
      <div className="mt-4 flex gap-2">
        <Button
          onClick={() => setAttachmentsOpen(true)}
          className="flex-1 rounded-full bg-accent hover:bg-accent/90 text-white gap-2"
        >
          <Paperclip className="size-4" aria-hidden />
          View attachments
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label={downloaded ? "Remove download" : "Download course"}
          aria-pressed={downloaded}
          onClick={() => setDownloaded((prev) => !prev)}
          className="rounded-full shrink-0"
        >
          <Download
            className={cn("size-4 transition-colors", downloaded && "text-accent")}
            aria-hidden
          />
        </Button>
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

      {/* ── About ── */}
      <div className="mt-6">
        <h2 className="text-base font-bold mb-2">About this course</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{course.about}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="mt-6 border-b border-border flex">
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
          {course.chapters.map((ch) => (
            <ChapterRow key={ch.number} chapter={ch} onToggle={toggleChapter} />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="text-base font-bold mb-2">
            Chapter {course.currentChapter || 1}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            What does the Bible say about being a true friend? Learn the key traits of
            Christ-centered friendships, including love, honesty, and loyalty.
          </p>
        </div>
      )}

      {/* ── More to explore ── */}
      <div className="mt-8">
        <h2 className="text-base font-bold mb-3">More to explore on this topic</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {course.relatedTopics.map((topic) => (
            <RelatedCard key={topic} label={topic} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
