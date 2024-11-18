/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useLazyQuery, useMutation } from '@apollo/client';
import {
  PAN_SKIP_VERIFICATION,
  PAN_SUBMITION,
} from '@/graphql/mutation/kyc.mutation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useKycStore } from '@/store/kyc.store';
import Alert from '@/components/Alert';
import { useEffect, useState } from 'react';
import { GrCheckmark } from 'react-icons/gr';
import { useAuthStore } from '@/store/auth.store';

export const PanNumberSchema = z.object({
  pan_number: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, {
    message:
      'Invalid PAN number format. It should be in the format ABCDE1234F.',
  }),
  user_type: z.string().optional(),
});

const PanForm = () => {
  const router = useRouter();
  const UserDetails = useAuthStore((state) => state?.user)?.userDetails;
  const USER_TYPE = UserDetails?.userType || '';
  const [isPanVerified, setIsPanVerified] = useState(false);
  const updateKYCInfo = useKycStore((state) => state?.setAadharVerification);
  const KycInfo = useKycStore((state) => state?.kycVerification);
  const { updateKYCFlowCompletion } = useKycStore();
  const [mutatePan, { data, loading }] = useMutation(PAN_SUBMITION);
  const [mutateSkipPan, { loading: skipLoading }] = useLazyQuery(
    PAN_SKIP_VERIFICATION,
  );
  const formInfo = useForm<z.infer<typeof PanNumberSchema>>({
    resolver: zodResolver(PanNumberSchema),
    mode: 'all',
    defaultValues: {
      pan_number: '',
      user_type: USER_TYPE,
    },
  });

  //submit handler
  const onSubmit = async (values: z.infer<typeof PanNumberSchema>) => {
    const { pan_number } = values;
    const input = {
      pan: pan_number,
      consent: 'Y',
      reason: 'Reason for verifying PAN set by the developer',
      name: KycInfo?.name || '',
    };
    try {
      const { data } = await mutatePan({
        variables: { ...input },
      });
      if (data?.verifyPan?.statusCode !== 200) {
        formInfo.setError('root', {
          message: data?.verifyPan?.message,
        });
        return;
      }
      const IsSelfieCompleted = KycInfo.KycFlow.some(
        (item) => item?.level === 5 && item?.isVerified,
      );

      if (IsSelfieCompleted) {
        updateKYCInfo({
          kyc_information: {
            addressVerified: true,
            aadhaarVerified: true,
            panVerified: true,
            bankVerified: true,
            selfiVerified: true,
          },
          kycLevel: 5,
        });
        updateKYCFlowCompletion({
          isAadhaar: true,
          isAddress: true,
          isBank: true,
          isPan: true,
          isSelfie: true,
        });
        toast.success(data?.verifyPan?.message);
        router.replace('/dashboard/kyc/congratulations');
      } else {
        updateKYCInfo({
          kyc_information: {
            addressVerified: true,
            aadhaarVerified: true,
            panVerified: true,
            bankVerified: true,
          },
          kycLevel: 5,
        });
        updateKYCFlowCompletion({
          isAadhaar: true,
          isAddress: true,
          isBank: true,
          isPan: true,
        });
        toast.success(data?.verifyPan?.message);
        router.replace('/dashboard/kyc/IPV-kyc-verification');
      }
      setIsPanVerified(true);
    } catch (error) {
      formInfo.setError('root', {
        type: 'manual',
        message: 'An error occurred, please try again later.',
      });
    }
  };

  useEffect(() => {
    const subscription = formInfo.watch(() => {
      if (formInfo.formState.errors.root) {
        formInfo.clearErrors('root');
      }
    });
    return () => subscription.unsubscribe();
  }, [formInfo]);

  const onHandleSkipPan = async () => {
    try {
      const { data } = await mutateSkipPan();
      if (!data?.panVerificationSkipped) return;
      if (data?.panVerificationSkipped) {
        const IsSelfieCompleted = KycInfo.KycFlow.some(
          (item) => item?.level === 5 && item?.isVerified,
        );
        if (IsSelfieCompleted) {
          router.replace('/dashboard');
        } else {
          updateKYCInfo({
            kyc_information: {
              addressVerified: true,
              aadhaarVerified: true,
              panVerified: true,
              bankVerified: true,
            },
            kycLevel: 5,
          });
          router.replace('/dashboard/kyc/IPV-kyc-verification');
        }
      }
    } catch (error) {
      formInfo.setError('root', { message: 'Pan Skip Failed Retry' });
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-4 md:max-w-lg md:p-8">
      <Typography as="h1" className="text-24 leading-snug lg:text-[32px]">
        PAN Verification
      </Typography>
      <div className="h-6"></div>
      <Typography as="p" className="">
        Enter PAN Number
      </Typography>
      <div className="h-1"></div>
      <Form {...formInfo}>
        <form
          onSubmit={formInfo.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6 md:max-w-lg "
        >
          <FormField
            control={formInfo.control}
            name="pan_number"
            render={({ field: { onChange, ...fields } }) => (
              <FormItem>
                <FormControl>
                  <TextField
                    {...fields}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                    placeholder="Enter Pan Number"
                    type="text"
                    onInput={(e) => {
                      e.currentTarget.value =
                        e.currentTarget.value.toUpperCase();
                    }}
                    variant="primary"
                    id="pan_number"
                    className="!disabled:bg-black h-full w-full max-w-xl py-4 placeholder:text-gray-600 disabled:cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          <Alert
            type="error"
            message={formInfo?.formState?.errors?.root?.message || ''}
          />

          {isPanVerified && (
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center  rounded-full border-2 border-green-500">
                <GrCheckmark size={'.8rem'} className="text-green-500" />
              </div>
              <Typography as="p" className="text-green-500">
                {data?.verifyPan?.message}
              </Typography>
            </div>
          )}
          {Number(UserDetails?.totalReceived) <= 50000 && (
            <Typography className="text-red-500">
              * Withdrawal amounts less than ₹50,000 do not require a PAN card.
            </Typography>
          )}
          {/* {!isPanVerified && ( */}
          <div className="flex justify-between gap-4">
            {Number(UserDetails?.totalReceived) <= 50000 && (
              <div className="w-64">
                <Button
                  className="w-full max-w-xl flex-1"
                  variant={'outline'}
                  type="button"
                  disabled={skipLoading}
                  loading={skipLoading}
                  onClick={onHandleSkipPan}
                >
                  Skip
                </Button>
              </div>
            )}
            <Button
              className="w-full max-w-xl"
              variant={'secondary'}
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </div>
          {/* )} */}
        </form>
      </Form>
    </div>
  );
};

export default PanForm;
