import { useMemo, useState } from "react"
import {
  BOTTOM_NAV,
  HISTORY_ITEMS,
  HISTORY_TABS,
  SECTIONS,
  TABS,
  UPCOMING_EVENTS,
  type Tab,
} from "./model/library-data"

export function useLibraryViewModel() {
  const [activeTab, setActiveTab] = useState<Tab>("library")
  const [activeHistoryTab, setActiveHistoryTab] = useState<
    (typeof HISTORY_TABS)[number]["id"]
  >(HISTORY_TABS[0].id)
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredHistoryItems = useMemo(() => {
    return HISTORY_ITEMS.filter((item) =>
      activeHistoryTab === "main" ? true : item.type === activeHistoryTab
    )
  }, [activeHistoryTab])

  const sortedHistoryItems = useMemo(() => {
    return [...filteredHistoryItems].sort((a, b) =>
      sortOrder === "asc" ? a.number - b.number : b.number - a.number
    )
  }, [filteredHistoryItems, sortOrder])

  return {
    activeTab,
    setActiveTab,
    activeHistoryTab,
    setActiveHistoryTab,
    sortOrder,
    setSortOrder,
    sections: SECTIONS,
    upcomingEvents: UPCOMING_EVENTS,
    historyTabs: HISTORY_TABS,
    historyItems: sortedHistoryItems,
    tabs: TABS,
    bottomNav: BOTTOM_NAV,
  }
}
