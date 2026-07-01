import { useState } from "react"
import { useNavigate } from "react-router"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar-context"
import { ROUTES } from "@/lib/routes"
import logo from "@/assets/logo.png"
import { DoorOpen } from "lucide-react"

export function LogoutButton() {
  const [open, setOpen] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)
  const navigate = useNavigate()
  const { setOpen: setSidebarOpen, setOpenMobile } = useSidebar()

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!isOpen) setLoggedOut(false)
  }

  function closeSidebar() {
    setSidebarOpen(false)
    setOpenMobile(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* asChild prevents the Trigger from rendering its own button tag */}
      <DialogTrigger asChild className="justify-end">
        <Button variant="ghost" className="text-red-500">
          <div className="flex flex-row gap-2">
          Log Out
          <DoorOpen />
          </div>

        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="flex justify-center">
          <img src={logo} className="w-[103px]" alt="Teleo Logo" />
        </div>

        {loggedOut ? (
          <>
            <DialogHeader className="text-center">
              <DialogTitle>Logged Out Successfully</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center gap-4">
              <span className="text-sm text-muted-foreground text-center">
                We're hoping to see you again soon!
              </span>
              <Button className="w-full" onClick={() => { setOpen(false); closeSidebar(); navigate(ROUTES.login) }}>
                Confirm
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="text-center">
              <DialogTitle>Are you sure you want to sign out?</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col justify-end gap-2">
              <Button variant="destructive" onClick={() => setLoggedOut(true)}>
                Yes
              </Button>
              <div className="flex items-center">
                <hr className="grow border-t border-primary" />
                <span className="mx-2 text-xs text-primary">or</span>
                <hr className="grow border-t border-primary" />
              </div>
              <Button variant="outline" onClick={() => { setOpen(false); closeSidebar() }}>No</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
