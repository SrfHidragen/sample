/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Alert from '@/components/Alert';
import { Button } from '@/components/Button';
import Checkbox from '@/components/Checkbox/Index';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import Image from '@/components/Image';
import OtpInput from '@/components/OtpInput';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import {
  AADHAR_WITH_CAPTCHA_SUBMIT,
  COMPLETE_AADHAAR_VERIFICATION,
  GET_CAPTCHA,
  GET_KYC_REQUEST_ID,
} from '@/graphql/mutation/kyc.mutation';
import { useOtpTimer } from '@/hooks/useOtpTimer';
import { imgConvertIntoBase64 } from '@/lib/utils';
import { useKycStore } from '@/store/kyc.store';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';
import { FiRefreshCcw } from 'react-icons/fi';
import * as z from 'zod';

const AadharSchema = z.object({
  aadhar_number: z
    .string()
    .length(12, { message: 'Aadhar number must be exactly 12 digits' })
    .regex(/^\d+$/, { message: 'Aadhar number must be numeric' }),
  captcha: z.string(),
  allow_aadhar_file: z.literal(true, {
    errorMap: () => ({
      message: 'You must agree to download the Aadhaar XML file',
    }),
  }),
  privacy: z.literal(true, {
    errorMap: () => ({
      message: 'You must agree to the privacy policy',
    }),
  }),
  captchImg: z.string().optional(),
  KycRequestId: z.string().optional(),
  AadhaarSubmitVerified: z.boolean().optional(),
  otp: z.string().optional(),
});

