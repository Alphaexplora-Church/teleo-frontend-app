import { Outlet } from "react-router"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TooltipProvider } from "../ui/tooltip"
import { SidebarSwipeHandler } from "@/components/sidebar-swipe-handler"

const AuthenticatedLayout = () => {
  return (
    <SidebarProvider>
      <SidebarSwipeHandler />
      <TooltipProvider>
        <AppSidebar />
        <SidebarInset className="flex min-h-screen w-full flex-1 md:pl-[16rem]">
          <div className="mx-auto flex w-full max-w-[90rem] flex-col px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  )
}

export default AuthenticatedLayout
