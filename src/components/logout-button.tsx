import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import logo from "@/assets/logo.png"

export function LogoutButton() {
  return (
    <Dialog>
      {/* asChild prevents the Trigger from rendering its own button tag */}
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-red-500">
          Log Out
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className="flex justify-center">
          <img src={logo} className="w-[103px]" alt="Teleo Logo" />
        </div>

        <DialogHeader className="text-center">
          <DialogTitle>Are you sure you want to sign out?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-end gap-2">
          {/* Your logout logic would go here */}
          <Button variant="destructive">Yes</Button>
          <div className="flex items-center">
            <hr className="grow border-t border-primary" />
            <span className="mx-2 text-xs text-primary">or</span>
            <hr className="grow border-t border-primary" />
          </div>
          <Button variant="outline">No</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
