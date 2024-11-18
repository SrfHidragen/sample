import { GlobalVariables } from '@/lib/constant';
import * as z from 'zod';

//Login Form Schema
export const LoginFormSchema = z
  .object({
    username: z
      .string()
      .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
    password: z
      .string({ required_error: GlobalVariables.ValidationMessage.REQUIRED })
      .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
    // .min(8, { message: GlobalVariables.ValidationMessage.MIN_PASSWORD })
    // .regex(/[a-z]/, {
    //   message: GlobalVariables.ValidationMessage.PASSWORD_LOWER,
    // })
    // .regex(/[A-Z]/, {
    //   message: GlobalVariables.ValidationMessage.PASSWORD_UPPER,
    // })
    // .regex(/[0-9]/, {
    //   message: GlobalVariables.ValidationMessage.PASSWORD_NUMBER,
    // })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: GlobalVariables.ValidationMessage.PASSWORD_SPECIAL,
    // }),
    isConsumer: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data?.isConsumer && data?.username?.length !== 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['username'],
        message: GlobalVariables.ValidationMessage.MIN_PHONE_NUMBER,
      });
    }
  });

// User Registration Schema
// Step 1
export const CUSTOMER_RESGISTRATION_SCHEMA = z.object({
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(10, 'Phone number must not exceed 10 digits'),
  motherTongue: z.string().nonempty('Mother tongue is required'),
  communicationId: z
    .string()
    .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
  communicationLanguage: z.string().array().optional(),
  name: z
    .string()
    .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
  isVerified: z.boolean().optional(),
  otp: z.string().optional(),
});

//Step 2

export const SetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
      .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
      .regex(/[0-9]/, { message: 'Must contain at least one number' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Must contain at least one special character',
      }),
    confirmPassword: z.string().min(8, {
      message: 'Confirmation password must be at least 8 characters long',
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });
