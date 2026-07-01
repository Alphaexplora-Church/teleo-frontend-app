import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "react-router"
import logoWithText from "@/assets/logo-with-text.jpg"
import { Eye, EyeOff } from "lucide-react"
import { ROUTES } from "@/lib/routes"
import { useLogin } from "./useLogin"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { credentials, loading, error, handleChange, handleSubmit } = useLogin()

  return (
    <>
      <div className="text-center">
        <img src={logoWithText} alt="Teleo Logo" className="mx-auto w-[402px]" />
      </div>

      <div className={cn("flex flex-col gap-6")}>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="contact">
                Email Address or Phone Number
              </FieldLabel>
              <Input
                id="contact"
                type="text"
                value={credentials.email}
                placeholder="Email or Phone Number"
                required
                onChange={(event) => handleChange("email", event.target.value)}
              />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={credentials.password}
                  required
                  className="pr-10"
                  onChange={(event) => handleChange("password", event.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <a
                href={ROUTES.forgotPassword}
                className="ml-auto inline-block text-sm text-blue-500 underline underline-offset-4"
              >
                Forgot Password
              </a>
            </Field>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Field>
              <Button type="submit" size="lg" className="rounded-full" disabled={loading}>
                {loading ? "Signing in…" : "Login"}
              </Button>
              <FieldDescription className="text-center">
                Don’t have an account?{" "}
                <Link to={ROUTES.signup} className="text-blue-500 underline">
                  Sign up
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  )
}
