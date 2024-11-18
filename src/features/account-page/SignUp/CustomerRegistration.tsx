/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import WhiteCard from '@/components/WhiteCard';
import { useMutation, useQuery } from '@apollo/client';
import { GET_LANGUAGE } from '@/graphql/query/common.query';
import { Combobox } from '@/components/Combobox';
import { GlobalVariables } from '@/lib/constant';
import OtpInput from '@/components/OtpInput';
import {
  OTP_VERIFICATION,
  REGISTRATION_OTP,
} from '@/graphql/mutation/auth.mutation';
import Alert from '@/components/Alert';
import toast from 'react-hot-toast';
import { useOtpTimer } from '@/hooks/useOtpTimer';
import { useSignUpStore } from '@/store/register.store';
import { getCommunicationItemIds } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CUSTOMER_RESGISTRATION_SCHEMA } from '@/schema/auth.schema';

const CustomerRegistration = () => {
  const addCustomerData = useSignUpStore((state) => state?.addCustomerData);
  const [mutateOtp, { loading: otpLoading }] = useMutation(REGISTRATION_OTP);
  const [muatateOtpVerification, { loading: verifyLoading }] =
    useMutation(OTP_VERIFICATION);
  const route = useRouter();
  const { data, loading } = useQuery(GET_LANGUAGE);
  const { formattedTime, resetTimer, startTimer } = useOtpTimer();
  const FormInfo = useForm<z.infer<typeof CUSTOMER_RESGISTRATION_SCHEMA>>({
    resolver: zodResolver(CUSTOMER_RESGISTRATION_SCHEMA),
    mode: 'all',
    defaultValues: {
      isVerified: false,
      motherTongue: '',
      otp: '',
      phone: '',
    },
  });

  const handleRoute = () => {
    route.push('/account/register?SignUp=create-password');
  };

  const onSubmit = async (
    value: z.infer<typeof CUSTOMER_RESGISTRATION_SCHEMA>,
  ) => {
    const { phone } = value;
    otpSend(phone);
  };

  const otpSend = async (phone: string) => {
    FormInfo.setValue('otp', '');
    const { data } = await mutateOtp({
      variables: {
        phone: `+91${phone}`,
      },
    });
    if (data?.sendRegistrationOtp.statusCode !== 200) {
      return FormInfo.setError('root', {
        type: 'manual',
        message: data?.sendRegistrationOtp.message,
      });
    }
    resetTimer();
    toast.success(`OTP send to +91${phone}`);
    FormInfo.setValue('isVerified', true);
  };

  const otpVerification = async () => {
    const { otp, phone, communicationLanguage, communicationId, ...obj } =
      FormInfo.watch();
    const { data } = await muatateOtpVerification({
      variables: {
        phone: '+91' + phone,
        otp,
      },
    });
    if (data?.verifyOtp?.statusCode !== 200) {
      return FormInfo.setError('root', {
        type: 'manual',
        message: data.verifyOtp.message,
      });
    }
    const input = {
      ...obj,
      communicationLanguage,
      phone,
    };
    getCommunicationItemIds(communicationId);
    toast.success('OTP Verified Successfully');
    addCustomerData(input, () => handleRoute());
  };

  useEffect(() => {
    const subscription = FormInfo.watch(() => {
      if (FormInfo.formState.errors.root) {
        FormInfo.clearErrors('root');
      }
    });
    return () => subscription.unsubscribe();
  }, [FormInfo]);

  return (
    <div className="flex w-full max-w-[448px] items-center justify-center">
      <WhiteCard className="w-full rounded-2xl p-6">
        <div className="flex flex-col gap-6">
          <Typography as="h2" className="font-bold text-black">
            Customer Registration
          </Typography>
          <Form {...FormInfo}>
            <form onSubmit={FormInfo.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <FormField
                  control={FormInfo.control}
                  name="name"
                  render={({ field: { onChange, ...fields } }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal text-black">
                        Aadhar-linked Name
                      </FormLabel>
                      <FormControl>
                        <TextField
                          {...fields}
                          onChange={(e) => {
                            FormInfo.setValue('isVerified', false);
                            onChange(e.target.value);
                          }}
                          type="text"
                          autoComplete="off"
                          placeholder="Enter your name"
                          variant="primary"
                          className="placeholder:text-[15px] placeholder:font-normal placeholder:text-[#999999]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={FormInfo.control}
                  name="phone"
                  render={({ field: { onChange, ...fields } }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal text-black">
                        Aadhar-linked Phone Number
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
                              FormInfo.setValue('isVerified', false);
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
                      <FormMessage className="ml-[49px] text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={FormInfo.control}
                  name="motherTongue"
                  render={({ field: { value, onChange, ...fields } }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal text-black">
                        Choose your mother tongue
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          {...fields}
                          Options={data?.languages || []}
                          SelectedOption={
                            data?.languages?.find(
                              (item: any) => item?.id === value,
                            ) || null
                          }
                          isLoading={loading}
                          isDisabled={loading}
                          onChange={(value) => {
                            FormInfo.setValue('isVerified', false);
                            onChange(value?.id);
                          }}
                          placeholder="Choose your language"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={FormInfo.control}
                  name="communicationId"
                  render={({ field: { value, onChange, ...fields } }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal text-black">
                        Choose your communication language
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          {...fields}
                          Options={GlobalVariables.CommunicationLanguage || []}
                          SelectedOption={
                            GlobalVariables.CommunicationLanguage?.find(
                              (item) => item?.id === value,
                            ) || null
                          }
                          onChange={(value) => {
                            FormInfo.setValue('isVerified', false);
                            FormInfo.setValue(
                              'communicationLanguage',
                              value?.lid,
                            );
                            onChange(value?.id);
                          }}
                          placeholder="Choose your language"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
                <Alert
                  type="error"
                  message={FormInfo.formState.errors.root?.message || ''}
                />
                <div className="h-2"></div>
                {FormInfo.watch('isVerified') ? (
                  <>
                    <FormField
                      name="otp"
                      control={FormInfo.control}
                      render={({ field: { value, onChange, ...fields } }) => (
                        <FormItem>
                          <div className="flex items-start gap-2">
                            <FormLabel className="text-sm font-normal text-black">
                              Please enter the OTP sent to
                            </FormLabel>
                            <span className="text-sm text-blue-600">
                              +91
                              {FormInfo.watch('phone')}
                            </span>
                          </div>
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
                          <div className="flex justify-end">
                            {startTimer?.start && (
                              <Typography className="text-sm font-normal text-gray-500">
                                Request a new OTP after {formattedTime}
                              </Typography>
                            )}
                            {!startTimer?.start && (
                              <span
                                className="cursor-pointer text-sm font-semibold text-blue-600"
                                onClick={() => otpSend(FormInfo.watch('phone'))}
                              >
                                Resend OTP
                              </span>
                            )}
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      variant="secondary"
                      className="max-w-full rounded-lg bg-[#FFCC01] text-base disabled:bg-gray-200"
                      type="button"
                      disabled={
                        FormInfo.watch('otp')?.length !== 6 || verifyLoading
                      }
                      onClick={otpVerification}
                      loading={verifyLoading}
                    >
                      Verify
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="secondary"
                    className="max-w-full rounded-lg bg-[#FFCC01] text-base"
                    type="submit"
                    loading={otpLoading}
                    disabled={otpLoading}
                  >
                    Continue
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </WhiteCard>
    </div>
  );
};

export default CustomerRegistration;
