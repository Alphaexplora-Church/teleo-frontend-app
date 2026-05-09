import { useSwipeSidebar } from "@/hooks/use-swipe-sidebar"
import { useSidebar } from "@/components/ui/sidebar"

/**
 * Renderless component — must live inside <SidebarProvider>.
 * Enables drag-to-open / drag-to-close for both touch (mobile) and mouse (desktop).
 */
export function SidebarSwipeHandler() {
  const { open, openMobile, setOpen, setOpenMobile, isMobile } = useSidebar()

  useSwipeSidebar({
    isOpen: isMobile ? openMobile : open,
    onSwipeOpen: () => (isMobile ? setOpenMobile(true)  : setOpen(true)),
    onSwipeClose: () => (isMobile ? setOpenMobile(false) : setOpen(false)),
  })

  return null
}
