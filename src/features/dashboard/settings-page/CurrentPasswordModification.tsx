/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
'use client';
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
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import WhiteCard from '@/components/WhiteCard';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '@/graphql/mutation/settings.mutation';
import Alert from '@/components/Alert';
import toast from 'react-hot-toast';
import withConsumer from '@/helper/withConsumer';
import { TiTick } from 'react-icons/ti';
import { IoCloseSharp } from 'react-icons/io5';

const validationSchema = z
  .object({
    current_password: z
      .string()
      .nonempty({ message: 'Current password is required' }),
    new_password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[a-z]/, { message: 'Must contain at least one lowercase letter' })
      .regex(/[A-Z]/, { message: 'Must contain at least one uppercase letter' })
      .regex(/[0-9]/, { message: 'Must contain at least one number' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Must contain at least one special character',
      }),
    confirm_password: z
      .string()
      .nonempty({ message: 'Please confirm your new password' }),
  })
  .superRefine((data, ctx) => {
    if (data.new_password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirm_password'],
        message: 'Passwords do not match',
      });
    }
  });

const CurrentPasswordModification = () => {
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  });
  const [mutateResetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const formInfo = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      confirm_password: '',
      current_password: '',
      new_password: '',
    },
  });

  useEffect(() => {
    const password = formInfo.watch('new_password');

    setPasswordValidations({
      minLength: password.length >= 8,
      lower: /[a-z]/.test(password),
      upper: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    });
  }, [formInfo.watch('new_password')]);

  const onSubmit = async (value: z.infer<typeof validationSchema>) => {
    try {
      const resp = await mutateResetPassword({
        variables: {
          oldPassword: value.current_password,
          newPassword: value.new_password,
        },
      });
      if (resp?.data.resetPassword?.statusCode !== 200) {
        return formInfo.setError('root', {
          type: 'manual',
          message: resp?.data?.resetPassword?.message,
        });
      }
      toast.success(resp?.data?.resetPassword?.message);
      formInfo.reset();
    } catch (error) {
      return formInfo.setError('root', {
        type: 'manual',
        message: 'Please check your entered data',
      });
    }
  };

  return (
    <WhiteCard className="mx-auto w-full max-w-lg">
      <Typography as="p" className="mb-5 text-xl font-medium ">
        Update Password
      </Typography>
      <Form {...formInfo}>
        <form
          className="flex max-w-xl flex-col gap-5"
          onSubmit={formInfo.handleSubmit(onSubmit)}
        >
          <div>
            <FormLabel className=" text-lg font-normal ">
              Current Password
            </FormLabel>
            <div className="h-2"></div>
            <FormField
              name="current_password"
              control={formInfo.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      variant={'primary'}
                      {...field}
                      type="password"
                      placeholder="Update Password"
                      icon
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormLabel className=" text-lg font-normal ">
              New Password
            </FormLabel>
            <div className="h-2"></div>
            <FormField
              name="new_password"
              control={formInfo.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      variant={'primary'}
                      {...field}
                      type="password"
                      placeholder="Update Password"
                      icon
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormLabel className=" text-lg font-normal ">
              Confirm Password
            </FormLabel>
            <div className="h-2"></div>
            <FormField
              name="confirm_password"
              control={formInfo.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextField
                      variant={'primary'}
                      {...field}
                      type="password"
                      placeholder="Update Password"
                      icon
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
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
                  passwordValidations.upper ? 'text-green-500' : 'text-red-700'
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
                  passwordValidations.lower ? 'text-green-500' : 'text-red-700'
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
                  passwordValidations.number ? 'text-green-500' : 'text-red-700'
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
          <Alert
            type="error"
            message={formInfo?.formState?.errors?.root?.message || ''}
          />
          <Button
            type="submit"
            variant={'secondary'}
            disabled={loading}
            loading={loading}
          >
            Update Password
          </Button>
        </form>
      </Form>
    </WhiteCard>
  );
};

export default withConsumer(CurrentPasswordModification);
