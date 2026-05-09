import * as React from "react"

const EDGE_THRESHOLD = 30   // px from left edge to begin an open gesture
const MIN_DRAG_DISTANCE = 50 // minimum horizontal travel to register as a drag

interface UseSwipeSidebarOptions {
  onSwipeOpen: () => void
  onSwipeClose: () => void
  isOpen: boolean
}

export function useSwipeSidebar({
  onSwipeOpen,
  onSwipeClose,
  isOpen,
}: UseSwipeSidebarOptions) {
  const startX = React.useRef<number | null>(null)
  const startY = React.useRef<number | null>(null)

  // ── Shared resolution logic ──────────────────────────────────────────────
  const resolve = React.useCallback(
    (endX: number, endY: number) => {
      if (startX.current === null || startY.current === null) return

      const deltaX = endX - startX.current
      const deltaY = endY - startY.current

      // Ignore mostly-vertical movement
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        startX.current = null
        startY.current = null
        return
      }

      const isDragRight = deltaX > MIN_DRAG_DISTANCE
      const isDragLeft  = deltaX < -MIN_DRAG_DISTANCE

      if (isDragRight && startX.current <= EDGE_THRESHOLD && !isOpen) {
        onSwipeOpen()
      }

      if (isDragLeft && isOpen) {
        onSwipeClose()
      }

      startX.current = null
      startY.current = null
    },
    [isOpen, onSwipeOpen, onSwipeClose]
  )

  // ── Touch events (mobile) ────────────────────────────────────────────────
  const handleTouchStart = React.useCallback((e: TouchEvent) => {
    startX.current = e.touches[0].clientX
    startY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = React.useCallback(
    (e: TouchEvent) => resolve(e.changedTouches[0].clientX, e.changedTouches[0].clientY),
    [resolve]
  )

  // ── Mouse events (desktop) ───────────────────────────────────────────────
  const handleMouseDown = React.useCallback((e: MouseEvent) => {
    // Only primary button; ignore clicks inside interactive elements
    if (e.button !== 0) return
    startX.current = e.clientX
    startY.current = e.clientY
  }, [])

  const handleMouseUp = React.useCallback(
    (e: MouseEvent) => resolve(e.clientX, e.clientY),
    [resolve]
  )

  React.useEffect(() => {
    // Touch
    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchend",   handleTouchEnd,   { passive: true })
    // Mouse
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup",   handleMouseUp)

    return () => {
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend",   handleTouchEnd)
      document.removeEventListener("mousedown",  handleMouseDown)
      document.removeEventListener("mouseup",    handleMouseUp)
    }
  }, [handleTouchStart, handleTouchEnd, handleMouseDown, handleMouseUp])
}
