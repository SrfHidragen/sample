/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { number, z } from 'zod';
import Typography from '@/components/Typography';
import WhiteCard from '@/components/WhiteCard';
import TextField from '@/components/TextField';
import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';

import { useRouter, useSearchParams } from 'next/navigation';
import { convertToInrSymbol, decode, encode } from '@/lib/utils';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import Alert from '@/components/Alert';
import { PAY_GIVE_HELP_INITIATE_TOP_UP } from '@/graphql/mutation/givehelp.mutation';

const VerifyAndPaySchema = z.object({
  vpa_id: z
    .string({ required_error: 'UPI ID is required' })
    .min(1, 'UPI ID cannot be empty')
    .regex(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID format'),
  amount: z.any().optional(),
  txnId: z.string().optional(),
  payment_type: z.string().optional(),
});

const PayApproach = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const process = searchParams?.get('process');
  const ApproachItems = searchParams.get('tname') || '';
  const TransactionName = decode(ApproachItems);
  //===> Give-help Top-Up
  const [mutateGivehelpTopup, { loading: givehelpTopupLoading }] = useMutation(
    PAY_GIVE_HELP_INITIATE_TOP_UP,
  );

  //===> Zustand Store
  //   const { AddPaymentInfo, PaymentInfo } = usePaymentProcess();

  const form = useForm<z.infer<typeof VerifyAndPaySchema>>({
    resolver: zodResolver(VerifyAndPaySchema),
    defaultValues: {
      vpa_id: '',
      amount: '',
      txnId: '',
    },
  });

  useEffect(() => {
    if (process) {
      const total_amount = decode(process);
      form.setValue('amount', total_amount);
    }
  }, [process, form]);

  // Give-Help
  const payGiveHelpTopUp = async (
    vpa_id: string,
    amount: number | undefined,
  ) => {
    if (!number) {
      return form.setError('root', {
        message: 'Your Entered Amount is Incorrect',
      });
    }
    if (TransactionName === '') return;
    try {
      const { data } = await mutateGivehelpTopup({
        variables: {
          amount: Number(amount),
          upiId: vpa_id,
          transactionName: TransactionName,
        },
      });
      if (data?.initiateTopUp?.statusCode !== 200) {
        return form.setError('root', {
          message: data.initiateTopUp.message,
        });
      }
      toast.success(
        data?.initiateTopUp?.message || 'Payment Successfully Completed',
      );
      const EncodeTxnId = encode(data?.initiateTopUp?.data);

      router.replace(
        `/dashboard/choose-approach/verify-approach-payment?process=${process}&tn=${EncodeTxnId}`,
      );
    } catch (error) {
      form.setError('root', {
        message: 'Payment is Failed, Please re-payment',
      });
    }
  };

  //===> Submit Handler
  const onSubmit = async (values: z.infer<typeof VerifyAndPaySchema>) => {
    const { vpa_id, amount } = values;
    payGiveHelpTopUp(vpa_id, amount);
  };

  //   if (
  //     !PaymentInfo?.unique_key &&
  //     !PaymentInfo?.confirm_payment_id &&
  //     !LinkProcessId &&
  //     !LinkVerifyId
  //   ) {
  //     return <PageLoading />;
  //   }
  const isLoading = givehelpTopupLoading;

  return (
    <div className="flex w-full items-center justify-center py-24">
      <div className="w-full max-w-md sm:w-10/12 sm:max-w-[400px] sm:px-0">
        <WhiteCard className="flex flex-col rounded-2xl p-4 md:p-8">
          <div className="flex justify-between">
            <Typography
              as="h4"
              className="font-semibold leading-[21.09px] text-black"
            >
              Payable Amount
            </Typography>
            <Typography
              as="h4"
              className="font-semibold leading-[21.09px] text-black"
            >
              {convertToInrSymbol(form.watch('amount'))}
            </Typography>
          </div>
          <div className="h-3"></div>
          <Typography
            as="p"
            className="font-normal leading-[18.75px] text-black"
          >
            Verify the UPI ID and proceed
          </Typography>
          <div className="h-6"></div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="vpa_id"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor=""
                      className="text-[16px] font-normal leading-[18.7px] text-black"
                    >
                      Enter Your UPI ID
                    </FormLabel>
                    <FormControl>
                      <TextField
                        {...field}
                        placeholder="Enter Your UPI ID"
                        type="text"
                        variant="secondary"
                        className="border-2 border-[#9D9999] placeholder:text-[15px] placeholder:font-normal placeholder:text-[#999999]"
                      />
                    </FormControl>
                    <div className="pl-[0px]">
                      <FormMessage className="text-xs text-red-500" />
                    </div>
                  </FormItem>
                )}
              />
              <div className="h-2"></div>
              <Alert
                message={form.formState.errors.root?.message || ''}
                type="error"
              />
              <div className="h-2"></div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-yellow-500 text-black"
                loading={isLoading}
                disabled={isLoading}
              >
                Verify and Pay: {convertToInrSymbol(form.watch('amount'))}
              </Button>
            </form>
          </Form>
        </WhiteCard>
      </div>
    </div>
  );
};

export default PayApproach;
