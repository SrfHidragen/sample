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
import { usePaymentProcess } from '@/store/paymentprocess.store';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { convertToInrSymbol, decode, encode } from '@/lib/utils';
import { useMutation } from '@apollo/client';
import { INITIAL_PROCESSING_FEE } from '@/graphql/mutation/initialpmfpayment.mutation';
import toast from 'react-hot-toast';
import { PAYMENT_TYPE } from '@/types/paymentprocess.store.type';
import { INITIAL_PMF_PAYMENT } from '@/graphql/mutation/pmf.mutation';
import Alert from '@/components/Alert';
import { PAY_GIVE_HELP_INITIATE_TOP_UP } from '@/graphql/mutation/givehelp.mutation';
import PageLoading from '@/components/PageLoading';
import withConsumer from '@/helper/withConsumer';

const VerifyAndPaySchema = z.object({
  vpa_id: z
    .string({ required_error: 'UPI ID is required' })
    .min(1, 'UPI ID cannot be empty')
    .regex(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID format'),
  amount: z.any().optional(),
  txnId: z.string().optional(),
  payment_type: z.string().optional(),
});

const VerifyAndPay = () => {
  const router = useRouter();
  const LinkProcessId = useSearchParams()?.get('process');
  const LinkVerifyId = useSearchParams().get('verify');

  //===> Initial processing fee
  const [mutateProcessingFee, { loading }] = useMutation(
    INITIAL_PROCESSING_FEE,
  );

  //===>Initial PMF Processing Payment
  const [mutateInitialPMF, { loading: PmfLoading }] =
    useMutation(INITIAL_PMF_PAYMENT);

  //===> Give-help Top-Up
  const [mutateGivehelpTopup, { loading: givehelpTopupLoading }] = useMutation(
    PAY_GIVE_HELP_INITIATE_TOP_UP,
  );

  //===> Zustand Store
  const { AddPaymentInfo, PaymentInfo } = usePaymentProcess();

  const form = useForm<z.infer<typeof VerifyAndPaySchema>>({
    resolver: zodResolver(VerifyAndPaySchema),
    defaultValues: {
      vpa_id: '',
      amount: PaymentInfo?.total_amount || '',
      txnId: '',
      payment_type: PaymentInfo?.payment_type,
    },
  });

  useEffect(() => {
    if (
      PaymentInfo?.unique_key &&
      PaymentInfo?.confirm_payment_id &&
      LinkProcessId &&
      LinkVerifyId
    ) {
      const UniqueId = decode(PaymentInfo?.unique_key);
      const ConfirmId = decode(PaymentInfo?.confirm_payment_id);
      const ProcessId = decode(LinkProcessId);
      const VerifyId = decode(LinkVerifyId);
      if (UniqueId !== ProcessId && ConfirmId && VerifyId) {
        return notFound();
      }
    } else {
      return notFound();
    }
  }, [
    LinkProcessId,
    LinkVerifyId,
    PaymentInfo?.unique_key,
    PaymentInfo?.confirm_payment_id,
  ]);

  //initial Processing Payment
  const initialProcessingPayment = async (
    vpa_id: string,
    amount: number | undefined,
  ) => {
    if (!number) {
      return form.setError('root', {
        message: 'Your Entered Amount is Incorrect',
      });
    }
    try {
      const { data } = await mutateProcessingFee({
        variables: {
          amount,
          upiId: vpa_id,
        },
      });
      if (data?.sendProcessingFee?.statusCode !== 200) {
        return form.setError('root', {
          message: data.sendProcessingFee.message,
        });
      }
      toast.success('UPI ID submitted successfull');
      const EncodeTxnId = encode(data?.sendProcessingFee?.data?.merchantTxnId);
      AddPaymentInfo({
        txnId: EncodeTxnId,
        upi_id: vpa_id,
        request_time: data?.sendProcessingFee?.data?.updatedAt,
      });
      router.replace(`/dashboard/payment/complete-payment?tn=${EncodeTxnId}`);
    } catch (error) {
      form.setError('root', {
        message: 'Payment is Failed, Please re-payment',
      });
    }
  };

  //initial Pmf amount
  const initialPmfPayment = async (
    vpa_id: string,
    amount: number | undefined,
  ) => {
    if (!number) {
      return form.setError('root', {
        message: 'Your Entered Amount is Incorrect',
      });
    }
    try {
      const { data } = await mutateInitialPMF({
        variables: {
          amount,
          upiId: vpa_id,
        },
      });
      if (data?.initialPmf?.statusCode !== 200) {
        return form.setError('root', {
          message: data.initialPmf.message,
        });
      }
      toast.success('UPI ID submitted successfull');
      const EncodeTxnId = encode(data?.initialPmf?.data?.merchantTxnId);
      AddPaymentInfo({
        txnId: EncodeTxnId,
        upi_id: vpa_id,
      });
      router.replace(`/dashboard/payment/complete-payment?tn=${EncodeTxnId}`);
    } catch (error) {
      form.setError('root', {
        message: 'Payment is Failed, Please re-payment',
      });
    }
  };

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
    if (PaymentInfo.give_help_transactionName === '') return;
    try {
      const { data } = await mutateGivehelpTopup({
        variables: {
          amount,
          upiId: vpa_id,
          transactionName: PaymentInfo.give_help_transactionName,
        },
      });
      if (data?.initiateTopUp?.statusCode !== 200) {
        return form.setError('root', {
          message: data.initialPmf.message,
        });
      }
      toast.success('UPI ID submitted successfull');
      const EncodeTxnId = encode(data?.initiateTopUp?.data?.merchantTxnId);
      AddPaymentInfo({
        txnId: EncodeTxnId,
        upi_id: vpa_id,
        upiTxnId: data?.initiateTopUp?.data?.upiTxnId,
        request_time: data?.initiateTopUp?.data?.updatedAt,
      });
      router.replace(`/dashboard/payment/complete-payment?tn=${EncodeTxnId}`);
    } catch (error) {
      form.setError('root', {
        message: 'Payment is Failed, Please re-payment',
      });
    }
  };

  //===> Submit Handler
  const onSubmit = async (values: z.infer<typeof VerifyAndPaySchema>) => {
    const { vpa_id, payment_type } = values;
    if (payment_type === PAYMENT_TYPE.PROCESSING_FEE) {
      initialProcessingPayment(vpa_id, PaymentInfo.total_amount);
    }
    if (payment_type === PAYMENT_TYPE.INITIAL_PMF_FEE) {
      initialPmfPayment(vpa_id, 1);
    }
    if (payment_type === PAYMENT_TYPE.GIVE_HELP_TOP_UP) {
      payGiveHelpTopUp(vpa_id, PaymentInfo.total_amount);
    }
  };
  if (
    !PaymentInfo?.unique_key &&
    !PaymentInfo?.confirm_payment_id &&
    !LinkProcessId &&
    !LinkVerifyId
  ) {
    return <PageLoading />;
  }
  const isLoading = givehelpTopupLoading || loading || PmfLoading;

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

export default withConsumer(VerifyAndPay);
