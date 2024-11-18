/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useId } from 'react';
import Typography from '@/components/Typography';
import { Button } from '@/components/Button';
import { useQuery } from '@apollo/client';
import { GIVE_HELP_LIST } from '@/graphql/query/dashboard.query';
import NoData from '@/components/NoData';
import {
  capitalizeFirstLetter,
  convertToInrSymbol,
  encode,
  localDateConvertion,
} from '@/lib/utils';
import { usePaymentProcess } from '@/store/paymentprocess.store';
import {
  GIVE_HELP_PAYMENT_APPROACH,
  PAYMENT_TYPE,
} from '@/types/paymentprocess.store.type';
import { useRouter } from 'next/navigation';
import PageLoading from '@/components/PageLoading';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import TextField from '@/components/TextField';

type GiveHelpItem = {
  consumerName: string;
  consumerNumber: string;
  statusCode: number;
  updatedAt: string;
  approvedAt: string;
  totalAmount: number;
  pendingAmount: number;
  paidAmount: number;
  payButton: boolean;
};
type GiveHelpListResponse = {
  giveHelpList: GiveHelpItem[];
};

const GiveHelpHistory = () => {
  const encryptId = useId();
  const router = useRouter();
  const addPaymentMethod = usePaymentProcess((state) => state?.AddPaymentInfo);
  const { data, loading: historyLoading } = useQuery<GiveHelpListResponse>(
    GIVE_HELP_LIST,
    { fetchPolicy: 'network-only' },
  );

  const CurrentApproachAmount: number =
    Number(
      data?.giveHelpList?.find((item) => item?.payButton)?.pendingAmount,
    ) || 0;
  // const MIN_CHECK = CurrentApproachAmount >= 50 ? 50 : CurrentApproachAmount;

  const GiveHelpValidationSchema = z.object({
    amount: z
      .number()
      .min(1, {
        message: `Minimum amount Valid amount`,
      })
      .max(CurrentApproachAmount, {
        message: `Maximum amount is ${CurrentApproachAmount}`,
      }),
    unique_key: z.string().optional(),
  });

  const FormInfo = useForm<z.infer<typeof GiveHelpValidationSchema>>({
    resolver: zodResolver(GiveHelpValidationSchema),
    mode: 'all',
    defaultValues: {
      amount: CurrentApproachAmount,
    },
  });

  useEffect(() => {
    if (CurrentApproachAmount) {
      FormInfo.setValue('amount', CurrentApproachAmount);
    }
  }, [CurrentApproachAmount, FormInfo]);

  if (historyLoading) {
    return <PageLoading />;
  }

  if (data?.giveHelpList?.length === 0) {
    return (
      <>
        <div className="h-8"></div>
        <NoData />
      </>
    );
  }

  const onSubmit = (values: z.infer<typeof GiveHelpValidationSchema>) => {
    const { amount } = values;
    const uniqueId = encode(encryptId);
    addPaymentMethod(
      {
        amount,
        payment_page_level: 'about',
        unique_key: uniqueId,
        payment_type: PAYMENT_TYPE.GIVE_HELP_TOP_UP,
        total_amount: Number(amount),
        give_help_payment_approach: GIVE_HELP_PAYMENT_APPROACH.HELP_AMOUNT,
        give_help_transactionName: 'Change To Givehelp',
        // payment_description_type: 'giveHelp',
      },
      () => {
        router.push(`/dashboard/payment/about-payment?process=${uniqueId}`);
      },
    );
  };
  return (
    <>
      <div className="h-16"></div>

      <Form {...FormInfo}>
        <form onSubmit={FormInfo.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {data?.giveHelpList?.map((item, index: React.Key) => (
              <div
                key={index}
                className={`w-full rounded-md p-4 ${item?.statusCode === 3 ? 'bg-[#DCFEBA]' : 'bg-[#FFF1CF]'}`}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <Typography
                      as="h3"
                      className="text-[22.4px] font-bold text-black"
                    >
                      ₹{item?.totalAmount}
                    </Typography>
                  </div>
                  {/* grid grid-cols-[1.5fr,.5fr,2fr] gap-y-3 md:grid-cols-[3fr,1fr,2fr] */}
                  {/* flex */}
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-1">
                      <Typography
                        as="p"
                        className="flex-1 text-base font-normal text-black sm:text-[18px]"
                      >
                        Consumership No
                      </Typography>

                      <Typography
                        as="p"
                        className="text-center text-base font-normal text-black sm:text-[18px]"
                      >
                        :
                      </Typography>

                      <Typography
                        as="p"
                        className="flex-1 text-base font-normal text-black sm:text-[18px]"
                      >
                        {item?.consumerNumber}
                      </Typography>
                    </div>
                    <div className="flex gap-1">
                      <Typography
                        as="p"
                        className="flex-1 text-base font-normal text-black sm:text-[18px]"
                      >
                        Consumer Name
                      </Typography>

                      <Typography
                        as="p"
                        className="text-center text-base font-normal text-black sm:text-[18px]"
                      >
                        :
                      </Typography>

                      <Typography
                        as="p"
                        className="flex-1 text-base font-normal text-black sm:text-[18px]"
                      >
                        {capitalizeFirstLetter(item?.consumerName)}
                      </Typography>
                    </div>
                    <div className="flex gap-1">
                      <Typography
                        as="p"
                        className="flex-1 text-base font-normal text-black sm:text-[18px]"
                      >
                        Paid Amount
                      </Typography>

                      <Typography
                        as="p"
                        className="text-center text-base font-normal text-black sm:text-[18px]"
                      >
                        :
                      </Typography>

                      <Typography
                        as="p"
                        className="flex-1 text-base font-normal text-black sm:text-[18px]"
                      >
                        {item?.paidAmount === 0
                          ? `${item?.paidAmount}`
                          : `₹${item?.paidAmount}`}
                      </Typography>
                    </div>

                    <div className="flex gap-1">
                      <Typography
                        as="p"
                        className="flex-1 text-base font-normal text-black sm:text-[18px]"
                      >
                        Pending Amount
                      </Typography>

                      <Typography
                        as="p"
                        className="text-center text-base font-normal text-black sm:text-[18px]"
                      >
                        :
                      </Typography>

                      <Typography
                        as="p"
                        className="flex-1 text-base font-normal text-black sm:text-[18px]"
                      >
                        {convertToInrSymbol(item?.pendingAmount)}
                      </Typography>
                    </div>

                    <div className="flex gap-1">
                      <Typography
                        as="p"
                        className="flex-1 text-base font-normal text-black sm:text-[18px]"
                      >
                        Status
                      </Typography>

                      <Typography
                        as="p"
                        className="text-center text-base font-normal text-black sm:text-[18px]"
                      >
                        :
                      </Typography>
                      {item?.statusCode === 3 ? (
                        <Typography
                          as="p"
                          className="flex-1 text-base font-normal text-green-500 sm:text-[18px]"
                        >
                          Completed
                        </Typography>
                      ) : (
                        <Typography
                          as="p"
                          className="flex-1 text-base font-normal text-orange-500 sm:text-[18px]"
                        >
                          Waiting
                        </Typography>
                      )}
                    </div>
                    {item?.statusCode === 3 && item?.approvedAt && (
                      <>
                        <div className="flex gap-1">
                          <Typography
                            as="p"
                            className="flex-1 text-base font-normal text-black sm:text-[18px]"
                          >
                            Date and Time
                          </Typography>

                          <Typography
                            as="p"
                            className="text-center text-base font-normal text-black sm:text-[18px]"
                          >
                            :
                          </Typography>

                          <Typography
                            as="p"
                            className="flex-1 text-base font-normal text-black sm:text-[18px]"
                          >
                            {localDateConvertion(item?.approvedAt, true)}
                          </Typography>
                        </div>
                      </>
                    )}
                  </div>
                  {/* end */}
                  {item?.payButton && (
                    <>
                      <FormField
                        name="amount"
                        control={FormInfo.control}
                        render={({ field: { onChange, ...fields } }) => (
                          <FormItem>
                            <FormLabel
                              htmlFor=""
                              className="text-[16px] font-normal leading-[18.7px] text-black"
                            >
                              Please Enter Give Help Amount
                            </FormLabel>
                            <FormControl>
                              <TextField
                                {...fields}
                                placeholder="Please Enter Give Help Amount"
                                type="number"
                                onChange={(e) => {
                                  onChange(Number(e.target.value));
                                }}
                                variant="primary"
                                className="py-4 font-medium"
                              />
                            </FormControl>

                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <Typography className="text-sm text-red-500">
                        * Maximum amount{' '}
                        {convertToInrSymbol(CurrentApproachAmount)}
                      </Typography>

                      <div className="flex flex-col gap-4 md:flex-row">
                        <Button
                          className="w-full max-w-full rounded-lg py-2 text-base font-semibold text-black disabled:bg-gray-200"
                          variant={'secondary'}
                          type="submit"
                          disabled={!item?.payButton}
                        >
                          Pay
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </form>
      </Form>
    </>
  );
};

export default GiveHelpHistory;
