import { useState } from "react"
import { useNavigate } from "react-router"
import {
  ArrowLeft,
  Bookmark,
  User,
  Calendar,
  Video,
  FileText,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  AttachmentPreviewDialog,
  AttachmentsDialog,
  BottomNav,
  ChapterRow,
  RelatedCard,
} from "./course-detail-components"
import { MOCK_COURSE } from "./course-detail-data"
import type { Attachment, Chapter, CourseDetail } from "./course-detail-data"

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
  const [showFullAbout, setShowFullAbout] = useState(false)

  const [bookmarked, setBookmarked] = useState(false)
  const [chapters, setChapters] = useState<Chapter[]>(MOCK_COURSE.chapters)

  const completedCount = chapters.filter((c) => c.completed).length
  const progress = Math.round((completedCount / chapters.length) * 100)
  const currentChapter = completedCount

  const course: CourseDetail = {
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
      <div className="relative -mx-8 sm:-mx-10">
        <div className="aspect-video w-full bg-muted" />

        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute top-4 left-4 flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow"
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>

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

      <div className="mt-4">
        <h1 className="text-2xl leading-tight font-bold">{course.title}</h1>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-foreground">
          <User className="size-3.5 shrink-0" aria-hidden />
          <span>{course.author}</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3.5 shrink-0" aria-hidden />
          <span>{course.date}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {course.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>

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

      <div className="mt-6">
        <p className="text-sm leading-relaxed text-foreground">
          {showFullAbout ? course.about : `${course.about.slice(0, 30)}...`}
        </p>
        {course.about.length > 30 && (
          <button
            type="button"
            onClick={() => setShowFullAbout((prev) => !prev)}
            className="mt-2 text-sm font-medium text-accent"
          >
            {showFullAbout ? "Read less" : "Read more..."}
          </button>
        )}
      </div>

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

      {activeTab === "chapters" ? (
        <div className="mt-2">
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

          {getDisplayedChapters().map((ch) => (
            <ChapterRow
              key={ch.number}
              chapter={ch}
              onToggle={toggleChapter}
              onDownload={handleDownloadChapter}
            />
          ))}

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
