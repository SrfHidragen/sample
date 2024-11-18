/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client';
import { Button } from '@/components/Button';
import {
  Form,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormItem,
} from '@/components/Form';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// import { useMutation } from '@apollo/client';
// import { REQUEST_OTP } from '@/graphql/mutation/auth.mutation';
// import ApiMessage from '@/components/ApiMessage';
// import { useRouter } from 'next/navigation';
import WhiteCard from '@/components/WhiteCard';
import { useMutation } from '@apollo/client';
import {
  OTP_VERIFICATION,
  REQUEST_OTP_TO_REGISTERED,
} from '@/graphql/mutation/auth.mutation';
import Alert from '@/components/Alert';
import toast from 'react-hot-toast';
import OtpInput from '@/components/OtpInput';
import { useOtpTimer } from '@/hooks/useOtpTimer';
import { useRouter } from 'next/navigation';

const ForgotPasswordValidationSchema = z.object({
  mobile_number: z
    .string()
    .min(10, { message: 'Mobile number must be 10 digits' })
    .max(10, { message: 'Mobile number must be 10 digits' })
    .regex(/^[0-9]+$/, { message: 'Mobile number must contain only numbers' }),
  otp: z.string().optional(),
  isSendOtp: z.boolean().optional(),
});

const ForgotPassword = () => {
  const [mutateOtpVerification, { loading: verifyLoading }] =
    useMutation(OTP_VERIFICATION);
  const router = useRouter();
  const { resetTimer, formattedTime, startTimer } = useOtpTimer();
  const [mutateForgot, { loading }] = useMutation(REQUEST_OTP_TO_REGISTERED);
  const form = useForm<z.infer<typeof ForgotPasswordValidationSchema>>({
    resolver: zodResolver(ForgotPasswordValidationSchema),
    mode: 'all',
    defaultValues: { mobile_number: '', otp: '', isSendOtp: false },
  });

  const otpSend = async () => {
    form.setValue('otp', '');
    const { mobile_number } = form.watch();
    const { data } = await mutateForgot({
      variables: {
        phone: '+91' + mobile_number,
      },
    });
    if (data.sendOtpToRegistered.statusCode !== 200) {
      return form.setError('root', {
        message: data.sendOtpToRegistered.message,
      });
    }
    form.setValue('isSendOtp', true);
    resetTimer();
    toast.success('Send OTP to your Number');
  };
  const onSubmit = async (
    value: z.infer<typeof ForgotPasswordValidationSchema>,
  ) => {
    otpSend();
  };

  const verifyOtp = async () => {
    const { mobile_number, otp } = form.watch();
    const { data } = await mutateOtpVerification({
      variables: { phone: '+91' + mobile_number, otp },
    });
    if (data?.verifyOtp?.statusCode !== 200) {
      return form.setError('root', {
        message: data?.verifyOtp.message,
      });
    }
    toast.success('OTP Verified Successfully');
    router.replace(
      `/account?credential=set-new-password&ph=${btoa(mobile_number)}`,
    );
  };

  return (
    <div className="flex w-full items-center justify-center py-24">
      <div className="w-full max-w-md px-4 sm:w-10/12 sm:px-0">
        {/* forgot Password */}
        <WhiteCard className="flex flex-col gap-6 rounded-2xl p-8">
          <Typography as="h2" className="font-bold text-black">
            Forgot Password
          </Typography>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="mobile_number"
                render={({ field: { onChange, ...fields } }) => (
                  <FormItem>
                    <FormLabel className="text-base font-normal text-black">
                      Enter Your Mobile Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          disabled={true}
                          autoComplete="off"
                          placeholder="+91"
                          className="focus:shadow-outline block h-[54px] w-full max-w-[53px] appearance-none rounded-lg border-2 border-[#9D9999] bg-white p-2 leading-tight text-black shadow placeholder:text-[15px] placeholder:font-normal placeholder:text-black focus:outline-none"
                        />
                        <TextField
                          {...fields}
                          onChange={(e) => {
                            form.setValue('isSendOtp', false);
                            form.setValue('otp', '');
                            onChange(e.target.value);
                          }}
                          type="text"
                          autoComplete="off"
                          placeholder="Enter Your Mobile Number"
                          variant="primary"
                          className="placeholder:text-[15px] placeholder:font-normal placeholder:text-[#999999]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="ml-[61px] text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <div className="h-2"></div>
              {form.watch('isSendOtp') && (
                <FormField
                  name="otp"
                  control={form.control}
                  render={({ field: { value, onChange, ...fields } }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal text-black">
                        Enter OTP
                      </FormLabel>
                      <FormControl>
                        <OtpInput
                          {...fields}
                          numInputs={6}
                          onChange={onChange}
                          otp={value}
                          containerStyle={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            gap: '2px',
                          }}
                          focusStyle={{
                            outline: 'none',
                          }}
                          inputStyle={{
                            width: '100%',
                            maxWidth: '50px',
                            height: '54px',
                            fontSize: '1.5rem',
                            color: 'black',
                            border: '2px solid #9D9999',
                            borderRadius: '5px',
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              <div className="h-3"></div>
              <Alert
                message={form.formState.errors.root?.message || ''}
                type="error"
              />
              <div className="h-3"></div>
              {!form.watch('isSendOtp') ? (
                <Button
                  variant={'default'}
                  className="max-w-full rounded-lg bg-[#FFCC01] text-base"
                  type="submit"
                  disabled={loading}
                  loading={loading}
                >
                  Continue
                </Button>
              ) : (
                <>
                  <Button
                    variant={'default'}
                    className="max-w-full rounded-lg bg-[#FFCC01] text-base disabled:bg-gray-300"
                    type="button"
                    disabled={form.watch('otp')?.length !== 6 || verifyLoading}
                    loading={verifyLoading}
                    onClick={verifyOtp}
                  >
                    Verify
                  </Button>
                  <div className="flex justify-end">
                    {startTimer?.start && (
                      <Typography className="text-base font-normal">
                        Request a new OTP after {formattedTime}
                      </Typography>
                    )}
                    {!startTimer?.start && (
                      <div
                        className="cursor-pointer text-base font-semibold text-[#02158A]"
                        onClick={otpSend}
                      >
                        Resend OTP
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
          </Form>
        </WhiteCard>
      </div>
    </div>
  );
};

export default ForgotPassword;