const AadharForm = () => {
  const { data: sessioninfo, update } = useSession();
  const router = useRouter();
  const setAadharInfo = useKycStore((state) => state?.setAadharVerification);
  const { updateKYCFlowCompletion } = useKycStore();
  //otp timer
  const { formattedTime, resetTimer, startTimer } = useOtpTimer();

  //mutations
  const [mutateKycRequestId, { loading }] = useMutation(GET_KYC_REQUEST_ID);
  const [mutateCaptcha, { loading: captchaLoading }] = useMutation(GET_CAPTCHA);
  const [mutateSubmitAadhar, { loading: AadharLoading }] = useMutation(
    AADHAR_WITH_CAPTCHA_SUBMIT,
  );
  const [mutateFinalAadharSubmit, { loading: finalAadharSubmitLoading }] =
    useMutation(COMPLETE_AADHAAR_VERIFICATION);

  const FormInfo = useForm<z.infer<typeof AadharSchema>>({
    resolver: zodResolver(AadharSchema),
    mode: 'all',
    defaultValues: {
      aadhar_number: '',
      captchImg: '',
      AadhaarSubmitVerified: false,
    },
  });

  const fetchCaptcha = async () => {
    FormInfo.setValue('captcha', '');
    const { data: requestresp } = await mutateKycRequestId();
    if (requestresp?.createKycRequest?.statusCode !== 200) {
      return FormInfo.setError('root', {
        message: requestresp?.createKycRequest.message,
      });
    }
    FormInfo.setValue('KycRequestId', requestresp?.createKycRequest?.data?.id);
    const { data } = await mutateCaptcha({
      variables: { id: requestresp?.createKycRequest?.data?.id },
    });
    if (data?.initiateKycRequest?.statusCode !== 200) {
      toast.error(data?.initiateKycRequest.message || '');
      return FormInfo.setError('root', {
        message: data?.initiateKycRequest.message,
      });
    }
    const resp = imgConvertIntoBase64(
      data?.initiateKycRequest?.data?.captchaImage,
    );
    FormInfo.setValue('captchImg', resp);
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  useEffect(() => {
    const subscription = FormInfo.watch(() => {
      if (FormInfo.formState.errors) {
        FormInfo.clearErrors('root');
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FormInfo.watch()]);

  const onSubmit = () => {
    onSendOtp();
  };

  const onSendOtp = async () => {
    FormInfo.setValue('otp', '');
    const { aadhar_number, captcha, KycRequestId } = FormInfo.watch();
    const { data } = await mutateSubmitAadhar({
      variables: {
        id: KycRequestId,
        aadhaarNumber: aadhar_number,
        captchaCode: captcha,
      },
    });
    if (data?.verifyAadhaarWithCaptcha?.statusCode !== 200) {
      if (data?.verifyAadhaarWithCaptcha?.message === 'send_otp_failed') {
        FormInfo.setValue('captcha', '');
        fetchCaptcha();
      }
      return FormInfo.setError('root', {
        message: data?.verifyAadhaarWithCaptcha?.message,
      });
    }
    FormInfo.setValue('AadhaarSubmitVerified', true);
    toast.success('OTP sent to your registered mobile number.');
    resetTimer();
  };

  const verifyOTP = async () => {
    const { aadhar_number, KycRequestId, otp } = FormInfo.watch();
    const { data } = await mutateFinalAadharSubmit({
      variables: { id: KycRequestId, aadhaarNumber: aadhar_number, otp },
    });
    if (data?.completeAadhaarVerification?.statusCode !== 200) {
      if (data?.completeAadhaarVerification?.message === 'invalid_sequence') {
        toast.error(data?.completeAadhaarVerification?.message || '');
        FormInfo.setValue('AadhaarSubmitVerified', false);
        return fetchCaptcha();
      }
      return FormInfo.setError('root', {
        message: data?.completeAadhaarVerification?.message,
      });
    }
    if (
      sessioninfo?.user.name !==
      data?.completeAadhaarVerification?.data?.aadhaar?.name
    ) {
      update({ name: data?.completeAadhaarVerification?.data?.aadhaar?.name });
    }

    const resp = {
      ...data?.completeAadhaarVerification?.data?.aadhaar,
      kyc_information: { aadhaarVerified: true },
      kycLevel: 2,
    };
    setAadharInfo(resp);
    updateKYCFlowCompletion({ isAadhaar: true });
    toast.success('Aadhar Verified Successfull');
    router.replace('/dashboard/kyc/address-verification');
  };

  const isLoadingCaptcha = loading || captchaLoading;
  return (
    <div className="h-full w-full rounded-lg bg-white p-5 md:max-w-[500px] md:p-10">
      <Form {...FormInfo}>
        <form onSubmit={FormInfo.handleSubmit(onSubmit)}>
          {!FormInfo.watch('AadhaarSubmitVerified') ? (
            <>
              <div className="flex items-center justify-between sm:items-start">
                <Typography
                  as="h1"
                  className="text-24 leading-snug lg:text-[32px]"
                >
                  Aadhar Verification
                </Typography>
                <div className="h-20 w-20">
                  <Image
                    src="/img/kyc/aadhaar-logo.png"
                    alt="aadhar-img"
                    className="w-full object-cover"
                  />
                </div>
              </div>

              <div className="h-6"></div>

              <Typography as="p" className="">
                Aadhar Number
              </Typography>
              <div className="h-2"></div>
              <div className="flex w-full flex-col gap-6 md:max-w-lg">
                <FormField
                  name="aadhar_number"
                  control={FormInfo.control}
                  render={({ field: { onChange, ...fields } }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          {...fields}
                          maxLength={12}
                          onChange={(e) => {
                            const { value } = e.target;
                            if (value?.length <= 12) {
                              onChange(value);
                            }
                          }}
                          placeholder="Enter your aadhaar number"
                          minLength={12}
                          type="number"
                          variant="primary"
                          className="py-4 font-medium"
                        />
                      </FormControl>
                      <div className="flex justify-end">
                        <span className="text-xs text-red-500">
                          * One Aadhar, One Consumership only
                        </span>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="text-black">
                  <Typography as="p" className=" font-normal">
                    Enter Captcha Code
                  </Typography>
                  <div className="h-1"></div>
                  <Typography as="p" className="text-sm font-normal">
                    Type the characters you see in the picture. Characters are
                    case-sensitive.
                  </Typography>
                  <div className="h-3"></div>
                  <FormField
                    name="captcha"
                    control={FormInfo.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextField
                            {...field}
                            type="text"
                            variant="primary"
                            className="max-w-[200px] py-3 font-semibold tracking-wider"
                            placeholder="Enter Captcha"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <div className="h-3"></div>
                  <div className=" flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    {isLoadingCaptcha || FormInfo.watch('captchImg') === '' ? (
                      <div className="flex  w-full max-w-[200px] justify-center py-[11px]">
                        <CgSpinner
                          size={'2.20rem'}
                          className="animate-spin text-secondary duration-150"
                        />
                      </div>
                    ) : (
                      <div className="w-full max-w-[200px]">
                        <Image
                          src={FormInfo.watch('captchImg') || ''}
                          alt="captcha-img"
                          className="h-auto w-full select-text"
                        />
                      </div>
                    )}

                    {!isLoadingCaptcha && (
                      <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={fetchCaptcha}
                      >
                        <FiRefreshCcw
                          size={'1.2rem'}
                          className="text-secondary"
                        />
                        <Typography
                          as="p"
                          className="font-normal text-secondary"
                        >
                          New Captcha
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
                <FormField
                  name="allow_aadhar_file"
                  control={FormInfo.control}
                  render={({ field: { onChange, value, ...fields } }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="allow_aadhar_file"
                            {...fields}
                            onChange={onChange}
                            value={value}
                            checked={value}
                            className="mt-1"
                          />
                          <label
                            htmlFor="allow_aadhar_file"
                            className="cursor-pointer select-none "
                          >
                            I agree to download my Aadhaar XML file from the
                            UIDAI Website to complete Aadhaar offline
                            verification with Setu.{' '}
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  name="privacy"
                  control={FormInfo.control}
                  render={({ field: { onChange, value, ...fields } }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-start gap-2">
                          <Checkbox
                            id="privacy"
                            {...fields}
                            onChange={onChange}
                            value={value}
                            checked={value}
                            className="mt-1"
                          />
                          <label
                            htmlFor="privacy"
                            className="cursor-pointer select-none"
                          >
                            I understand that my Aadhaar details shall not be
                            used or stored for any other purpose.
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Alert
                  type="error"
                  message={FormInfo?.formState?.errors?.root?.message || ''}
                />
                <Button
                  variant="secondary"
                  type="submit"
                  className="w-full max-w-full "
                  loading={AadharLoading}
                  disabled={AadharLoading}
                >
                  Continue
                </Button>
              </div>
            </>
          ) : (
            <>
              <Typography as="h2" className="font-bold">
                OTP Verification
              </Typography>
              <div className="h-5"></div>
              <FormField
                name="otp"
                control={FormInfo.control}
                render={({ field: { value, onChange, ...fields } }) => (
                  <FormItem>
                    <FormLabel className="text-base font-normal text-black">
                      Please enter OTP
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
              <div className="h-2"></div>
              <Alert
                type="error"
                message={FormInfo?.formState?.errors?.root?.message || ''}
              />
              <Button
                type="button"
                variant="secondary"
                className="mt-3 w-full max-w-full rounded-lg bg-[#FFCC01] text-base font-semibold disabled:bg-gray-400"
                disabled={
                  FormInfo.watch('otp')?.length !== 6 ||
                  finalAadharSubmitLoading
                }
                onClick={verifyOTP}
                loading={finalAadharSubmitLoading}
              >
                Verify
              </Button>
              <div className="h-2"></div>
              <div className="flex justify-end">
                {startTimer?.start && (
                  <Typography className="text-sm font-normal">
                    Request a new OTP after {formattedTime}
                  </Typography>
                )}
                {!startTimer?.start && !isLoadingCaptcha && (
                  <div
                    className="cursor-pointer text-blue-600"
                    onClick={onSendOtp}
                  >
                    Resend OTP
                  </div>
                )}
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AadharForm;
