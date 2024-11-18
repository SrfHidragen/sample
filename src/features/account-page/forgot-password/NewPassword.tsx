/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
'use client';
import { Button } from '@/components/Button';
import {
  Form,
  FormLabel,
  FormField,
  FormMessage,
  FormItem,
  FormControl,
} from '@/components/Form';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import WhiteCard from '@/components/WhiteCard';
import { SUBMIT_NEW_PASSWORD } from '@/graphql/mutation/auth.mutation';
import { GlobalVariables } from '@/lib/constant';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { IoCloseSharp } from 'react-icons/io5';
import { TiTick } from 'react-icons/ti';
import { z } from 'zod';

const NewPasswordSchema = z
  .object({
    new_password: z
      .string({ required_error: GlobalVariables.ValidationMessage.REQUIRED })
      .min(6, { message: GlobalVariables.ValidationMessage.MIN_PASSWORD })
      .regex(/[a-z]/, {
        message: GlobalVariables.ValidationMessage.PASSWORD_LOWER,
      })
      .regex(/[A-Z]/, {
        message: GlobalVariables.ValidationMessage.PASSWORD_UPPER,
      })
      .regex(/[0-9]/, {
        message: GlobalVariables.ValidationMessage.PASSWORD_NUMBER,
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: GlobalVariables.ValidationMessage.PASSWORD_SPECIAL,
      }),
    confirm_password: z
      .string({ required_error: GlobalVariables.ValidationMessage.REQUIRED })
      .min(6, { message: GlobalVariables.ValidationMessage.MIN_PASSWORD })
      .regex(/[a-z]/, {
        message: GlobalVariables.ValidationMessage.PASSWORD_LOWER,
      })
      .regex(/[A-Z]/, {
        message: GlobalVariables.ValidationMessage.PASSWORD_UPPER,
      })
      .regex(/[0-9]/, {
        message: GlobalVariables.ValidationMessage.PASSWORD_NUMBER,
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: GlobalVariables.ValidationMessage.PASSWORD_SPECIAL,
      }),
    phoneNumber: z.string().optional(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

const NewPassword = () => {
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    mode: 'all',
    defaultValues: {
      confirm_password: '',
      new_password: '',
    },
  });
  useEffect(() => {
    const password = form.watch('new_password');

    setPasswordValidations({
      minLength: password?.length >= 8,
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    });
  }, [form.watch('new_password')]);
  const [mutateForgot, { loading }] = useMutation(SUBMIT_NEW_PASSWORD);

  const onSubmit = async (values: z.infer<typeof NewPasswordSchema>) => {
    const { new_password, phoneNumber } = values;
    const { data: submitData } = await mutateForgot({
      variables: {
        phoneNumber: '+91' + phoneNumber,
        password: new_password,
      },
    });

    if (submitData?.forgotPassword?.statusCode !== 200) {
      return form.setError('root', {
        message: submitData?.forgotPassword.message,
      });
    }
    toast.success('Password changed successfully');
    router.replace('/account');
  };

  // getting mobile number from search params
  useEffect(() => {
    const urlData: string = searchParams.get('ph') || '';
    const decodedMobile = atob(urlData);
    if (decodedMobile !== '' && decodedMobile?.length === 10) {
      form.setValue('phoneNumber', decodedMobile);
    } else {
      router.replace('/account?credential=forgot-password');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex w-full items-center justify-center py-24">
      <div className="w-full max-w-md px-4 sm:w-10/12 sm:px-0">
        <WhiteCard className="w-full max-w-[436px] rounded-2xl shadow-lg">
          <Typography as="h2" className="text-[32px] font-bold text-black">
            New Password
          </Typography>
          <div className="h-6"></div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormLabel
                htmlFor=""
                className="text-base font-normal text-black"
              >
                New Password
              </FormLabel>
              <div className="h-2"></div>
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        {...field}
                        type="password"
                        autoComplete="off"
                        placeholder="Enter Password"
                        variant="primary"
                        className="pr-10 placeholder:text-[15px] placeholder:font-normal placeholder:text-[#999999]"
                        icon={true}
                        iconClassnames="text-black text-[16px]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <div className="h-3"></div>
              <FormLabel
                htmlFor=""
                className="text-base font-normal text-black"
              >
                Confirm Password
              </FormLabel>
              <div className="h-2"></div>
              <FormField
                name="confirm_password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        {...field}
                        type="password"
                        autoComplete="off"
                        placeholder="Enter Confirm Password"
                        variant="primary"
                        className="pr-10 placeholder:text-[15px] placeholder:font-normal placeholder:text-[#999999]"
                        icon={true}
                        iconClassnames="text-black text-[16px]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <div>
                <Typography className="text-lg font-medium text-black">
                  Your password should contain
                </Typography>
                <div className="h-1"></div>
                <div className="flex items-center space-x-2">
                  {passwordValidations.upper ? (
                    <TiTick className="h-5 w-5 fill-green-500" />
                  ) : (
                    <IoCloseSharp className="h-5 w-5 text-red-700" />
                  )}
                  <Typography
                    className={`text-sm font-normal ${
                      passwordValidations.upper
                        ? 'text-green-500'
                        : 'text-red-700'
                    }`}
                  >
                    At least 1 upper case alphabet
                  </Typography>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordValidations.lower ? (
                    <TiTick className="h-5 w-5 fill-green-500" />
                  ) : (
                    <IoCloseSharp className="h-5 w-5 text-red-700" />
                  )}
                  <Typography
                    className={`text-sm font-normal ${
                      passwordValidations.lower
                        ? 'text-green-500'
                        : 'text-red-700'
                    }`}
                  >
                    At least 1 lower case alphabet
                  </Typography>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordValidations.special ? (
                    <TiTick className="h-5 w-5 fill-green-500" />
                  ) : (
                    <IoCloseSharp className="h-5 w-5 text-red-700" />
                  )}
                  <Typography
                    className={`text-sm font-normal ${
                      passwordValidations.special
                        ? 'text-green-500'
                        : 'text-red-700'
                    }`}
                  >
                    At least 1 special character
                  </Typography>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordValidations.number ? (
                    <TiTick className="h-5 w-5 fill-green-500" />
                  ) : (
                    <IoCloseSharp className="h-5 w-5 text-red-700" />
                  )}
                  <Typography
                    className={`text-sm font-normal ${
                      passwordValidations.number
                        ? 'text-green-500'
                        : 'text-red-700'
                    }`}
                  >
                    At least 1 Number
                  </Typography>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordValidations.minLength ? (
                    <TiTick className="h-5 w-5 fill-green-500" />
                  ) : (
                    <IoCloseSharp className="h-5 w-5 text-red-700" />
                  )}
                  <Typography
                    className={`text-sm font-normal ${
                      passwordValidations.minLength
                        ? 'text-green-500'
                        : 'text-red-700'
                    }`}
                  >
                    At least 8 characters
                  </Typography>
                </div>
              </div>
              <div className="h-6"></div>

              <Button
                loading={loading}
                disabled={loading}
                variant="secondary"
                className="max-w-full rounded-lg bg-[#FFCC01] text-base"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </WhiteCard>
      </div>
    </div>
  );
};

export default NewPassword;
