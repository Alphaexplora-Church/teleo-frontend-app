import type { ElementType } from "react"
import {
  ArrowUpDown,
  BookOpen,
  BookMarked,
  Download,
  Clock,
} from "lucide-react"

export type Tab = "library" | "bookshelf" | "downloads" | "history"
export type ContentItem = {
  title: string
  subtitle: string
  duration: string
}
export type EventItem = {
  title: string
  date: string
  location: string
  description: string
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

export const UPCOMING_EVENTS: EventItem[] = [
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

export const SECTIONS: Record<Tab, Section[]> = {
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
        { title: "Letters of Paul", subtitle: "Reading", duration: "4h 10min" },
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
        { title: "Knowing God", subtitle: "J.I. Packer", duration: "9h 15min" },
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

export const HISTORY_TABS = [
  { id: "main", label: "Main" },
  { id: "video", label: "Video" },
  { id: "file", label: "Files" },
] as const

export const HISTORY_ITEMS: HistoryItem[] = [
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

export const TABS: { id: Tab; label: string; icon: ElementType }[] = [
  { id: "library", label: "Library", icon: BookOpen },
  { id: "bookshelf", label: "Bookshelf", icon: BookMarked },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "history", label: "History", icon: Clock },
]

export const BOTTOM_NAV = [
  { icon: BookOpen, label: "Home", href: "/" },
  { icon: BookMarked, label: "Support", href: "/support" },
  { icon: ArrowUpDown, label: "Announcements", href: "/announcements" },
  { icon: BookMarked, label: "Library", href: "/library" },
  { icon: BookOpen, label: "Profile", href: "/profile" },
]
