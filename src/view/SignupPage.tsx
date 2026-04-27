import { useState, useEffect, type ReactNode } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function NameForm() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input
            id="first_name"
            type="name"
            placeholder="First Name"
            required
          />
        </Field>
        <Field>
          <Input id="last_name" type="name" placeholder="Last Name" required />
        </Field>
      </FieldGroup>
    </form>
  )
}

function BirthdayForm() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input id="birthday" type="date" required />
        </Field>
      </FieldGroup>
    </form>
  )
}

function GenderForm() {
  return (
    <div className="flex justify-center gap-4">
      <button
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-300 transition-colors hover:border-blue-500"
        title="Male"
      >
        ♂
      </button>
      <button
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-300 transition-colors hover:border-blue-500"
        title="Male and Female"
      >
        ♂♀
      </button>
      <button
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-300 transition-colors hover:border-blue-500"
        title="Female"
      >
        ♀
      </button>
    </div>
  )
}

function UsernameForm() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input id="username" type="text" placeholder="Username" required />
        </Field>
      </FieldGroup>
    </form>
  )
}

function LocationForm() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input
            id="area"
            type="text"
            placeholder="Select your area"
            required
          />
        </Field>
      </FieldGroup>
    </form>
  )
}

function ContactForm() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input id="email" type="email" placeholder="Email" required />
        </Field>
        <Field>
          <Input id="phone" type="tel" placeholder="Phone Number" required />
        </Field>
      </FieldGroup>
    </form>
  )
}

function PasswordForm() {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            required
          />
        </Field>
        <Field>
          <Input
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
          />
        </Field>
      </FieldGroup>
    </form>
  )
}

function OTPForm() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-center gap-2">
        {[...Array(6)].map((_, i) => (
          <Input
            key={i}
            className="h-12 w-12 text-center text-lg sm:h-14 sm:w-14"
            maxLength={1}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Haven't got the code yet?{" "}
        <a
          href="#"
          className="font-medium text-blue-500 underline hover:text-blue-700"
          onClick={(e) => e.preventDefault()}
        >
          Resend code
        </a>
      </p>
    </div>
  )
}

function AvatarUploadForm() {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <label
        htmlFor="avatar-upload"
        className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-blue-500 hover:bg-gray-100"
      >
        <span className="sr-only">Upload avatar</span>
        <Plus className="h-8 w-8 text-gray-400" />
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
        />
      </label>
    </div>
  )
}

type SignupStep = {
  title: string
  description: string
  content: ReactNode
  buttonText?: string
}

const signup: SignupStep[] = [
  {
    title: "Hello!",
    description: "A simple signup page that asks for the user's name.",
    content: <NameForm />,
  },
  {
    title: "When's your birthday?",
    description: "We'd love to know!",
    content: <BirthdayForm />,
  },
  {
    title: "How do you identify as?",
    description: "We want to be respectful!",
    content: <GenderForm />,
  },
  {
    title: "How should we call you?",
    description: "Give yourself a cool nickname",
    content: <UsernameForm />,
  },
  {
    title: "Where are you based?",
    description: "Where did you plant your roots?",
    content: <LocationForm />,
  },
  {
    title: "Let's keep in touch!",
    description: "You'll need this to login",
    content: <ContactForm />,
  },
  {
    title: "We're almost done!",
    description: "Secure your account with a password.",
    content: <PasswordForm />,
  },
  {
    title: "We've sent a code to your email!",
    description:
      "Enter the six digit code generated by your authentication app.",
    content: <OTPForm />,
  },
  {
    title: "Lastly, put a face to the name!",
    description: "Upload a photo to personalize your profile.",
    content: <AvatarUploadForm />,
    buttonText: "Upload",
  },
]

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showSplash, setShowSplash] = useState(true)
  const [fadeSplash, setFadeSplash] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeSplash(true), 1500)
    const timer2 = setTimeout(() => setShowSplash(false), 2000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < signup.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log("Signup complete")
    }
  }

  return (
    <>
      {showSplash && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-linear-to-tr from-[#024083] via-[#1067b5] to-[#4096da] transition-opacity duration-500 ${
            fadeSplash ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Top Shapes */}
          <div className="absolute top-0 left-0 h-[50vh] w-full">
            <svg
              className="absolute top-0 left-0 h-full w-full object-cover"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,0 L100,0 L100,20 C70,60 60,10 40,30 C20,50 10,60 0,55 Z"
                fill="#2e7bbf"
                opacity="0.8"
                style={{ filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.2))" }}
              />
              <path
                d="M0,0 L100,0 L100,40 C70,90 50,40 20,45 C10,48 5,55 0,70 Z"
                fill="#054b8c"
                style={{ filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.3))" }}
              />
            </svg>
          </div>

          {/* Bottom Shapes */}
          <div className="absolute bottom-0 left-0 h-[50vh] w-full">
            <svg
              className="absolute bottom-0 left-0 h-full w-full object-cover"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,100 L100,100 L100,80 C70,40 60,90 40,70 C20,50 10,40 0,45 Z"
                fill="#2e7bbf"
                opacity="0.8"
                style={{
                  filter: "drop-shadow(0px -10px 10px rgba(0,0,0,0.2))",
                }}
              />
              <path
                d="M0,100 L100,100 L100,60 C70,10 50,60 20,55 C10,52 5,45 0,30 Z"
                fill="#054b8c"
                style={{
                  filter: "drop-shadow(0px -10px 10px rgba(0,0,0,0.3))",
                }}
              />
            </svg>
          </div>

          <h1 className="z-10 text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
            Hello!
          </h1>
        </div>
      )}

      {/* Main Form content */}
      <div
        className="space-y-8 text-center"
        style={{ display: showSplash ? "none" : "block" }}
      >
        <h1 className="text-3xl">{signup[currentStep].title}</h1>
        <h2>{signup[currentStep].description}</h2>

        <div className="py-8">{signup[currentStep].content}</div>

        <Button className="w-full" onClick={handleNext}>
          {signup[currentStep].buttonText ||
            (currentStep < signup.length - 1 ? "Next" : "Submit")}
        </Button>
      </div>
    </>
  )
}
