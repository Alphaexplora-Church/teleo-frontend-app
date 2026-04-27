import { useState, useEffect } from "react"
import { Mars, Plus, Venus, VenusAndMars } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import z from "zod"

// Added 'terms' and a password match refinement to your schema
const formSchema = z
  .object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    birthday: z.string().min(1, "Please enter your birthday"),
    gender: z.string().min(1, "Please select your gender"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must not exceed 20 characters"),
    area: z.string().min(2, "Please enter your area"),
    email: z.email("Please enter a valid email address"),
    phone: z
      .string()
      .min(11, "Please enter a valid phone number")
      .max(16, "Phone number must not exceed 16 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(6, "Please confirm your password"),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms"),
    otp: z.string().length(6, "OTP must be a 6-digit number"),
    avatar_upload: z.any().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  })

// Map which fields belong to which step index
const stepFields: (keyof z.infer<typeof formSchema>)[][] = [
  ["first_name", "last_name"], // Step 0
  ["birthday"], // Step 1
  ["gender"], // Step 2
  ["username"], // Step 3
  ["area"], // Step 4
  ["email", "phone"], // Step 5
  ["password", "confirm_password", "terms"], // Step 6
  ["otp"], // Step 7
  ["avatar_upload"], // Step 8
]

// Types for passing state into sub-forms
type FormProps = {
  formData: any
  setFormData: React.Dispatch<React.SetStateAction<any>>
  errors: Record<string, string>
}

// --- SUB-FORMS ---

function NameForm({ formData, setFormData, errors }: FormProps) {
  return (
    <form className="space-y-4">
      <FieldGroup>
        <Field>
          <Input
            id="first_name"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          {errors.first_name && (
            <p className="text-sm text-red-500">{errors.first_name}</p>
          )}
        </Field>
        <Field>
          <Input
            id="last_name"
            type="text"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          {errors.last_name && (
            <p className="text-sm text-red-500">{errors.last_name}</p>
          )}
        </Field>
      </FieldGroup>
    </form>
  )
}

function BirthdayForm({ formData, setFormData, errors }: FormProps) {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input
            id="birthday"
            type="date"
            value={formData.birthday}
            onChange={(e) =>
              setFormData({ ...formData, birthday: e.target.value })
            }
          />
          {errors.birthday && (
            <p className="text-sm text-red-500">{errors.birthday}</p>
          )}
        </Field>
      </FieldGroup>
    </form>
  )
}

function GenderForm({ formData, setFormData, errors }: FormProps) {
  const baseStyle =
    "flex h-16 w-16 items-center justify-center rounded-full border-2 transition-colors"

  const getStyle = (value: string) =>
    `${baseStyle} ${
      formData.gender === value
        ? "border-primary bg-primary"
        : "border-gray-300 hover:border-primary bg-gray-500"
    }`

  const getIconStyle = (value: string) =>
    formData.gender === value ? "text-primary-foreground" : "text-white"

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className={getStyle("male")}
          onClick={() => setFormData({ ...formData, gender: "male" })}
          title="Male"
        >
          <Mars className={`h-8 w-8 ${getIconStyle("male")}`} />
        </button>
        <button
          type="button"
          className={getStyle("both")}
          onClick={() => setFormData({ ...formData, gender: "both" })}
          title="Male and Female"
        >
          <VenusAndMars className={`h-8 w-8 ${getIconStyle("both")}`} />
        </button>
        <button
          type="button"
          className={getStyle("female")}
          onClick={() => setFormData({ ...formData, gender: "female" })}
          title="Female"
        >
          <Venus className={`h-8 w-8 ${getIconStyle("female")}`} />
        </button>
      </div>
      {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
    </div>
  )
}

function UsernameForm({ formData, setFormData, errors }: FormProps) {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input
            id="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}
        </Field>
      </FieldGroup>
    </form>
  )
}

function LocationForm({ formData, setFormData, errors }: FormProps) {
  return (
    <form>
      <FieldGroup>
        <Field>
          <Input
            id="area"
            type="text"
            placeholder="Select your area"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          />
          {errors.area && <p className="text-sm text-red-500">{errors.area}</p>}
        </Field>
      </FieldGroup>
    </form>
  )
}

function ContactForm({ formData, setFormData, errors }: FormProps) {
  return (
    <form className="space-y-4">
      <FieldGroup>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Field>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </Field>

        <FieldLabel htmlFor="phone">Phone</FieldLabel>
        <Field>
          <Input
            id="phone"
            type="tel"
            placeholder="+63 123 456 7890"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </Field>
      </FieldGroup>
    </form>
  )
}

