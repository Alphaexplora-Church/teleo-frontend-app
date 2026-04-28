import { LoginForm } from "@/components/login-form"
import logo from "@/assets/logo.png"

export default function LoginPage() {
  return (
    <>
      <div className="pb-8 text-center">
        <img src={logo} alt="Teleo Logo" className="mx-auto size-32" />
        <span className="text-4xl font-bold tracking-widest text-primary">
          TELEO
        </span>
      </div>

      <LoginForm />
    </>
  )
}
