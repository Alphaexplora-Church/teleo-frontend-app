import { ContactForm, OTPForm, PasswordForm, Success } from "../forgot-password.view"

type Step = {
  Content: any
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
