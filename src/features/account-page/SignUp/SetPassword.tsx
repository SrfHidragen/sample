/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
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
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TiTick } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';
import { useSignUpStore } from '@/store/register.store';
import useAuth from '@/hooks/useAuth';
import Alert from '@/components/Alert';
import { SetPasswordSchema } from '@/schema/auth.schema';

export default function SetPassword() {
  const CustomerRegistration = useSignUpStore(
    (state) => state?.CustomerRegistration,
  );
  const { error, loading, register } = useAuth();
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  });

  const formInfo = useForm<z.infer<typeof SetPasswordSchema>>({
    resolver: zodResolver(SetPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const password = formInfo.watch('password');

    setPasswordValidations({
      minLength: password.length >= 8,
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    });
  }, [formInfo.watch('password')]);

  const onSubmit = async (values: z.infer<typeof SetPasswordSchema>) => {
    const { communicationLanguage, motherTongue, phone, name } =
      CustomerRegistration;
    const { password } = values;
    const input = {
      name,
      communicationLanguage,
      motherTongue,
      phone,
      password,
      termsId: 6,
    };
    register(input);
  };

  const handleCopyandPaset = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const subscription = formInfo.watch(({ confirmPassword, password }) => {
      if (
        password &&
        password?.length >= 8 &&
        confirmPassword === password &&
        confirmPassword?.length === password?.length
      )
        if (formInfo.formState.errors.confirmPassword) {
          formInfo.clearErrors('confirmPassword');
        }
    });
    return () => subscription.unsubscribe();
  }, [formInfo]);

  return (
    //   <div className="flex min-h-screen items-center justify-center">
    <WhiteCard className="w-full max-w-[400px] p-6">
      <Typography as="h2" className="font-bold text-black">
        Set a strong password
      </Typography>
      <div className="h-6"></div>
      <Form {...formInfo}>
        <form onSubmit={formInfo.handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <div className="flex flex-col gap-4">
              <FormField
                control={formInfo.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-normal text-black">
                      Set Password
                    </FormLabel>
                    <FormControl>
                      <TextField
                        {...field}
                        type="password"
                        autoComplete="off"
                        placeholder="Enter Password"
                        onCopy={handleCopyandPaset}
                        onPaste={handleCopyandPaset}
                        onCut={handleCopyandPaset}
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
              <FormField
                control={formInfo.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-normal text-black">
                      Re-enter Password
                    </FormLabel>
                    <FormControl>
                      <TextField
                        {...field}
                        type="password"
                        autoComplete="off"
                        placeholder="Re-enter Password"
                        onCopy={handleCopyandPaset}
                        onPaste={handleCopyandPaset}
                        onCut={handleCopyandPaset}
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
            </div>
            <Alert type="error" message={error} />
            <Button
              // size="sm"
              variant="secondary"
              className="max-w-full rounded-lg bg-[#FFCC01] text-base"
              type="submit"
              disabled={loading}
              loading={loading}
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </WhiteCard>
    //   </div>
  );
}
