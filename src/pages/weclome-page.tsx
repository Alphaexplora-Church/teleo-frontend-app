import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import logo from "@/assets/logo.png"

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 1000)
    const t2 = setTimeout(() => onDone(), 1600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-background transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <img src={logo} alt="Teleo Logo" />
    </div>
  )
}

export default function WelcomePage() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      <div className="space-y-8 text-center">
        <img src={logo} alt="Teleo Logo" className="mx-auto text-primary" />
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
    </>
  )
}
