'use client';
import React, { useEffect } from 'react';
import { Button } from '@/components/Button';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import WhiteCard from '@/components/WhiteCard';
import { useMutation } from '@apollo/client';
import { FORGOT_CONSUMERSHIPNUMBER_MUTATION } from '@/graphql/mutation/auth.mutation';
import Alert from '@/components/Alert';
import { useRouter } from 'next/navigation';

const ForgotConsumershipSchema = z.object({
  phone_number: z
    .string({ required_error: 'Phone number is required' })
    .regex(/^[0-9]{10}$/, {
      message: 'Phone number must be exactly 10 digits',
    }),
  consumership_number: z.string().optional(),
});

const ForgotConsumership = () => {
  const router = useRouter();
  const [mutateForgotConsumerhipNumber, { loading }] = useMutation(
    FORGOT_CONSUMERSHIPNUMBER_MUTATION,
  );

  const form = useForm<z.infer<typeof ForgotConsumershipSchema>>({
    resolver: zodResolver(ForgotConsumershipSchema),
    mode: 'all',
    defaultValues: {
      phone_number: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof ForgotConsumershipSchema>) => {
    const { data } = await mutateForgotConsumerhipNumber({
      variables: { phoneNumber: `+91${values.phone_number}` },
    });
    if (data?.forgotUsername.statusCode !== 200) {
      return form.setError('root', {
        message: data?.forgotUsername.message,
      });
    }
    form.setValue('consumership_number', data.forgotUsername.data);
  };

  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.errors.root) {
        form.clearErrors('root');
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleCopyAndLogin = () => {
    navigator.clipboard.writeText(form.watch('consumership_number') || '');
    router.replace('/account');
  };
  return (
    <div className="flex w-full items-center justify-center py-24">
      <div className="w-full max-w-md px-4 sm:w-10/12 sm:max-w-[450px] sm:px-0">
        <WhiteCard className="flex flex-col gap-6 rounded-2xl p-8">
          <Typography
            as="h2"
            className="font-bold leading-[28.13px] text-black"
          >
            Forgot Consumership Number
          </Typography>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="phone_number"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor=""
                      className="text-[16px] font-normal leading-[18.7px] text-black"
                    >
                      Enter Your Mobile Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <div className="w-[53px]">
                          <TextField
                            placeholder="+91"
                            type="text"
                            variant="secondary"
                            className="border-2 border-[#9D9999] placeholder:text-[15px] placeholder:font-normal placeholder:text-black"
                            disabled
                          />
                        </div>
                        <TextField
                          {...field}
                          placeholder="Enter Your Mobile Number"
                          type="text"
                          variant="secondary"
                          className="border-2 border-[#9D9999] placeholder:text-[15px] placeholder:font-normal placeholder:text-[#999999]"
                        />
                      </div>
                    </FormControl>
                    <div className="pl-[52px]">
                      <FormMessage className="text-xs text-red-500" />
                    </div>
                  </FormItem>
                )}
              />
              <div className="h-3"></div>
              <Alert
                type="error"
                message={form.formState.errors.root?.message || ''}
              />
              {form.watch('consumership_number') && (
                <Typography as="p" className="leading-[18.75px] text-black">
                  Your Consumership Number is:{' '}
                  <Typography
                    as="span"
                    className="text-lg font-semibold text-primary"
                  >
                    {form.watch('consumership_number')}
                  </Typography>
                </Typography>
              )}
              <div className="h-3"></div>

              {form.watch('consumership_number') ? (
                <Button
                  onClick={handleCopyAndLogin}
                  size="lg"
                  className="w-full bg-yellow-500 text-black"
                >
                  Copy and Continue to Login
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#FFCC01] text-black"
                  disabled={loading}
                  loading={loading}
                >
                  Continue
                </Button>
              )}
            </form>
          </Form>
        </WhiteCard>
      </div>
    </div>
  );
};

export default ForgotConsumership;
