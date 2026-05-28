import { useCourseDetailViewModel } from "./viewmodel/use-course-detail-view-model"
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

export default function CourseDetailPage() {
  const vm = useCourseDetailViewModel()
  const course = vm.course
  const progressLabel =
    vm.currentChapter > 0
      ? `${vm.currentChapter}/${course.totalChapters}`
      : undefined

  return (
    <div className="flex flex-col pb-12">
      <div className="relative -mx-8 sm:-mx-10">
        <div className="aspect-video w-full bg-muted" />

        <button
          type="button"
          onClick={vm.goBack}
          aria-label="Go back"
          className="absolute top-4 left-4 flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow"
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>

        <button
          type="button"
          aria-label={vm.bookmarked ? "Remove bookmark" : "Bookmark"}
          aria-pressed={vm.bookmarked}
          onClick={vm.toggleBookmark}
          className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow"
        >
          <Bookmark
            className={cn(
              "size-4 transition-colors",
              vm.bookmarked && "fill-primary-foreground"
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
        open={vm.attachmentsOpen}
        onOpenChange={vm.setAttachmentsOpen}
        attachments={course.attachments}
        onSelect={(attachment) => {
          vm.setAttachmentsOpen(false)
          vm.selectAttachment(attachment)
        }}
      />
      <AttachmentPreviewDialog
        attachment={vm.selectedAttachment}
        onClose={() => vm.selectAttachment(null)}
      />

      <div className="mt-6">
        <p className="text-sm leading-relaxed text-foreground">
          {vm.showFullAbout ? course.about : `${course.about.slice(0, 30)}...`}
        </p>
        {course.about.length > 30 && (
          <button
            type="button"
            onClick={vm.toggleFullAbout}
            className="mt-2 text-sm font-medium text-accent"
          >
            {vm.showFullAbout ? "Read less" : "Read more..."}
          </button>
        )}
      </div>

      <div className="mt-6 flex border-b border-border">
        {(["chapters", "description"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => vm.setActiveTab(tab)}
            className={cn(
              "flex-1 pb-2 text-sm font-medium capitalize transition-colors",
              vm.activeTab === tab
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground"
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {vm.activeTab === "chapters" ? (
        <div className="mt-2">
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["all", "file", "video", "downloaded"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => vm.setChapterFilter(filter)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                  vm.chapterFilter === filter
                    ? "bg-accent text-white"
                    : "border border-border bg-background text-foreground hover:bg-muted"
                )}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {vm.displayedChapters.map((chapter) => (
            <ChapterRow
              key={chapter.number}
              chapter={chapter}
              onToggle={vm.toggleChapter}
              onDownload={vm.handleDownloadChapter}
            />
          ))}

          {vm.filteredChapters.length > 10 && (
            <button
              type="button"
              onClick={() => vm.setIsChaptersExpanded((prev) => !prev)}
              className="mt-3 w-full rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              {vm.isChaptersExpanded
                ? `Show less (${vm.filteredChapters.length - 10} hidden)`
                : `Expand all (${vm.filteredChapters.length - 10} more)`}
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
