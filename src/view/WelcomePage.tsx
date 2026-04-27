import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function WelcomePage() {
  return (
    <div className="text-center">
      <h1 className="max-w-2xl">Welcome to Teleo!</h1>
      <div className="flex flex-col gap-4">
        <Button asChild>
          <Link to="/signup">Create a new Account</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/login">Log In</Link>
        </Button>
        <Button asChild>
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
