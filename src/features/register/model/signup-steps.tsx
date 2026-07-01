import React from "react"
import {
  NameForm,
  BirthdayForm,
  GenderForm,
  UsernameForm,
  LocationForm,
  ContactForm,
  PasswordForm,
  AvatarUploadForm,
  EmailForm,
  ProfileForm,
} from "../register.view"

type Step = {
  title: string
  description: string
  Content: any
  buttonText?: string
}

export const signupSteps: Step[] = [
  {
    title: "Start with your email",
    description: "Enter your email address so we can create your account.",
    Content: (props: any) => <EmailForm {...props} />,
  },
  {
    title: "Secure your account",
    description: "Choose a password to protect your new account.",
    Content: (props: any) => <PasswordForm {...props} />,
  },
  {
    title: "Complete your profile",
    description: "Add a few details so we can personalize your experience.",
    Content: (props: any) => <ProfileForm {...props} />,
  },
]

export default signupSteps
