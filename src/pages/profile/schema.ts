import { z } from 'zod';

export const ProfileSettingsSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be no more than 20 characters long'),
  email: z
    .string()
    .min(1, 'This field is required')
    .email('Invalid email')
    .max(255, 'This field is too long (max 255)'),
});

export type ProfileSettingsType = z.infer<typeof ProfileSettingsSchema>;

export const PasswordSettingsSchema = z
  .object({
    oldPassword: z.string(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(32, 'Password must be at most 32 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'The passwords did not match',
    path: ['confirmPassword'],
  });

export type PasswordSettingsType = z.infer<typeof PasswordSettingsSchema>;
