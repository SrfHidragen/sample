import * as z from 'zod';
import { GlobalVariables } from '@/lib/constant';

export const InvitationSchema = z.object({
  name: z.string().min(4, {
    message: 'Name is required and must be at least 4 characters long.',
  }),
  aadhar_number: z
    .array(
      z
        .string()
        .regex(GlobalVariables.Regex.number, { message: 'Enter numbers only' })
        .length(4, { message: 'Each field must contain exactly 4 digits' }),
    )
    .min(3, { message: 'All Aadhaar fields are required.' }),
  phone_number: z
    .string({ required_error: 'Phone number is required' })
    .regex(/^[0-9]{10}$/, {
      message: 'Phone number must be exactly 10 digits',
    }),
});
