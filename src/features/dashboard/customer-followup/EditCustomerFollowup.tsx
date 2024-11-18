import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import TextField from '@/components/TextField';
import { EDIT_CUSTOMER_FOLLOWUP_MUTATION } from '@/graphql/mutation/customerfollowup.mutation';
import { GlobalVariables } from '@/lib/constant';
import { useDialogStore } from '@/store/dialog.store';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

export const EditInvitationSchema = z.object({
  newName: z.string().min(4, {
    message: 'Name is required and must be at least 4 characters long.',
  }),
  invitedAadharcardInfoId: z.string().optional(),
  newAadharcardParts: z
    .array(
      z
        .string()
        .regex(GlobalVariables.Regex.number, { message: 'Enter numbers only' })
        .length(4, { message: 'Each field must contain exactly 4 digits' }),
    )
    .min(3, { message: 'All Aadhaar fields are required.' }),
  newPhoneNumber: z
    .string({ required_error: 'Phone number is required' })
    .regex(/^[0-9]{10}$/, {
      message: 'Phone number must be exactly 10 digits',
    }),
});
type InvitationType = {
  id: string;
  customerName: string;
  aadharcardNumber: string;
  mobile: string;
  createdAt: string;
  isActive: boolean;
  isPmfPaid: boolean;
};

const EditCustomerFollowup = ({ data }: { data: InvitationType }) => {
  const { closeDialog } = useDialogStore();
  const [mutateInvitation, { loading }] = useMutation(
    EDIT_CUSTOMER_FOLLOWUP_MUTATION,
  );
  const formInfo = useForm<z.infer<typeof EditInvitationSchema>>({
    resolver: zodResolver(EditInvitationSchema),
    mode: 'all',
    defaultValues: {
      newName: data?.customerName,
      invitedAadharcardInfoId: data?.id,
      newAadharcardParts: ['', '', ''],
      newPhoneNumber: data?.mobile?.replace(/^\+91/, ''),
    },
  });

  useEffect(() => {
    if (data?.aadharcardNumber) {
      const newAadharcardParts = [
        data.aadharcardNumber.substring(0, 4),
        data.aadharcardNumber.substring(4, 8),
        data.aadharcardNumber.substring(8, 12),
      ];
      formInfo.setValue('newAadharcardParts', newAadharcardParts);
    }
  }, [data?.aadharcardNumber, formInfo]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (index: number, value: string) => {
    const newAadharParts = [...formInfo.getValues('newAadharcardParts')];
    newAadharParts[index] = value;

    formInfo.setValue('newAadharcardParts', newAadharParts);

    if (value.length === 4 && index < 2) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  useEffect(() => {
    const subscription = formInfo.watch(() => {
      if (formInfo.formState.errors.root) {
        formInfo.clearErrors('root');
      }
      const aadharNumberLength = formInfo
        .getValues('newAadharcardParts')
        .join('').length;
      if (aadharNumberLength === 12) {
        formInfo.clearErrors('newAadharcardParts');
      }
    });
    return () => subscription.unsubscribe();
  }, [formInfo]);

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      event.key === 'Backspace' &&
      formInfo.getValues(`newAadharcardParts.${index}`) === '' &&
      index > 0
    ) {
      inputRefs[index - 1]?.current?.focus();
    }
  };

  const onSubmit = async (values: z.infer<typeof EditInvitationSchema>) => {
    const {
      newAadharcardParts,
      invitedAadharcardInfoId,
      newPhoneNumber,
      newName,
    } = values;
    try {
      const { data } = await mutateInvitation({
        variables: {
          invitedAadharcardInfoId,
          newPhoneNumber: '+91' + newPhoneNumber,
          newAadharcardNumber: newAadharcardParts?.join(''),
          newCustomerName: newName,
        },
      });
      if (data?.updateInvitedAadharInfo.statusCode !== 200) {
        return toast.error(data?.updateInvitedAadharInfo?.message);
      }
      toast.success(data?.updateInvitedAadharInfo?.message);
      closeDialog();
    } catch (error) {
      formInfo.setError('root', {
        message: 'Please try-again,error occured',
      });
    }
  };

  return (
    <>
      <Form {...formInfo}>
        <form onSubmit={formInfo.handleSubmit(onSubmit)}>
          <FormField
            name="newName"
            control={formInfo.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="aadhar_number"
                  className="text-left text-[16px] font-normal leading-[18.7px] text-white"
                >
                  Name (Same as Aadhar Number)
                </FormLabel>
                <FormControl>
                  <TextField
                    {...field}
                    type="text"
                    variant="secondary"
                    placeholder="Enter Name as per Aadhaar"
                    className="mt-2 border-none placeholder:text-[15px] placeholder:leading-[17.5px] placeholder:text-[#999999]"
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <div className="h-1"></div>
          <FormField
            name="newAadharcardParts"
            control={formInfo.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="aadhar_number"
                  className="text-left text-[16px] font-normal leading-[18.7px] text-white"
                >
                  Enter Aadhar Number
                </FormLabel>
                <FormControl>
                  <>
                    <div className="flex justify-between gap-2">
                      {(field.value || ['', '', '']).map((_, index) => (
                        <div key={index}>
                          <input
                            ref={inputRefs[index]}
                            type="text"
                            maxLength={4}
                            value={field.value[index] || ''}
                            className="max-w-1/3 h-14 w-full rounded-md border border-gray-300 text-center text-xl shadow-md"
                            onChange={(event) =>
                              handleInputChange(index, event.target.value)
                            }
                            onKeyDown={(event) => handleKeyDown(index, event)}
                            placeholder="0000"
                          />
                        </div>
                      ))}
                    </div>
                    {formInfo.formState.errors.newAadharcardParts && (
                      <span className="text-xs text-red-500">
                        Aadhar number is Required
                      </span>
                    )}
                  </>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="h-1"></div>
          <div className="w-full ">
            <FormLabel
              htmlFor="aadhar_number"
              className="text-left text-[16px] font-normal leading-[18.7px] text-white"
            >
              Enter Aadhar Linked Phone Number
            </FormLabel>
            <FormField
              name="newPhoneNumber"
              control={formInfo.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        disabled={true}
                        autoComplete="off"
                        placeholder="+91"
                        className=" focus:shadow-outline mt-2 h-[54px] w-full max-w-[53px] appearance-none rounded-lg border-2 border-none border-secondary bg-white p-2 leading-tight shadow placeholder:text-[15px] placeholder:leading-[17.5px] placeholder:text-[#999999]  focus:outline-none"
                      />
                      <TextField
                        {...field}
                        type="number"
                        variant="secondary"
                        placeholder="Enter Aadhaar Linked Phone Number"
                        className="mt-2 border-none placeholder:text-[15px] placeholder:leading-[17.5px] placeholder:text-[#999999]"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="h-6"></div>
          <div className="flex w-full justify-between gap-3">
            <Button
              className="text-white"
              variant={'outline'}
              type="button"
              onClick={closeDialog}
              disabled={loading}
            >
              Close
            </Button>
            <Button
              className="w-full max-w-full py-3 font-medium text-black lg:max-w-[571px]"
              variant={'secondary'}
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditCustomerFollowup;