function PasswordForm({ formData, setFormData, errors }: FormProps) {
  return (
    <form className="space-y-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm_password">Confirm Password</FieldLabel>
          <Input
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={(e) =>
              setFormData({ ...formData, confirm_password: e.target.value })
            }
          />
          {errors.confirm_password && (
            <p className="text-sm text-red-500">{errors.confirm_password}</p>
          )}
        </Field>
        <div>
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              id="terms"
              checked={formData.terms}
              onChange={(e) =>
                setFormData({ ...formData, terms: e.target.checked })
              }
            />
            <label htmlFor="terms" className="ml-2 text-xs text-gray-600">
              I have read and accept the{" "}
              <Link to="/terms" className="text-blue-500 underline">
                terms and conditions and the privacy policy.
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="mt-2 text-sm text-red-500">{errors.terms}</p>
          )}
        </div>
      </FieldGroup>
    </form>
  )
}

function OTPForm({ formData, setFormData, errors }: FormProps) {
  const handleOtpChange = (index: number, value: string) => {
    const newOtp = formData.otp.split("")
    newOtp[index] = value
    setFormData({ ...formData, otp: newOtp.join("").padEnd(6, "").slice(0, 6) })
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex justify-center gap-2">
        {[...Array(6)].map((_, i) => (
          <Input
            key={i}
            className="h-12 w-12 text-center text-lg sm:h-14 sm:w-14"
            maxLength={1}
            value={formData.otp[i] || ""}
            onChange={(e) => handleOtpChange(i, e.target.value)}
          />
        ))}
      </div>
      {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}
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

function AvatarUploadForm({ formData, setFormData, errors }: FormProps) {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <label
        htmlFor="avatar_upload"
        className="relative flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-blue-500 hover:bg-gray-100"
      >
        <span className="sr-only">Upload avatar</span>
        <Plus className="h-8 w-8 text-gray-400" />
        <input
          id="avatar_upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            setFormData({ ...formData, avatar_upload: e.target.files?.[0] })
          }
        />
      </label>
      {formData.avatar_upload && (
        <p className="mt-2 text-sm text-green-600">File selected</p>
      )}
    </div>
  )
}

// --- SETUP ARRAY ---
type SignupStep = {
  title: string
  description: string
  Content: React.FC<FormProps>
  buttonText?: string
}

const signupSteps: SignupStep[] = [
  { title: "Hello!", description: "What's your name?", Content: NameForm },
  {
    title: "When's your birthday?",
    description: "We'd love to know!",
    Content: BirthdayForm,
  },
  {
    title: "How do you identify as?",
    description: "We want to be respectful!",
    Content: GenderForm,
  },
  {
    title: "How should we call you?",
    description: "Give yourself a cool nickname",
    Content: UsernameForm,
  },
  {
    title: "Where are you based?",
    description: "Where did you plant your roots?",
    Content: LocationForm,
  },
  {
    title: "Let's keep in touch!",
    description: "You'll need this to login",
    Content: ContactForm,
  },
  {
    title: "We're almost done!",
    description: "Secure your account with a password.",
    Content: PasswordForm,
  },
  {
    title: "We've sent a code to your email!",
    description: "Enter the six digit code.",
    Content: OTPForm,
  },
  {
    title: "Lastly, put a face to the name!",
    description: "Upload a photo.",
    Content: AvatarUploadForm,
    buttonText: "Upload",
  },
]

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showSplash, setShowSplash] = useState(true)
  const [fadeSplash, setFadeSplash] = useState(false)

  // Central Form State
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    username: "",
    area: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    terms: false,
    otp: "",
    avatar_upload: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeSplash(true), 1000)
    const timer2 = setTimeout(() => setShowSplash(false), 1500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleNext = () => {
    // 1. Identify which fields are required for the current step
    const currentFields = stepFields[currentStep]

    // 2. Validate the full form state against Zod
    const result = formSchema.safeParse(formData)

    if (!result.success) {
      // 3. Filter errors so we only stop the user if an error exists on the CURRENT step
      const currentStepErrors: Record<string, string> = {}
      let hasCurrentStepError = false

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string
        if (currentFields.includes(fieldName as any)) {
          currentStepErrors[fieldName] = issue.message
          hasCurrentStepError = true
        }
      })

      if (hasCurrentStepError) {
        setErrors(currentStepErrors)
        return // Stop them from proceeding
      }
    }

    // 4. If validation passes for this step, clear errors and proceed
    setErrors({})
    if (currentStep < signupSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      console.log("Signup complete! Final Payload:", formData)
      // Execute final API call here
    }
  }

  const CurrentFormContent = signupSteps[currentStep].Content

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
        <h1 className="text-3xl font-bold">{signupSteps[currentStep].title}</h1>
        <h2>{signupSteps[currentStep].description}</h2>

        <div className="py-8">
          <CurrentFormContent
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        </div>

        <Button
          className="w-full shadow-2xl shadow-gray-500"
          onClick={handleNext}
        >
          {signupSteps[currentStep].buttonText ||
            (currentStep < signupSteps.length - 1 ? "Next" : "Submit")}
        </Button>
      </div>
    </>
  )
}
