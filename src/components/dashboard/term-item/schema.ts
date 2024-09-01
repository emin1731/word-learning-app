import { z } from "zod";

export const TermItemSchema = z.object({
  term: z
    .string()
    .min(1, {
      message: "This field is required.",
    })
    .max(30, {
      message: "Term must not be longer than 30 characters.",
    }),
  definition: z
    .string()
    .min(1, {
      message: "This field is required.",
    })
    .max(160, {
      message: "Definition must not be longer than 160 characters.",
    }),
});

export type TermItemType = z.infer<typeof TermItemSchema>;
