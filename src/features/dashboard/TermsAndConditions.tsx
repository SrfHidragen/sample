/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Button } from '@/components/Button';
import Typography from '@/components/Typography';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import * as z from 'zod';
import { GlobalVariables } from '@/lib/constant';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import TextField from '@/components/TextField';
import Checkbox from '@/components/Checkbox/Index';
import OtpInput from '@/components/OtpInput';
import {
  OTP_VERIFICATION,
  SEND_OTP_EVERYONE,
} from '@/graphql/mutation/auth.mutation';
import { useOtpTimer } from '@/hooks/useOtpTimer';
import {
  UPDATE_CONTACT_NUMBER,
  UPDATE_TERMS_AND_CONDITION,
} from '@/graphql/mutation/termsandcondition.mutation';
import Spinner from '@/components/Spinner';
import Alert from '@/components/Alert';
import TermsofService from '@/features/Policy/TermsofService';

const TermsAndConditionValidation = z.object({
  isAgreedTerms: z.boolean().refine((value) => value === true, {
    message: 'You must agree to the terms of Service',
  }),
  phone: z
    .string()
    .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
  otp: z.string().optional(),
  isSendOtp: z.boolean().optional(),
});
function TermsAndCondition() {
  const { resetTimer, formattedTime, startTimer } = useOtpTimer();

  const [mutateOtpVerification, { loading: verifyLoading }] =
    useMutation(OTP_VERIFICATION);

  const [mutateContactNumber, { loading: loadingUpdateContact }] = useMutation(
    UPDATE_CONTACT_NUMBER,
  );
  const [mutateTermsAndConditon, { loading }] = useMutation(
    UPDATE_TERMS_AND_CONDITION,
  );

  const [mutateSendOTP, { loading: loadingSendOtp }] = useMutation(
    SEND_OTP_EVERYONE,
    {
      fetchPolicy: 'network-only',
    },
  );

  const FormInfo = useForm<z.infer<typeof TermsAndConditionValidation>>({
    resolver: zodResolver(TermsAndConditionValidation),
    mode: 'all',
    defaultValues: {
      isAgreedTerms: false,
      isSendOtp: false,
      phone: '',
      otp: '',
    },
  });
  const router = useRouter();
  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAcceptTerms({ IsAccept: event.target.checked, error: '' });
  // };
  // const handleSubmit = async () => {
  //   if (!IsAcceptTerms.IsAccept) {
  //     setAcceptTerms({
  //       IsAccept: false,
  //       error: 'You must accept the Terms and Conditions to proceed.',
  //     });
  //     return;
  //   }
  //   try {
  //     const { data } = await mutateTermsAndConditon({
  //       variables: {
  //         termsId: 1,
  //       },
  //     });
  //     if (data?.updateTermsVersion?.statusCode === 200) {
  //       setAadharVerification({ kycLevel: 1 });
  //       router.push('/dashboard/kyc/aadhar-kyc');
  //     }
  //   } catch (error) {
  //     toast.error('Please Try-again your terms and conditions not agreed');
  //   }
  // };

  const updateTermsAndConditions = async () => {
    try {
      await mutateTermsAndConditon({ variables: { termsId: 6 } });

      const phoneNumber = '91' + FormInfo.watch('phone');
      await mutateContactNumber({ variables: { contactNumber: phoneNumber } });
      router.push('/dashboard');
    } catch (error) {
      toast.error('Please try again. Your terms of Service are not agreed.');
    }
  };
  const onSubmit = async (
    values: z.infer<typeof TermsAndConditionValidation>,
  ) => {
    otpSend();
  };

  const otpSend = async () => {
    const { phone } = FormInfo.watch();
    try {
      const { data } = await mutateSendOTP({
        variables: { phone: '+91' + phone },
      });
      if (data.sendOtpToEveryone.statusCode !== 200) {
        return FormInfo.setError('root', {
          message: data.sendOtpToEveryone.message,
        });
      }
      FormInfo.setValue('isSendOtp', true);
      resetTimer();
      toast.success('Send OTP to your Number');
    } catch (error) {
      FormInfo.setError('root', { message: 'Please Check the Phone Number' });
    }
  };

  const verifyOtp = async () => {
    const { phone, otp } = FormInfo.watch();
    try {
      const { data } = await mutateOtpVerification({
        variables: { phone: '+91' + phone, otp },
      });
      if (data?.verifyOtp?.statusCode !== 200) {
        return FormInfo.setError('root', {
          message: data?.verifyOtp.message,
        });
      }
      await updateTermsAndConditions();
      toast.success('OTP Verified Successfully');
    } catch (error) {
      FormInfo.setError('root', { message: 'Please Check the Phone Number' });
    }
  };
  const IsLoading = loading || loadingSendOtp || loadingUpdateContact;

  return (
    <>
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center justify-center">
          <div className="w-full rounded-sm bg-white p-4 sm:p-14">
            <Typography as="h1" className="text-center text-2xl sm:text-[32px]">
              Terms of Service
            </Typography>
            <div className="h-4"></div>
            <TermsofService />
            <div className="h-4"></div>
            <Form {...FormInfo}>
              <form onSubmit={FormInfo.handleSubmit(onSubmit)}>
                <div className="h-2"></div>
                <div className="max-w-md">
                  <FormField
                    name="phone"
                    control={FormInfo.control}
                    render={({ field: { onChange, ...fields } }) => (
                      <FormItem>
                        <FormLabel>Enter Phone number</FormLabel>
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
                                FormInfo.setValue('isSendOtp', false);
                                FormInfo.setValue('otp', '');
                                onChange(e.target.value);
                              }}
                              type="number"
                              autoComplete="off"
                              placeholder="Enter Your Mobile Number"
                              variant="primary"
                              className="placeholder:text-[15px] placeholder:font-normal placeholder:text-[#999999]"
                            />
                          </div>
                        </FormControl>

                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <div className="h-2"></div>
                  {FormInfo.watch('isSendOtp') && (
                    <>
                      <FormField
                        name="otp"
                        control={FormInfo.control}
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
                                }}
                                focusStyle={{
                                  borderTop: 0,
                                  borderLeft: 0,
                                  borderRight: 0,
                                  outline: 'none',
                                }}
                                inputStyle={{
                                  width: '2.2rem',
                                  height: '2.2rem',
                                  fontSize: '1.5rem',
                                  color: 'black',
                                  background: 'transparent',
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="h-5"></div>
                      {FormInfo.formState.errors.root?.message && (
                        <>
                          <Alert
                            type="error"
                            message={
                              FormInfo.formState.errors.root.message || ''
                            }
                          />
                          <div className="h-2"></div>
                        </>
                      )}
                      <Button
                        variant={'default'}
                        className="max-w-full rounded-lg bg-[#FFCC01] text-base disabled:bg-gray-300"
                        type="button"
                        disabled={
                          FormInfo.watch('otp')?.length !== 6 || verifyLoading
                        }
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
                          <div className="flex items-center gap-1">
                            <button
                              className="cursor-pointer text-base font-semibold text-[#02158A]"
                              onClick={otpSend}
                              disabled={loadingSendOtp}
                            >
                              Resend OTP
                            </button>
                            {loadingSendOtp && <Spinner size={20} />}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <div className="h-2"></div>
                {!FormInfo.watch('isSendOtp') && (
                  <FormField
                    name="isAgreedTerms"
                    control={FormInfo.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-start gap-3 rounded-md border border-gray-300 bg-gray-50 p-2">
                            <Checkbox
                              className="h-5 w-5 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              {...field}
                            />
                            <label className="flex items-center text-base text-gray-800">
                              I acknowledge that I have reviewed and accepted
                              the new giveNtake Terms of Service, effective as
                              of October 19, 2024.
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                )}

                <div className="h-4"></div>

                {!FormInfo.watch('isSendOtp') && (
                  <>
                    {FormInfo.formState.errors.root?.message && (
                      <>
                        <Alert
                          type="error"
                          message={FormInfo.formState.errors.root.message || ''}
                        />
                        <div className="h-2"></div>
                      </>
                    )}
                    <Button
                      variant="secondary"
                      loading={IsLoading}
                      disabled={IsLoading}
                      type="submit"
                    >
                      I Agreed
                    </Button>
                  </>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TermsAndCondition;
