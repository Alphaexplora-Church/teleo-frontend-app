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
import logoWithText from "@/assets/logo-with-text.jpg"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <div className="text-center">
        <img src={logoWithText} alt="Teleo Logo" className="mx-auto w-[402px]" />
      </div>

      <div className={cn("flex flex-col gap-6")}>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="contact">
                Email Address or Phone Number
              </FieldLabel>
              <Input
                id="contact"
                type="text"
                placeholder="Email or Phone Number"
                required
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
                  required
                  className="pr-10"
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
                href="/forgot-password"
                className="ml-auto inline-block text-sm text-blue-500 underline underline-offset-4"
              >
                Forgot Password
              </a>
            </Field>
            <Field>
              <Button type="submit" size="lg" className="rounded-full">Login</Button>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <a href="/signup" className="text-blue-500 underline">
                  Sign in
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </>
  )
}
