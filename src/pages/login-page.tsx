import { LoginForm } from "@/components/login-form"
import logoWithText from "@/assets/logo-with-text.jpg"

export default function LoginPage() {
  return (
    <>
      <div className="text-center">
        <img src={logoWithText} alt="Teleo Logo" className="mx-auto w-56" />
      </div>

      <LoginForm />
    </>
  )
}
