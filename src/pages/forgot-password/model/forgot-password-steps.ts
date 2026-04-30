import { ContactForm, OTPForm, PasswordForm, Success } from "../view/forgot-password-view"

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
