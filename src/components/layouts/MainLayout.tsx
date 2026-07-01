import { Outlet } from "react-router"
import { TooltipProvider } from "../ui/tooltip"

const MainLayout = () => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full justify-center bg-background px-4 py-6 sm:px-6 lg:px-8">
        <main className="w-full max-w-3xl">
          <Outlet />
        </main>
      </div>
    </TooltipProvider>
  )
}

export default MainLayout
