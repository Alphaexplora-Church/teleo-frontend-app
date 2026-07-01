import { useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { MOCK_COURSE } from "../course-detail.model"
import type { Attachment, Chapter, CourseDetail } from "../course-detail.model"

export function useCourseDetailViewModel() {
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

  const completedCount = useMemo(
    () => chapters.filter((chapter) => chapter.completed).length,
    [chapters]
  )

  const progress = useMemo(
    () => Math.round((completedCount / chapters.length) * 100),
    [completedCount, chapters.length]
  )

  const currentChapter = completedCount

  const course: CourseDetail = useMemo(
    () => ({
      ...MOCK_COURSE,
      chapters,
      progress,
      currentChapter,
      totalChapters: chapters.length,
    }),
    [chapters, progress, currentChapter]
  )

  const filteredChapters = useMemo(() => {
    switch (chapterFilter) {
      case "file":
        return chapters.filter((chapter) => chapter.type === "file")
      case "video":
        return chapters.filter((chapter) => chapter.type === "video")
      case "downloaded":
        return chapters.filter((chapter) => chapter.downloaded)
      case "all":
      default:
        return chapters
    }
  }, [chapterFilter, chapters])

  const displayedChapters = useMemo(() => {
    if (!isChaptersExpanded && filteredChapters.length > 10) {
      return filteredChapters.slice(0, 10)
    }
    return filteredChapters
  }, [filteredChapters, isChaptersExpanded])

  const goBack = () => navigate(-1)

  const toggleChapter = (number: number) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.number === number
          ? { ...chapter, completed: !chapter.completed }
          : chapter
      )
    )
  }

  const handleDownloadChapter = (number: number) => {
    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.number === number
          ? { ...chapter, downloaded: !chapter.downloaded }
          : chapter
      )
    )
    console.log(`Downloading chapter ${number}...`)
  }

  const toggleBookmark = () => {
    setBookmarked((prev) => !prev)
  }

  const openAttachments = () => setAttachmentsOpen(true)
  const closeAttachments = () => setAttachmentsOpen(false)
  const selectAttachment = (attachment: Attachment | null) =>
    setSelectedAttachment(attachment)

  const toggleFullAbout = () => setShowFullAbout((prev) => !prev)

  return {
    activeTab,
    setActiveTab,
    attachmentsOpen,
    selectedAttachment,
    chapterFilter,
    isChaptersExpanded,
    showFullAbout,
    bookmarked,
    chapters,
    course,
    progress,
    currentChapter,
    filteredChapters,
    displayedChapters,
    goBack,
    toggleChapter,
    handleDownloadChapter,
    toggleBookmark,
    openAttachments,
    closeAttachments,
    selectAttachment,
    setAttachmentsOpen,
    setSelectedAttachment,
    setChapterFilter,
    setIsChaptersExpanded,
    toggleFullAbout,
  }
}
