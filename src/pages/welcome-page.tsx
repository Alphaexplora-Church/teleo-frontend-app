import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import logo from "@/assets/logo.png"
import googleLogo from "@/assets/google.svg"


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
      <img src={logo} className="w-[215px]" alt="Teleo Logo" />
    </div>
  )
}

export default function WelcomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const [animate, setAnimate] = useState(false)

  return (
    <>
      {showSplash && <SplashScreen onDone={() => { setShowSplash(false); setAnimate(true) }} />}
      <div className="space-y-8 text-center"  >
        <img
          src={logo}
          alt="Teleo Logo"
          className={`mx-auto text-primary w-[235px] transition-all duration-700 ease-out ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        />
        <h1
          className={`text-2xl font-semibold transition-all duration-700 ease-out delay-100 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          Welcome to Teleo!
        </h1>
        <div
          className={`flex flex-col gap-4 transition-all duration-700 ease-out delay-200 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        >
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
          <Button variant="outline" className="rounded-full" size="lg">
            <img src={googleLogo} alt="Google" className="size-5 mr-1" />
            Sign in with Google
          </Button>
        </div>

        <span
          className={`transition-all duration-700 ease-out delay-300 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        >
          Dont have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Sign Up
          </Link>
        </span>
      </div>
    </>
  )
}
