'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/Button';
import Typography from '@/components/Typography';
import { Switch } from '@/components/Switch';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/Form';
import TextField from '@/components/TextField';

// Define the schema using Zod
const FormSchema = z.object({
  withdrawal_limit_enabled: z.boolean(),
  amount: z.number().min(1, 'Amount must be greater than 0').optional(),
});

export const WithdrawalLimit = () => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      withdrawal_limit_enabled: false,
      amount: undefined,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-4xl text-white"
      >
        <Typography as="h4" className="font-normal text-white">
          Set Withdrawal Limit
        </Typography>
        <div className="h-3"></div>
        {/* <div className="rounded-[4px] bg-[#0119AD] p-4"> */}
        <div>
          <FormField
            control={form.control}
            name="withdrawal_limit_enabled"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <div className="flex flex-col">
                  <FormLabel className="text-base text-white">
                    Withdrawal Limit
                  </FormLabel>
                </div>
                <FormControl>
                  <div className="relative flex flex-col items-center">
                    <Switch
                      id="withdrawal-limit-switch"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-2 border-[#FFCC01] bg-[#0119AD]"
                    />
                    <div
                      className={`pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full transition-transform ${
                        field.value
                          ? 'translate-x-[18px] bg-[#FFCC01]'
                          : 'bg-[#FFCC01]'
                      }`}
                    ></div>
                    <div>
                      <span className="mt-1 text-white">
                        {field.value ? 'On' : 'Off'}
                      </span>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[14px] text-white">
                    Enter Amount in Rupees
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      type="number"
                      placeholder="Enter Amount"
                      className="h-11 max-w-[270px] rounded-lg border-2 border-[#FFCC01] bg-[#0119AD] px-2 text-black placeholder:text-[13px] placeholder:text-white"
                      disabled={!form.getValues('withdrawal_limit_enabled')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="h-6"></div>
        <Button
          type="submit"
          variant={'secondary'}
          className="max-w-[113px] bg-yellow-500 text-black hover:bg-yellow-600"
        >
          Save
        </Button>
      </form>
    </Form>
  );
};
