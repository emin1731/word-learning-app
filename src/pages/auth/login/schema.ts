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

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "This field is required")
    .email("Invalid email")
    .max(255, "This field is too long (max 255)"),
  password: z
    .string()
    .min(1, "This field is required")
    .max(32, "This field is too long (max 32)"),
});

export type LoginType = z.infer<typeof LoginSchema>;
