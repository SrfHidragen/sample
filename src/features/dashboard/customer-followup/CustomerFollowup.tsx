/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button } from '@/components/Button';
import React, { useEffect, useRef } from 'react';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryCard from '@/components/PrimaryCard';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import Alert from '@/components/Alert';
import { InvitationSchema } from '@/schema/customer.followup.schema';
import { CUSTOMER_FOLLOWUP_MUTATION } from '@/graphql/mutation/customerfollowup.mutation';

type CustomerFollowupProps = {
  refetch: () => void;
};

const CustomerFollowup: React.FC<CustomerFollowupProps> = ({ refetch }) => {
  const aadharRef = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const form = useForm<z.infer<typeof InvitationSchema>>({
    resolver: zodResolver(InvitationSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      aadhar_number: ['', '', ''],
      phone_number: '',
    },
  });

  const [createInvitation, { loading }] = useMutation(
    CUSTOMER_FOLLOWUP_MUTATION,
  );

  const onSubmit = async (values: z.infer<typeof InvitationSchema>) => {
    try {
      const { data } = await createInvitation({
        variables: {
          customerName: values.name,
          aadharcardNumber: values.aadhar_number?.join(''),
          mobile: '+91' + values.phone_number,
        },
      });

      if (data?.createInvitation?.statusCode !== 200) {
        form.setError('root', {
          message: data?.createInvitation.message,
        });
        toast.error(data?.createInvitation.message);
        return;
      }

      // Success case
      toast.success('Invitation added successfully');
      refetch();
      form.reset();
    } catch (error) {
      toast.error('Failed to add invitation');
    }
  };

  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.errors.root) {
        form.clearErrors('root');
      }
      const aadharNumberLength = form
        .getValues('aadhar_number')
        .join('').length;
      if (aadharNumberLength === 12) {
        form.clearErrors('aadhar_number');
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      event.key === 'Backspace' &&
      form.getValues(`aadhar_number.${index}`) === '' &&
      index > 0
    ) {
      aadharRef[index - 1]?.current?.focus();
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    const newAadharData = [...form.getValues('aadhar_number')];
    newAadharData[index] = value;

    form.setValue('aadhar_number', newAadharData);
    if (value.length === 4 && index < 2) {
      aadharRef[index + 1]?.current?.focus();
    }
  };

  return (
    <div className="mx-auto w-full lg:max-w-[392px]">
      <PrimaryCard>
        <div className="w-full max-w-full lg:max-w-lg">
          <Typography as="h2" className="leading-[18px] text-white">
            Customer Invitation
          </Typography>
          <div className="h-6"></div>
          <Typography as="p" className="font-normal text-white">
            Please be sure to invite persons who are in urgent need of financial
            help
          </Typography>
          <div className="h-6"></div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <div className="w-full">
                <FormLabel
                  htmlFor="name"
                  className="text-[16px] font-normal leading-[18.7px] text-white"
                >
                  Enter Name (Same as Aadhar)
                </FormLabel>
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
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
              </div>
              <div className="h-4"></div>
              <div className="w-full">
                <FormLabel
                  htmlFor="aadhar_number"
                  className="text-[16px] font-normal leading-[18.7px] text-white"
                >
                  Enter Aadhar Number
                </FormLabel>
                <FormField
                  name="aadhar_number"
                  control={form.control}
                  render={({ field: { onChange, ...fields } }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex justify-between gap-2">
                          {(fields.value || ['', '', '']).map(
                            (_, index: number) => (
                              <React.Fragment key={index}>
                                <TextField
                                  type="text"
                                  ref={aadharRef[index]}
                                  maxLength={4}
                                  value={fields.value[index] || ''}
                                  variant="secondary"
                                  placeholder="1234"
                                  onChange={(event) => {
                                    handleInputChange(
                                      index,
                                      event.target.value,
                                    );
                                  }}
                                  onKeyDown={(event) =>
                                    handleKeyDown(index, event)
                                  }
                                  className="max-w-1/3 mt-2 w-full border-none placeholder:text-[15px] placeholder:leading-[17.5px] placeholder:text-[#999999]"
                                />
                              </React.Fragment>
                            ),
                          )}
                        </div>
                      </FormControl>
                      {form.formState.errors.aadhar_number && (
                        <span className="text-xs text-red-500">
                          {' '}
                          Aadhar Number is Required
                        </span>
                      )}
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-4"></div>
              <div className="w-full">
                <FormLabel
                  htmlFor="aadhar_number"
                  className="text-[16px] font-normal leading-[18.7px] text-white"
                >
                  Enter Aadhar Linked Phone Number
                </FormLabel>
                <FormField
                  name="phone_number"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            disabled={true}
                            autoComplete="off"
                            placeholder="+91"
                            className=" focus:shadow-outline mt-2 h-[54px] w-full max-w-[53px] appearance-none rounded-lg border-2 border-none border-secondary bg-white p-2 leading-tight shadow placeholder:text-[15px] placeholder:leading-[17.5px] placeholder:text-black  focus:outline-none"
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
              <div className="h-3"></div>
              <Alert
                type="error"
                message={form.formState.errors.root?.message || ''}
              />
              <div className="h-3"></div>
              <Button
                className="w-full max-w-full py-3 font-medium text-black lg:max-w-[571px]"
                variant={'secondary'}
                type="submit"
                disabled={loading}
                loading={loading}
              >
                Add to Customer Followup
              </Button>
            </form>
          </Form>
        </div>
      </PrimaryCard>
    </div>
  );
};

export default CustomerFollowup;
