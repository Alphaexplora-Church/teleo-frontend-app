import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import logo from "@/assets/logo.png"

export default function WelcomePage() {
  return (
    <div className="space-y-8 text-center">
      <img src={logo} alt="Teleo Logo" className="mx-auto size-32" />
      <h1 className="text-2xl font-semibold">Welcome to Teleo!</h1>
      <div className="flex flex-col gap-4">
        <Button className="rounded-full" size="lg" asChild>
          <Link to="/signup">Create a new Account</Link>
        </Button>
        <Button
          variant="secondary"
          className="rounded-full border-2 border-primary"
          size="lg"
          asChild
        >
          <Link to="/login">Log In</Link>
        </Button>
        <div className="flex items-center">
          <hr className="grow border-t" />
          <span className="mx-2 text-xs text-gray-500">OR</span>
          <hr className="grow border-t" />
        </div>
        <Button className="rounded-full" size="lg" asChild>
          <Link to="/guest">Continue as Guest</Link>
        </Button>
      </div>

      <span>
        Registered Church?{" "}
        <Link to="/signup" className="text-blue-500 underline">
          Sign Up
        </Link>
      </span>
    </div>
  )
}
