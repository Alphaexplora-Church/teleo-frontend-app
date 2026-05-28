import { type MouseEvent } from "react"
import { useNavigate, useLocation } from "react-router"
import {
  Paperclip,
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
import type { Attachment, Chapter } from "./course-detail-data"

const BOTTOM_NAV = [
  { icon: Home, label: "Home", href: "/" },
  { icon: HeartHandshake, label: "Support", href: "/support" },
  { icon: Megaphone, label: "Announcements", href: "/announcements" },
  { icon: BookMarked, label: "Library", href: "/landing" },
  { icon: CircleUser, label: "Profile", href: "/profile" },
] as const

export function BottomNav() {
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

export function AttachmentIcon({ type }: { type: Attachment["type"] }) {
  if (type === "pdf")
    return <FileText className="size-5 shrink-0 text-destructive" aria-hidden />
  if (type === "image")
    return <Image className="size-5 shrink-0 text-accent" aria-hidden />
  return (
    <Paperclip className="size-5 shrink-0 text-muted-foreground" aria-hidden />
  )
}

export function AttachmentsDialog({
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

export function AttachmentPreviewDialog({
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
            <div
              className="aspect-3/4 w-full rounded-lg bg-muted"
              aria-label="File preview"
            />
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

export function getChapterTypeLabel(chapter: Chapter): string {
  return chapter.type === "file" ? "PDF File" : "Video"
}

export function ChapterRow({
  chapter,
  onToggle,
  onDownload,
}: {
  chapter: Chapter
  onToggle: (number: number) => void
  onDownload?: (number: number) => void
}) {
  const handleDownloadClick = (e: MouseEvent<HTMLButtonElement>) => {
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

export function RelatedCard({ label }: { label: string }) {
  return (
    <div className="flex w-20 shrink-0 flex-col items-center gap-1.5">
      <div className="aspect-square w-full rounded-xl bg-muted" />
      <span className="line-clamp-2 text-center text-xs leading-tight text-muted-foreground">
        {label}
      </span>
    </div>
  )
}
