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
      {showSplash && (
        <SplashScreen
          onDone={() => {
            setShowSplash(false)
            setAnimate(true)
          }}
        />
      )}
      <div className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center space-y-8 text-center">
        <img
          src={logo}
          alt="Teleo Logo"
          className={`mx-auto w-[170px] text-primary transition-all duration-700 ease-out ${
            animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        />
        <h1
          className={`text-2xl font-semibold transition-all delay-100 duration-700 ease-out ${
            animate ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          Welcome to Teleo!
        </h1>
        <div
          className={`flex w-full flex-col gap-4 transition-all delay-200 duration-700 ease-out ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button size="lg" asChild>
            <Link to="/signup">Create a new Account</Link>
          </Button>
          <Button
            variant="outline"
            className="border-[0.1px] border-primary"
            size="lg"
            asChild
          >
            <Link to="/login" className="text-black">
              Log In
            </Link>
          </Button>
          <div className="flex items-center">
            <hr className="grow border-t border-primary" />
            <span className="mx-2 text-xs text-primary">OR</span>
            <hr className="grow border-t border-primary" />
          </div>
          <Button
            variant="outline"
            className="border-2 border-gray-400 shadow-sm"
            size="lg"
          >
            <img src={googleLogo} alt="Google" className="mr-1 size-5" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </>
  )
}
