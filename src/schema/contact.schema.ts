import * as z from 'zod';
import { GlobalVariables } from '@/lib/constant';

export const ContactSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      message: 'Name is required and must be at least 3 characters long.',
    })
    .regex(GlobalVariables.Regex.string, {
      message: 'Name must contain only letters, hyphens, or apostrophes.',
    }),

  lastName: z.string().nonempty({
    message: GlobalVariables.ValidationMessage.REQUIRED,
  }),

  emailId: z
    .string({
      required_error: GlobalVariables.ValidationMessage.REQUIRED,
    })
    .email(GlobalVariables.ValidationMessage.EMAIL),

  whatsAppMob: z
    .string({
      required_error: GlobalVariables.ValidationMessage.REQUIRED,
    })
    .refine((value) => /^[0-9]{10}$/.test(value), {
      message:
        'Phone number must be exactly 10 digits long and contain only numbers.',
    }),

  stateId: z.string().min(1, GlobalVariables.ValidationMessage.REQUIRED),
  districtId: z.string().min(1, GlobalVariables.ValidationMessage.REQUIRED),
  panchayathId: z.string().min(1, GlobalVariables.ValidationMessage.REQUIRED),
  wardId: z.string().min(1, GlobalVariables.ValidationMessage.REQUIRED),

  message: z
    .string({
      required_error: GlobalVariables.ValidationMessage.REQUIRED,
    })
    .min(1, { message: GlobalVariables.ValidationMessage.REQUIRED }),
});
