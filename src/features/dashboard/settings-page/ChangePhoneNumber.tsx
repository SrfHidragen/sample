'use client';

import ApiMessage from '@/components/ApiMessage';
import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form';
import OtpInput from '@/components/OtpInput';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import WhiteCard from '@/components/WhiteCard';
import {
  GET_OTP_FOR_CHANGE_MOBILE,
  SUBMIT_CHANGE_MOBILE_OTP,
} from '@/graphql/mutation/settings.mutation';
import withConsumer from '@/helper/withConsumer';
import { useOtpTimer } from '@/hooks/useOtpTimer';
import { useAuthStore } from '@/store/auth.store';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { z } from 'zod';

const validationSchema = z.object({
  phone_number: z
    .string()
    .nonempty({ message: 'Phone number is required' })
    .regex(/^[0-9]{10}$/, {
      message: 'Phone number must be exactly 10 digits',
    }),
  otp: z.string().optional(),
  isOtpField: z.boolean().optional(),
});
const ChangePhoneNumber = () => {
  const UserData = useAuthStore((state) => state?.user?.userDetails);
  const router = useRouter();
  const { formattedTime, resetTimer, startTimer } = useOtpTimer();
  const [GetOtp, { data, loading }] = useMutation(GET_OTP_FOR_CHANGE_MOBILE);
  const [SubmitOtp, { loading: submitLoading }] = useMutation(
    SUBMIT_CHANGE_MOBILE_OTP,
  );
  const [isEditable, setIsEditable] = useState(false);
  const formInfo = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      phone_number: UserData?.mobile || '',
    },
  });

  useEffect(() => {
    if (UserData?.mobile) {
      formInfo.setValue('phone_number', UserData.mobile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserData?.mobile]);

  const onHandleSubmitApi = async (change_mobile: string | number) => {
    const { data } = await GetOtp({
      variables: {
        oldMobile: UserData?.mobile,
        newMobile: change_mobile,
      },
    });
    if (data?.initiateChangeMobile?.statusCode == 200) {
      resetTimer();
      toast.success(data?.initiateChangeMobile?.message);
      formInfo.setValue('isOtpField', true);
    }
  };
  const onSubmit = async (e: z.infer<typeof validationSchema>) => {
    try {
      formInfo.setValue('otp', '');
      await onHandleSubmitApi(e.phone_number);
    } catch (error) {
      formInfo.setError('root', {
        message: 'Form Submitting Issues, Please try again',
      });
    }
  };

  const OtpSubmit = async (e: z.infer<typeof validationSchema>) => {
    const { data } = await SubmitOtp({
      variables: {
        oldMobile: UserData?.mobile,
        newMobile: e.phone_number,
        otp: e.otp,
      },
    });
    if (data?.changeMobile?.statusCode == 200) {
      toast.success(data?.changeMobile?.message);
      formInfo.setValue('isOtpField', false);
      router.push('/dashboard');
      setIsEditable(false);
    } else {
      toast.error(data?.changeMobile?.message);
      formInfo.setValue('otp', '');
    }
  };

  const error = data?.initiateChangeMobile?.errors?.phone ?? '';
  return (
    <>
      <WhiteCard className="mx-auto w-full max-w-md">
        {formInfo.watch('isOtpField') ? (
          <div
            onClick={() => {
              formInfo.setValue('isOtpField', false);
              formInfo.setValue('phone_number', '');
              formInfo.setValue('otp', '');
              setIsEditable(true);
            }}
            className="mb-5 flex cursor-pointer items-center gap-3 text-lg font-medium text-primary"
          >
            <BsArrowLeftCircle /> Change Mobile
          </div>
        ) : (
          <div className="mb-3 flex items-center justify-between">
            <Typography as="p" className="text-lg font-medium ">
              {'Phone Number'}
            </Typography>

            <button
              type="button"
              onClick={() => {
                formInfo.reset();
                setIsEditable((prev) => !prev);
              }}
              className="cursor-pointer text-lg font-medium text-primary"
            >
              {isEditable ? 'Cancel' : 'Edit'}
            </button>
          </div>
        )}

        {formInfo.watch('isOtpField') ? (
          <div className="text-center">
            <Typography as="p" className="text-base font-semibold ">
              Please enter the OTP send to
            </Typography>
            <Typography as="p" className="font-normal text-gray-500">
              +91{formInfo.watch('phone_number')}
            </Typography>
            <div className="h-2"></div>
          </div>
        ) : (
          <>
            <Typography as="p" className="text-base font-semibold ">
              Aadhar Registered Phone Number
            </Typography>
            <Typography as="p" className="font-normal text-gray-500">
              {UserData?.mobile}
            </Typography>
            <div className="h-2"></div>
          </>
        )}
        {!formInfo.watch('isOtpField') && (
          <Form {...formInfo}>
            <form
              className="flex max-w-xl flex-col gap-4"
              onSubmit={formInfo.handleSubmit(onSubmit)}
            >
              <FormField
                name="phone_number"
                control={formInfo.control}
                disabled={!isEditable}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        variant={'primary'}
                        {...field}
                        type="number"
                        placeholder="Update Phone Number"
                        className="disabled:bg-gray-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                disabled={loading || !isEditable}
                loading={loading}
                type="submit"
                variant={'secondary'}
                className="disabled:cursor-not-allowed disabled:opacity-60"
              >
                Update Phone Number
              </Button>
            </form>
          </Form>
        )}

        {formInfo.watch('isOtpField') && (
          <Form {...formInfo}>
            <form
              className="flex max-w-xl flex-col gap-4"
              onSubmit={formInfo.handleSubmit(OtpSubmit)}
            >
              <FormField
                name="otp"
                control={formInfo.control}
                render={({ field: { value, onChange, ...fields } }) => (
                  <FormItem>
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
                          outline: 'none',
                        }}
                        inputStyle={{
                          width: '44px',
                          height: '44px',
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
              <div className="flex justify-between">
                <Typography className="text-sm font-normal text-gray-500">
                  Request a new OTP after {formattedTime}
                </Typography>
                {!startTimer?.start && (
                  <span
                    className="cursor-pointer text-sm font-semibold text-blue-600"
                    onClick={() =>
                      onHandleSubmitApi(formInfo.watch('phone_number'))
                    }
                  >
                    Resend OTP
                  </span>
                )}
              </div>
              <Button
                disabled={formInfo.watch('otp')?.length !== 6 || submitLoading}
                loading={submitLoading}
                type="submit"
                variant={'secondary'}
                className="disabled:bg-gray-400"
              >
                Submit OTP
              </Button>
            </form>
          </Form>
        )}
      </WhiteCard>

      {/* {data?.}+ */}
      {error && <ApiMessage type="failed" message={error} />}
    </>
  );
};

export default withConsumer(ChangePhoneNumber);
