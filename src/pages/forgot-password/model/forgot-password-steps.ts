import ContactForm from "../components/contact-form"
import PasswordForm from "../components/password-form"
import OTPForm from "../components/otp-form"
import Success from "../components/success"

type Step = {
  Content: React.FC<any>
}

export const forgotPasswordSteps: Step[] = [
  {
    Content: ContactForm,
  },
  {
    Content: OTPForm,
  },
  {
    Content: PasswordForm,
  },
  {
    Content: Success,
  },
]
