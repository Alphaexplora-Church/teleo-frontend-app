export type FieldKey = "Email" | "Phone Number" | "Password"
export type Step = "otp" | "form" | "success"

export const fieldConfig: Record<
  FieldKey,
  {
    oldLabel: string
    newLabel: string
    oldPlaceholder: string
    newPlaceholder: string
    inputType: string
    destination: string
  }
> = {
  Email: {
    oldLabel: "Old Email",
    newLabel: "New Email",
    oldPlaceholder: "Enter old email",
    newPlaceholder: "Enter new email",
    inputType: "email",
    destination: "email",
  },
  "Phone Number": {
    oldLabel: "Old Phone Number",
    newLabel: "New Phone Number",
    oldPlaceholder: "Enter old phone number",
    newPlaceholder: "Enter new phone number",
    inputType: "tel",
    destination: "phone number",
  },
  Password: {
    oldLabel: "Old Password",
    newLabel: "New Password",
    oldPlaceholder: "Enter old password",
    newPlaceholder: "Enter new password",
    inputType: "password",
    destination: "email",
  },
}

export const successMessages: Record<FieldKey, string> = {
  Email: "Congratulations your email has been updated.",
  "Phone Number": "Congratulations your phone number has been updated.",
  Password: "Congratulations your password has been updated.",
}

export const securityContent: { label: FieldKey; placeholder: string }[] = [
  { label: "Email", placeholder: "juandelacruz1999@yahoo.com" },
  { label: "Phone Number", placeholder: "+63 | 09123467485" },
  { label: "Password", placeholder: "********" },
]
