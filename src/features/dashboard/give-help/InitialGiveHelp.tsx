'use client';
import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/Form';
import PageLoading from '@/components/PageLoading';
import Typography from '@/components/Typography';
import { GET_USER_PLAN } from '@/graphql/query/givehelp.query';
import { GlobalVariables } from '@/lib/constant';
import { cn, convertToInrSymbol, encode } from '@/lib/utils';
import { usePaymentProcess } from '@/store/paymentprocess.store';
import {
  GIVE_HELP_PAYMENT_APPROACH,
  PAYMENT_TYPE,
} from '@/types/paymentprocess.store.type';
import { useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useId } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type UserPlan = {
  versions: string;
  initialGiveHelpLevel: number;
  amount: string;
  paidStatus: boolean;
};

type GetUserPlansResponse = {
  getUserPlans: UserPlan[];
};
const DEFAULT_VALUES = 2;
// Update schema to accept a single number
const GiveHelpNewSchema = z.object({
  selectApproach: z.number().refine((value) => value > 0, {
    message: GlobalVariables.ValidationMessage.REQUIRED,
  }),
  approach_details: z.object({
    versions: z.string().optional(),
    initialGiveHelpLevel: z.number().optional(),
    amount: z.string().optional(),
    paidStatus: z.boolean().optional(),
  }),
});

const InitialGiveHelp = () => {
  const router = useRouter();
  const payment_id = useId();
  const { AddPaymentInfo } = usePaymentProcess();
  const { data, loading } = useQuery<GetUserPlansResponse>(GET_USER_PLAN, {
    fetchPolicy: 'network-only',
  });
  const FormInfo = useForm<z.infer<typeof GiveHelpNewSchema>>({
    resolver: zodResolver(GiveHelpNewSchema),
    mode: 'all',
    defaultValues: {
      selectApproach: 0,
    },
  });
  const onSubmit = (values: z.infer<typeof GiveHelpNewSchema>) => {
    if (
      values?.approach_details?.paidStatus &&
      !values?.approach_details?.amount
    ) {
      return FormInfo.setError('root', {
        message: 'Please check payment details..!',
      });
    }
    const encode_payment_id = encode(payment_id);
    const encode_version = encode(values?.approach_details?.versions);
    AddPaymentInfo(
      {
        amount: Number(values?.approach_details?.amount),
        unique_key: encode_payment_id,
        payment_type: PAYMENT_TYPE.GIVE_HELP_TOP_UP,
        total_amount: Number(values?.approach_details?.amount),
        approach_level: values.approach_details.initialGiveHelpLevel,
        give_help_payment_approach: GIVE_HELP_PAYMENT_APPROACH.NEXT_DESIGNATION,
        give_help_transactionName: values.approach_details.versions,
        // payment_description_type: 'giveHelp',
      },
      () => {
        router.push(
          `/dashboard/give-help/give-help-process/selected-approach?process=${encode_payment_id}&choose=${encode_version}`,
        );
      },
    );
  };
  const InitialGiveHelpList = data?.getUserPlans
    ? [...data.getUserPlans].sort(
        (a, b) => a.initialGiveHelpLevel - b.initialGiveHelpLevel,
      )
    : [];
  if (loading) return <PageLoading />;

  return (
    <div className="mx-auto max-w-4xl">
      <Form {...FormInfo}>
        <form onSubmit={FormInfo.handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-5 rounded-lg bg-white p-4 ">
            {InitialGiveHelpList?.map((item, index: React.Key) => {
              const isLastItem = index === InitialGiveHelpList.length - 1;
              const isAlready = DEFAULT_VALUES >= item?.initialGiveHelpLevel;
              return (
                <div key={index}>
                  <FormField
                    name="selectApproach"
                    control={FormInfo.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div
                            className="flex cursor-pointer items-start gap-3"
                            onClick={() => {
                              field.onChange(item.initialGiveHelpLevel);
                              FormInfo.setValue('approach_details', item);
                            }}
                          >
                            {/* Use Radio instead of Checkbox */}
                            <input
                              type="radio"
                              id={`approach-${item.initialGiveHelpLevel}`}
                              {...field}
                              onChange={() => {
                                field.onChange(item.initialGiveHelpLevel);
                                FormInfo.setValue('approach_details', item);
                              }}
                              disabled={item?.paidStatus}
                              checked={
                                field.value === item.initialGiveHelpLevel
                              }
                              className="mt-1 h-5 w-5"
                            />
                            <div className="flex w-full justify-between">
                              <div className="flex flex-col">
                                <FormLabel
                                  htmlFor={`approach-${item.initialGiveHelpLevel}`}
                                  className={cn(
                                    'text-base font-medium text-black',
                                    item?.paidStatus && 'text-gray-400',
                                  )}
                                >
                                  {item?.versions}
                                </FormLabel>
                                <div className="h-2"></div>
                                <Typography
                                  className={cn(
                                    'text-sm text-black',
                                    item?.paidStatus && 'text-gray-400',
                                  )}
                                  as="p"
                                >
                                  Complete {item?.initialGiveHelpLevel} stage
                                  givehelps
                                </Typography>
                                <Typography
                                  className={cn(
                                    'text-sm text-black',
                                    item?.paidStatus && 'text-gray-400',
                                  )}
                                  as="p"
                                >
                                  Amount : {convertToInrSymbol(item?.amount)}
                                </Typography>
                              </div>
                              <div className="flex flex-col justify-between">
                                <div
                                  className={cn(
                                    'flex gap-2 text-black',
                                    item?.paidStatus && 'text-gray-400',
                                  )}
                                >
                                  <Typography className="font-normal">
                                    {convertToInrSymbol(item?.amount)}
                                  </Typography>
                                </div>
                                <Link
                                  href={
                                    isAlready
                                      ? ''
                                      : '/dashboard/give-help/give-help-payment-table'
                                  }
                                  aria-disabled={item?.paidStatus}
                                  className={cn(
                                    'flex cursor-pointer items-center gap-1 p-1 text-primary',
                                    item?.paidStatus &&
                                      'cursor-default text-gray-400',
                                  )}
                                >
                                  {/* <Typography
                                    as="span"
                                    className="text-xs font-bold"
                                  >
                                    Learn More
                                  </Typography> */}
                                  {/* <FaArrowRightLong size={12} /> */}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="h-2"></div>
                  {!isLastItem && <hr className="h-[1.5px] bg-gray-200" />}
                </div>
              );
            })}
          </div>
          <div className="h-3"></div>
          {FormInfo.formState.errors.selectApproach?.message && (
            <Typography className="text-sm font-bold text-red-600">
              * Please Choose Approach
            </Typography>
          )}
          <div className="h-3"></div>
          <Button type="submit" variant={'secondary'}>
            Continue to Payment
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default InitialGiveHelp;
