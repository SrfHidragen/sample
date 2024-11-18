/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form';
import TextField from '@/components/TextField';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import WhiteCard from '@/components/WhiteCard';
import Typography from '@/components/Typography';
import { useMutation } from '@apollo/client';
import { EMAIL_UPDATE_MUTATION } from '@/graphql/mutation/settings.mutation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/auth.store';
import PageLoading from '@/components/PageLoading';
import { useRouter } from 'next/navigation';
import withConsumer from '@/helper/withConsumer';

const validationSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
});

const EmailModification = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const userDetails = useAuthStore((state) => state?.user?.userDetails);
  const [isEditable, setIsEditable] = useState(false);
  const [UpdateMail, { loading }] = useMutation(EMAIL_UPDATE_MUTATION);
  const formInfo = useForm({
    resolver: zodResolver(validationSchema),
    mode: 'all',
    defaultValues: {
      email: userDetails?.email || '',
    },
  });

  useEffect(() => {
    if (userDetails) {
      formInfo.setValue('email', userDetails?.email || '');
      setIsLoading(false);
    }
  }, [formInfo, userDetails]);
  const onSubmit = async (value: any) => {
    const { data } = await UpdateMail({
      variables: {
        email: value.email,
      },
    });
    if (data?.emailChangeGenerator?.statusCode == 200) {
      setIsEditable(false);
      toast.success(data?.emailChangeGenerator?.message);
      router.push('/dashboard');
    }
  };

  if (isLoading) return <PageLoading />;
  return (
    <WhiteCard className="mx-auto w-full max-w-lg">
      <div className="flex justify-between">
        <Typography className="text-lg font-medium" as="p">
          Email Address
        </Typography>
        {!isEditable && (
          <div
            onClick={() => setIsEditable(true)}
            className="cursor-pointer text-lg font-medium text-[#02158A]"
          >
            Edit
          </div>
        )}
      </div>
      <Form {...formInfo}>
        <form
          className="flex max-w-xl flex-col gap-4"
          onSubmit={formInfo.handleSubmit(onSubmit)}
        >
          <FormField
            name="email"
            control={formInfo.control}
            disabled={!isEditable}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextField
                    variant={'primary'}
                    {...field}
                    type="email"
                    placeholder="Update Email Address"
                    className="disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {isEditable && (
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditable(false)}
                type="button"
                variant={'secondary'}
                className="border-2 border-tertiary bg-white text-black hover:text-white"
              >
                Cancel
              </Button>
              <Button type="submit" variant={'secondary'} loading={loading}>
                Change Email Address
              </Button>
            </div>
          )}
        </form>
      </Form>
    </WhiteCard>
  );
};

export default withConsumer(EmailModification);
