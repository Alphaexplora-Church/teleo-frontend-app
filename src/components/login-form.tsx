import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
            />
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
  )
}
