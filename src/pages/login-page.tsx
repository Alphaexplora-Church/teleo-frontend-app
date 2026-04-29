import { LoginForm } from "@/components/login-form"
import logoWithText from "@/assets/logo-with-text.png"

export default function LoginPage() {
  return (
    <>
      <div className="text-center">
        <img src={logoWithText} alt="Teleo Logo" className="mx-auto" />
      </div>

      <LoginForm />
    </>
  )
}
