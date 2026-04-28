import z from "zod"

export const formSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "Your first name should be at least 2 letters."),

    last_name: z
      .string()
      .min(2, "Your last name should be at least 2 letters."),

    birthday: z.string().min(1, "Please select your birthday."),

    gender: z.string().min(1, "Please choose how you identify."),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(20, "Username can't be longer than 20 characters."),

    area: z.string().min(2, "Please enter your location."),

    email: z.string().email("That doesn’t look like a valid email."),

    phone: z
      .string()
      .min(11, "Please enter a valid phone number.")
      .max(16, "Phone number is too long."),

    password: z.string().min(6, "Password must be at least 6 characters."),

    confirm_password: z.string().min(6, "Please confirm your password."),

    terms: z.boolean().refine((v) => v === true, {
      message: "You need to accept the terms to continue.",
    }),

    otp: z.string().length(6, "Enter the 6-digit code we sent you."),
    avatar_upload: z.any().nullable().optional(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don’t match. Try again.",
    path: ["confirm_password"],
  })

export type FormData = z.infer<typeof formSchema>
