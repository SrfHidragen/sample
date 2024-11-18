/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoginFormSchema } from '@/schema/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@/components/TextField';
import WhiteCard from '@/components/WhiteCard';
import Typography from '@/components/Typography';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import Alert from '@/components/Alert';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const LoginForm = () => {
  const { error, loading, login, clearedAllSection, setError } = useAuth();
  const { data } = useSession();
  const LoginForm = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'all',
    defaultValues: {
      username: '',
      password: '',
      isConsumer: true,
    },
  });

  const onSubmit = async (value: z.infer<typeof LoginFormSchema>) => {
    const { password, username, isConsumer } = value;
    const input = {
      password,
      username: !isConsumer ? `+91${username}` : username,
      isConsumer,
    };
    login(input);
  };

  useEffect(() => {
    const subscription = LoginForm.watch(() => {
      if (LoginForm.formState.errors.root) {
        LoginForm.clearErrors('root');
      }
      setError('');
    });
    return () => subscription.unsubscribe();
  }, [LoginForm]);

  useEffect(() => {
    if (!data?.isAuthenticated) {
      clearedAllSection();
    }
  }, [data?.isAuthenticated]);
  return (
    <>
      <div className="container flex items-center justify-center py-8 md:py-14">
        <WhiteCard className="w-full md:max-w-[400px]">
          <Form {...LoginForm}>
            <form onSubmit={LoginForm.handleSubmit(onSubmit)}>
              <FormField
                name="isConsumer"
                control={LoginForm.control}
                // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ...fields } }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex cursor-pointer justify-between rounded-lg border-2 border-gray-700">
                        <span
                          className={cn(
                            value
                              ? 'bg-primary text-white'
                              : 'bg-white text-black',
                            'w-full content-center rounded-md p-3 text-center font-semibold duration-300 ease-in',
                          )}
                          onClick={() => {
                            LoginForm.setValue('password', '');
                            LoginForm.setValue('username', '');
                            onChange(true);
                          }}
                        >
                          Consumer
                        </span>
                        <span
                          className={cn(
                            !value
                              ? 'bg-primary text-white'
                              : 'bg-white text-black',
                            'w-full content-center rounded-md text-center font-semibold duration-300 ease-in',
                          )}
                          onClick={() => {
                            LoginForm.setValue('password', '');
                            LoginForm.setValue('username', '');
                            onChange(false);
                          }}
                        >
                          Customer
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="h-2"></div>
              <Typography as="h2" className="font-bold">
                {LoginForm.watch('isConsumer')
                  ? 'Consumer Login'
                  : 'Customer Login'}
              </Typography>
              <div className="h-4"></div>
              <FormField
                name="username"
                control={LoginForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {LoginForm.watch('isConsumer')
                        ? 'Consumership Number'
                        : 'Aadhar-linked Mobile Number'}
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        {!LoginForm.watch('isConsumer') && (
                          <input
                            type="text"
                            disabled={true}
                            autoComplete="off"
                            placeholder="+91"
                            className="focus:shadow-outline block h-[54px] w-full max-w-[53px] appearance-none rounded-lg border-2 border-[#9D9999] bg-white p-2 leading-tight text-black shadow placeholder:text-[15px] placeholder:font-normal placeholder:text-black focus:outline-none"
                          />
                        )}
                        <TextField
                          {...field}
                          type="number"
                          variant="primary"
                          placeholder={
                            LoginForm.watch('isConsumer')
                              ? 'Enter consumer number'
                              : 'Enter aadhar-linked mobile number'
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <div className="h-1"></div>
              <FormField
                name="password"
                control={LoginForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <TextField
                        variant="primary"
                        {...field}
                        type="password"
                        placeholder="Enter Password"
                        icon
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <div className="h-1"></div>
              <div
                className={cn(
                  `flex cursor-pointer text-[13px] font-normal text-primary ${LoginForm.watch('isConsumer') ? 'justify-between' : 'justify-end'}`,
                )}
              >
                {LoginForm.watch('isConsumer') && (
                  <Link href="/account?credential=forgot-consumership">
                    Forgot Consumership No ?
                  </Link>
                )}
                <Link href="/account?credential=forgot-password">
                  Forgot Password ?
                </Link>
              </div>
              <div className="h-4"></div>
              <Alert type="error" message={error || ''} />
              <div className="h-4"></div>

              <Button variant="secondary" disabled={loading} loading={loading}>
                Submit
              </Button>
            </form>
          </Form>
        </WhiteCard>
      </div>
    </>
  );
};

export default LoginForm;
