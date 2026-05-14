import {
  NameForm,
  BirthdayForm,
  GenderForm,
  UsernameForm,
  LocationForm,
  ContactForm,
  PasswordForm,
  OTPForm,
  AvatarUploadForm,
} from "../view/signup-view"

type Step = {
  title: string
  description: string
  Content: React.FC<any>
  buttonText?: string
}

export const signupSteps: Step[] = [
  {
    title: "Hello!",
    description: "What's your name?",
    Content: NameForm,
  },
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
    description: "",
    Content: AvatarUploadForm,
    buttonText: "Upload",
  },
]
