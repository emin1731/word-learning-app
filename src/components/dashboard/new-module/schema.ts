import { z } from "zod";

export const NewModuleSchema = z.object({
  moduleName: z
    .string()
    .min(1, {
      message: "This field is required.",
    })
    .max(30, {
      message: "Module name must not be longer than 30 characters.",
    }),
  moduleDescription: z
    .string()
    .min(1, {
      message: "This field is required.",
    })
    .max(160, {
      message: "Module description must not be longer than 160 characters.",
    }),
});

export type NewModuleType = z.infer<typeof NewModuleSchema>;
