// src/layouts/MainLayout.jsx
import { Outlet } from "react-router"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TooltipProvider } from "../ui/tooltip"
import { SidebarSwipeHandler } from "@/components/sidebar-swipe-handler"

const MainLayout = () => {
  return (
    <SidebarProvider>
      {/* Attaches swipe-to-open/close gesture for mobile */}
      <SidebarSwipeHandler />
      {/* Wrap everything that might use a Tooltip here */}
      <TooltipProvider>
        <AppSidebar />
        <div className="app-containercontent flex min-h-svh w-full items-center justify-center p-10 md:p-10">
          <main className="w-full max-w-sm">
            <Outlet />
          </main>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  )
}

export default MainLayout
