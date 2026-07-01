import z from "zod"

export const otpSchema = z.object({
  otp: z.string().length(6, "Enter the 6-digit code we sent you."),
})

export const emailSchema = z.object({
  oldValue: z.string().email("Please enter a valid email."),
  newValue: z.string().email("Please enter a valid new email."),
})

export const phoneSchema = z.object({
  oldValue: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .max(16, "Phone number is too long."),
  newValue: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .max(16, "Phone number is too long."),
})

export const passwordSchema = z
  .object({
    oldValue: z.string().min(6, "Password must be at least 6 characters."),
    newValue: z.string().min(6, "New password must be at least 6 characters."),
    confirmValue: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newValue === data.confirmValue, {
    message: "Passwords do not match.",
    path: ["confirmValue"],
  })

export const formSchemas = {
  Email: emailSchema,
  "Phone Number": phoneSchema,
  Password: passwordSchema,
}

export type OtpFormData = z.infer<typeof otpSchema>
export type FieldFormData = { oldValue: string; newValue: string }
