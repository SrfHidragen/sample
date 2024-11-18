/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import { Button } from '@/components/Button';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/Form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@/components/Alert';
import { useMutation } from '@apollo/client';
import { BANK_VERIFY, SUBMIT_BANK } from '@/graphql/mutation/kyc.mutation';
import { GrCheckmark } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import { useKycStore } from '@/store/kyc.store';
import toast from 'react-hot-toast';

export const BankAccountSchema = z.object({
  account_number: z
    .string()
    .nonempty({ message: 'Account Number is required' })
    .regex(/^\d+$/, { message: 'Account Number must be a number' }),
  ifsc_code: z
    .string()
    .nonempty({ message: 'IFSC Code is required' })
    .length(11, { message: 'IFSC Code must be 11 characters' }),
  accountNumber: z.string().optional(),
  address: z.string().optional(),
  bank: z.string().optional(),
  branch: z.string().optional(),
  bankholderName: z.string().optional(),
  ifsc: z.string().optional(),
  verification: z.boolean().optional(),
});
const BankAccountForm = () => {
  const router = useRouter();
  const setAadharInfo = useKycStore((state) => state?.setAadharVerification);
  const Name = useKycStore((state) => state?.kycVerification?.name);
  const { updateKYCFlowCompletion } = useKycStore();
  const [mutateBankVerfiy, { loading }] = useMutation(BANK_VERIFY);
  const [mutateBankSubmit, { loading: submitLoading }] =
    useMutation(SUBMIT_BANK);
  const [isBankVerified, setIsBankVerified] = useState(false);
  const form = useForm<z.infer<typeof BankAccountSchema>>({
    resolver: zodResolver(BankAccountSchema),
    mode: 'all',
    defaultValues: {
      account_number: '',
      ifsc_code: '',
    },
  });

  const onSubmit = async (value: z.infer<typeof BankAccountSchema>) => {
    const { account_number, ifsc_code } = value;
    const input = {
      ifsc: ifsc_code,
      accountNumber: account_number,
      name: Name,
    };
    try {
      const { data } = await mutateBankVerfiy({
        variables: { ...input },
      });
      if (data?.verifyBank?.statusCode === 200) {
        const resp = data?.verifyBank.data;
        if (resp.verification === 'success') {
          form.setValue('accountNumber', resp?.accountNumber);
          form.setValue('address', resp.address);
          form.setValue('bank', resp.bank);
          form.setValue('branch', resp.branch);
          form.setValue('bankholderName', resp.data.name);
          form.setValue('ifsc', resp.ifsc);
          form.setValue(
            'verification',
            resp.verification === 'success' ? true : false,
          );
          setIsBankVerified(true);
        }
        return;
      }
      form.setError('root', {
        type: 'manual',
        message: data.verifyBank.message,
      });
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: 'An error occurred, please try again later.',
      });
    }
  };

  const submitBank = async () => {
    const { accountNumber, ifsc, bankholderName, bank, branch, address } =
      form.watch();
    const input = {
      ifsc,
      accountNumber,
      accountHolderName: bankholderName,
      bankName: bank,
      branch,
      bankAddress: address,
    };
    try {
      const { data } = await mutateBankSubmit({ variables: { ...input } });
      if (data?.createKycBankDetails?.statusCode !== 200) {
        form.setError('root', {
          type: 'manual',
          message: data.createKycBankDetails.message,
        });
        return;
      }
      toast.success('Bank verified');
      setAadharInfo({
        kyc_information: {
          addressVerified: true,
          aadhaarVerified: true,
          bankVerified: true,
        },
        kycLevel: 4,
      });
      updateKYCFlowCompletion({
        isAadhaar: true,
        isAddress: true,
        isBank: true,
      });
      router.replace('/dashboard/kyc/pan-verification');
    } catch (error) {
      form.setError('root', {
        message: 'Please check the Information',
      });
    }
  };
  return (
    <div className="w-full rounded-lg bg-white p-4 shadow md:max-w-lg md:p-6">
      <Typography as="h1" className="mb-4 text-[25px] sm:text-[32px]">
        Verify Bank Account
      </Typography>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:max-w-lg"
        >
          <div className="space-y-2">
            {/* Account Number */}
            <div className=" w-full">
              <FormLabel htmlFor="" className="font-normal">
                Account Number
              </FormLabel>
              <FormField
                control={form.control}
                name="account_number"
                render={({ field: { onChange, ...fields } }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        {...fields}
                        onChange={(e) => {
                          setIsBankVerified(false);
                          onChange(e.target.value);
                        }}
                        type="number"
                        variant={'primary'}
                        placeholder="Enter account number"
                        className="mt-[10px]  h-full py-4 placeholder:text-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            {/* IFSC Code*/}
            <div className=" w-full">
              <FormLabel htmlFor="" className="font-normal">
                IFSC Code
              </FormLabel>
              <FormField
                control={form.control}
                name="ifsc_code"
                render={({ field: { onChange, ...fields } }) => (
                  <FormItem>
                    <FormControl>
                      <TextField
                        {...fields}
                        onChange={(e) => {
                          setIsBankVerified(false);
                          onChange(e.target.value);
                        }}
                        variant={'primary'}
                        type="text"
                        placeholder="Enter IFSC Code"
                        className="mt-[10px]  h-full py-4 placeholder:text-gray-600"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            {/* Branch Name */}
          </div>
          <div className="h-2"></div>

          <Alert
            type="error"
            message={form?.formState?.errors?.root?.message || ''}
          />
          <div className="h-2"></div>

          {!isBankVerified && (
            <Button
              variant={'secondary'}
              type="submit"
              className="h-12 w-full max-w-full"
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          )}
          {form.watch('verification') && isBankVerified && (
            <div className="flex flex-col p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center  rounded-full border-2 bg-green-500">
                  <GrCheckmark size={'.8rem'} className="text-white" />
                </div>
                <Typography className="text-sm text-green-500">
                  Bank account verified successfully
                </Typography>
              </div>
              <div className="h-4"></div>
              {/* Account Holder */}
              <div className="flex items-center justify-between gap-2">
                <Typography className="w-1/2 text-base">
                  Account Holder
                </Typography>
                :
                <Typography className="flex-1 text-sm">
                  {form.watch('bankholderName') || ''}
                </Typography>
              </div>

              {/* Bank Name */}
              <div className="flex items-center justify-between gap-2">
                <Typography className="w-1/2 text-base">Bank Name</Typography>:
                <Typography className="flex-1 text-sm">
                  {form.watch('bank')}
                </Typography>
              </div>

              {/* IFSC Code */}
              <div className="flex items-center justify-between gap-2">
                <Typography className="w-1/2 text-base">IFSC Code</Typography>:
                <Typography className="flex-1 text-sm">
                  {form.watch('ifsc')}
                </Typography>
              </div>

              {/* Branch Name */}
              <div className="flex items-center justify-between gap-2">
                <Typography className="w-1/2 text-base">Branch Name</Typography>
                :
                <Typography className="flex-1 text-sm">
                  {form.watch('branch')}
                </Typography>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between gap-2">
                <Typography className="w-1/2 text-base">
                  Account Number
                </Typography>
                :
                <Typography className="flex-1 text-sm">
                  {form.watch('accountNumber')}
                </Typography>
              </div>

              {/* Address */}
              <div className="h-2"></div>
              <div className="flex flex-col">
                <Typography className="w-44 flex-shrink-0 text-base">
                  Address
                </Typography>
                <>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            {...field}
                            className=" h-full w-full rounded-lg border-2 border-secondary p-4 placeholder:text-gray-600 focus:outline-none"
                            placeholder="Enter new address"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </>
              </div>
            </div>
          )}
          {isBankVerified && (
            <Button
              variant={'secondary'}
              type="button"
              className="h-12 w-full max-w-full"
              onClick={submitBank}
              loading={submitLoading}
              disabled={submitLoading}
            >
              Save and Continue
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default BankAccountForm;
