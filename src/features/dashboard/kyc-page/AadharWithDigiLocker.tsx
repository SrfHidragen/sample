'use client';
import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form';
import Image from '@/components/Image';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import { DIGI_LOCKER_INITIATE } from '@/graphql/mutation/kyc.mutation';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const AadharSchema = z.object({
  aadhar_number: z
    .string()
    .length(12, { message: 'Aadhar number must be exactly 12 digits' })
    .regex(/^\d+$/, { message: 'Aadhar number must be numeric' }),
  pathname: z.string().optional(),
});

function AadharWithDigiLocker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mutateDigiLocker, { loading }] = useMutation(DIGI_LOCKER_INITIATE);

  const FormInfo = useForm<z.infer<typeof AadharSchema>>({
    resolver: zodResolver(AadharSchema),
    mode: 'all',
    defaultValues: {
      aadhar_number: '',
      pathname: `${window.location.origin}${pathname}${searchParams.toString() ? '?' + searchParams.toString() : ''}`,
    },
  });

  const onSubmit = async (values: z.infer<typeof AadharSchema>) => {
    try {
      const { data } = await mutateDigiLocker({
        variables: {
          url: values?.pathname || '',
        },
      });
      if (data?.createDigiLockerRequest?.statusCode !== 200) {
        toast.error(data?.createDigiLockerRequest?.message);
      }
    } catch (error) {
      toast.error('Please try-agin');
    }
  };
  return (
    <>
      <div className="h-full w-full rounded-lg bg-white p-4 md:max-w-[500px] md:p-10">
        <div className="flex flex-col gap-4">
          <Form {...FormInfo}>
            <form onSubmit={FormInfo.handleSubmit(onSubmit)}>
              <div className="w-40">
                <Image
                  src="/img/kyc/digiLocker.svg"
                  alt="digilocker"
                  className="w-full object-cover"
                />
              </div>

              <Typography className="text-base font-normal">
                To complete your Aadhaar verification, you&apos;ll be redirected
                to the DigiLocker website from our app. Once there, simply log
                in or sign up with your Aadhaar-linked mobile number. DigiLocker
                will securely fetch your Aadhaar details, and once verified,
                you&apos;ll be brought back to our app to continue
              </Typography>
              <div className="h-4"></div>
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
              <div className="h-1"></div>
              <Button
                variant={'secondary'}
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Continue to DigiLocker
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AadharWithDigiLocker;
