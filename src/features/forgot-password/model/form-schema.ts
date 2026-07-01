import z from "zod"

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
const isPhone = (value: string) => /^\+?[0-9]{10,15}$/.test(value)

export const formSchema = z
  .object({
    contact: z
      .string()
      .min(1, "Please enter your email or phone number.")
      .refine(
        (value) => isEmail(value) || isPhone(value),
        "That doesn't look like a valid email or phone number."
      ),

    otp: z.string().length(6, "Enter the 6-digit code we sent you."),

    new_password: z.string().min(6, "Password must be at least 6 characters."),

    confirm_password: z.string().min(6, "Please confirm your password."),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match. Try again.",
    path: ["confirm_password"],
  })

export type FormData = z.infer<typeof formSchema>
