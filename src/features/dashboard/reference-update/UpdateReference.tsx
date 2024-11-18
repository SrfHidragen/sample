'use client';
import Alert from '@/components/Alert';
import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import { UPDATE_REFERENCE_MUTATION } from '@/graphql/mutation/update.referenceid';
import { GlobalVariables } from '@/lib/constant';
import { encode } from '@/lib/utils';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const ReferenceSchema = z.object({
  reference_id: z
    .string()
    .nonempty({ message: GlobalVariables.ValidationMessage.REQUIRED }),
});

function UpdateReference() {
  const searchParams = useSearchParams().get('roll-up');
  const encodeId = encode(searchParams);
  const router = useRouter();
  const [mutateReferenceId, { loading }] = useMutation(
    UPDATE_REFERENCE_MUTATION,
  );

  const FormInfo = useForm<z.infer<typeof ReferenceSchema>>({
    resolver: zodResolver(ReferenceSchema),
    mode: 'all',
    defaultValues: {
      reference_id: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof ReferenceSchema>) => {
    const { reference_id } = values;
    try {
      const { data } = await mutateReferenceId({
        variables: {
          referenceUsername: reference_id,
        },
      });
      if (data?.updateReference?.statusCode !== 200) {
        FormInfo.setError('root', { message: data?.updateReference?.message });
        return;
      }
      toast.success(data?.updateReference?.message);

      if (encodeId === 'true') {
        router.replace('/dashboard/choose-approach/approach-about-payment');
      }
    } catch (error) {
      FormInfo.setError('root', { message: 'Invalid data, Please try again' });
    }
  };

  useEffect(() => {
    const subscription = FormInfo.watch(({ reference_id }) => {
      if (reference_id) {
        if (FormInfo.formState.errors.root) {
          FormInfo.clearErrors('root');
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [FormInfo]);
  return (
    <>
      <div className="container">
        <div className="h-6"></div>
        <div className="m-auto w-full max-w-[400px] bg-white p-8">
          <Typography className="text-xl font-semibold text-black">
            Reference ID
          </Typography>
          <div className="h-2"></div>
          <Form {...FormInfo}>
            <form onSubmit={FormInfo.handleSubmit(onSubmit)}>
              <FormField
                name="reference_id"
                control={FormInfo.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        variant="primary"
                        {...field}
                        type="text"
                        placeholder="Enter Reference ID"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <div className="h-2"></div>
              <Alert
                type="error"
                message={FormInfo.formState.errors.root?.message || ''}
              />
              <div className="h-2"></div>
              <Button
                type="submit"
                variant={'secondary'}
                disabled={loading}
                loading={loading}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default UpdateReference;
