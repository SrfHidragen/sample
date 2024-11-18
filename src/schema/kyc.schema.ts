/* eslint-disable no-extra-boolean-cast */
import { GlobalVariables } from '@/lib/constant';
import * as z from 'zod';

export const addressVerificationSchema = z
  .object({
    permanentPincode: z
      .string()
      .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
    permanentStateId: z
      .string()
      .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
    permanentDistrictId: z
      .string()
      .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
    permanentState: z
      .string()
      .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
    permanentDistrict: z
      .string()
      .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
    permanentPanchayathId: z.string().optional(),
    permanentWardId: z.string().optional(),
    permanentPanchayath: z.string().optional(),
    permanentWard: z.string().optional(),
    isSame: z.boolean().optional(),
    livingPincode: z.string().optional(),
    livingStateId: z.string().optional(),
    livingDistrictId: z.string().optional(),
    livingState: z.string().optional(),
    livingDistrict: z.string().optional(),
    livingPanchayathId: z.string().optional(),
    livingWardId: z.string().optional(),
    livingPanchayath: z.string().optional(),
    livingWard: z.string().optional(),
    alternateMobile: z
      .string()
      .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED })
      .length(10, { message: GlobalVariables.ValidationMessage.PHONE_NUMBER }),
    isFindPermanentPanchayath: z.boolean().optional(),
    isFindPermanentWard: z.boolean().optional(),
    isFindLivingPanchayath: z.boolean().optional(),
    isFindLivingWard: z.boolean().optional(),
    street: z.string().optional(),
    vtc: z.string().optional(),
    whatsappNumber: z
      .string()
      .optional()
      .refine((val) => !val || val.length === 10, {
        message: GlobalVariables.ValidationMessage.PHONE_NUMBER,
      }),
    email: z
      .string()
      .optional()
      .refine((val) => !val || z.string().email().safeParse(val).success, {
        message: GlobalVariables.ValidationMessage.EMAIL,
      }),
    communicationLanguage: z.string().array().optional(),
    communicationId: z.string().optional(),
    motherTongue: z.string().optional(),
    user_type: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isSame) {
      if (!data.livingPincode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: GlobalVariables.ValidationMessage.REQUIRED,
          path: ['livingPincode'],
        });
      }
      if (!data.livingStateId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: GlobalVariables.ValidationMessage.REQUIRED,
          path: ['livingStateId'],
        });
      }
      if (!data?.livingDistrictId)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: GlobalVariables.ValidationMessage.REQUIRED,
          path: ['livingDistrictId'],
        });
    }

    if (!data?.permanentPanchayath && !data?.permanentPanchayathId) {
      if (!!data?.permanentDistrict) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: GlobalVariables.ValidationMessage.REQUIRED,
          path: ['permanentPanchayath'],
        });
      } else if (!!data?.permanentDistrictId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: GlobalVariables.ValidationMessage.REQUIRED,
          path: ['permanentPanchayathId'],
        });
      }
    }

    if (!data?.permanentWard && !data?.permanentWardId) {
      if (!!data?.permanentDistrict) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: GlobalVariables.ValidationMessage.REQUIRED,
          path: ['permanentWard'],
        });
      } else if (!!data?.permanentDistrictId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: GlobalVariables.ValidationMessage.REQUIRED,
          path: ['permanentWardId'],
        });
      }
    }

    if (data?.user_type === 'consumer') {
      if (!data?.communicationLanguage) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: GlobalVariables.ValidationMessage.REQUIRED,
          path: ['communicationLanguage'],
        });
      }
      if (!data?.motherTongue) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: GlobalVariables.ValidationMessage.REQUIRED,
          path: ['motherTongue'],
        });
      }
    }
  });
