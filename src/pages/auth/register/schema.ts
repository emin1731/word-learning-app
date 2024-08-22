import { z } from "zod";

const customErrorMap: z.ZodErrorMap = (issue) => {
  if (issue.code === "invalid_type") {
    if (issue.expected === "string") {
      return { message: "This field is required" };
    }
  }
  return { message: issue.message || "Invalid input" };
};

z.setErrorMap(customErrorMap);

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be no more than 20 characters long"),
  email: z
    .string()
    .min(1, "This field is required")
    .email("Invalid email")
    .max(255, "This field is too long (max 255)"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export type RegisterType = z.infer<typeof RegisterSchema>;
