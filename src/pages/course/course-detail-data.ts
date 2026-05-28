export type Chapter = {
  number: number
  title: string
  duration: string
  completed: boolean
  type: "file" | "video"
  downloaded?: boolean
}

export type Attachment = {
  id: string
  name: string
  size: string
  type: "pdf" | "image" | "other"
}

export type CourseDetail = {
  title: string
  author: string
  date: string
  progress: number
  totalChapters: number
  currentChapter: number
  about: string
  tags: string[]
  chapters: Chapter[]
  attachments: Attachment[]
  relatedTopics: string[]
}

export const MOCK_COURSE: CourseDetail = {
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
