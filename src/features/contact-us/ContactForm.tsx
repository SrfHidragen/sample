/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
'use client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/Form';
import TextareaComponent from '@/components/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import * as z from 'zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Combobox } from '@/components/Combobox';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FETCH_GEO_BY_STATE_DISTICT } from '@/graphql/query/common.query';
import { CONTACT_US_MUTATION } from '@/graphql/mutation/contact.mutation';
import toast from 'react-hot-toast';
import { ContactSchema } from '@/schema/contact.schema';
import Alert from '@/components/Alert';
import { GeoDataListType } from '@/types/geo.data.type';

const ContactForm = () => {
  // const [isLoadingField, setIsLoadingField] = useState<{
  //   [key: string]: boolean;
  // }>({});
  const [GeoDataList, setGeoDataList] = useState<GeoDataListType>();
  const [fetchGeoInfo] = useLazyQuery(FETCH_GEO_BY_STATE_DISTICT, {
    fetchPolicy: 'network-only',
  });

  const [contactUs, { loading, error }] = useMutation(CONTACT_US_MUTATION);

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    mode: 'all',
  });

  const stateId = form.watch('stateId');
  const districtId = form.watch('districtId');
  const panchayathId = form.watch('panchayathId');

  useEffect(() => {
    fetchGeoInfo({
      variables: {
        stateId,
        districtId,
        panchayathId,
      },
      onCompleted(data) {
        const { states, panchayaths, districts, wards } = data?.geoByState;
        setGeoDataList((prev) => ({
          ...prev,
          states: !!states ? states : [],
          districts: !!districts ? districts : [],
          panchayaths: !!panchayaths ? panchayaths : [],
          wards: !!wards ? wards : [],
        }));
      },
    });
  }, [stateId, districtId, panchayathId, fetchGeoInfo]);

  const onSubmit = async (formData: z.infer<typeof ContactSchema>) => {
    const { whatsAppMob, ...obj } = formData;
    const input = {
      whatsAppMob: '+91' + whatsAppMob,
      ...obj,
    };
    try {
      const { data } = await contactUs({ variables: { ...input } });

      if (data?.contactUs?.statusCode !== 200) {
        form.setError('root', {
          message: data?.contactUs?.message,
        });
        toast.error(data?.contactUs?.message);
        return;
      }

      toast.success('Contact form submitted successfully');
      form.reset();
      form.setValue('message', '');
    } catch (error) {
      toast.error('Failed to submit contact form');
    }
  };

  useEffect(() => {
    const subscription = form.watch(() => {
      if (form.formState.errors.root) {
        form.clearErrors('root');
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-[34px]">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="" className="text-base font-normal">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <TextField
                        {...field}
                        placeholder="First Name"
                        type="text"
                        variant="primary"
                        className=" mt-2 placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="" className="text-base font-normal">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <TextField
                        {...field}
                        placeholder="Last Name"
                        type="text"
                        variant="primary"
                        className=" mt-2 placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:gap-[34px]">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="stateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="state"
                      className="text-base font-normal text-black"
                    >
                      State
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        Options={GeoDataList?.states || []}
                        onChange={(option) => {
                          form.setValue('districtId', '');
                          form.setValue('panchayathId', '');
                          form.setValue('wardId', '');
                          field.onChange(option?.id || '');
                        }}
                        SelectedOption={
                          GeoDataList?.states?.find(
                            (opt: { id: string }) => opt.id === field.value,
                          ) || null
                        }
                        isDisabled={GeoDataList?.states?.length === 0}
                        placeholder="Choose Your State"
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1">
              <FormField
                control={form.control}
                name="districtId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="state"
                      className="text-base font-normal text-black"
                    >
                      District
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        Options={GeoDataList?.districts || []}
                        onChange={(option) => {
                          form.setValue('panchayathId', '');
                          form.setValue('wardId', '');
                          field.onChange(option?.id || '');
                        }}
                        SelectedOption={
                          GeoDataList?.districts?.find(
                            (opt: { id: string }) => opt.id === field.value,
                          ) || null
                        }
                        isDisabled={GeoDataList?.districts?.length === 0}
                        placeholder="Choose Your District"
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:gap-[34px]">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="panchayathId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="state"
                      className="text-base font-normal text-black"
                    >
                      Panchayath/Corporation/Municipality/Township
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        Options={GeoDataList?.panchayaths || []}
                        onChange={(option) => {
                          form.setValue('wardId', '');
                          field.onChange(option?.id || '');
                        }}
                        SelectedOption={
                          GeoDataList?.panchayaths?.find(
                            (opt: { id: string }) => opt.id === field.value,
                          ) || null
                        }
                        isDisabled={GeoDataList?.panchayaths?.length === 0}
                        placeholder="Choose Your Panchayat"
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="wardId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="state"
                      className="text-base font-normal text-black"
                    >
                      Ward Number
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        Options={GeoDataList?.wards || []}
                        onChange={(option) => field.onChange(option?.id || '')}
                        SelectedOption={
                          GeoDataList?.wards?.find(
                            (opt: { id: string }) => opt.id === field.value,
                          ) || null
                        }
                        isDisabled={GeoDataList?.wards?.length === 0}
                        placeholder="Choose Your Ward"
                      />
                    </FormControl>
                    <FormMessage className="mt-1 text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:gap-[34px]">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="whatsAppMob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="" className="text-base font-normal">
                      Enter Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          disabled={true}
                          autoComplete="off"
                          placeholder="+91"
                          className="focus:shadow-outline block h-[54px] w-full max-w-[53px] appearance-none rounded-lg border-2 border-[#9D9999] bg-white p-2 leading-tight text-black shadow placeholder:text-[15px] placeholder:font-normal placeholder:text-black focus:outline-none"
                        />
                        <TextField
                          {...field}
                          placeholder="Phone Number"
                          type="text"
                          variant="primary"
                          className="placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="emailId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="" className="text-base font-normal">
                      Enter Email ID
                    </FormLabel>
                    <FormControl>
                      <TextField
                        {...field}
                        placeholder="Email ID"
                        type="email"
                        variant="primary"
                        className=" mt-2 placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="message"
                  className="font-roboto block text-[18px] font-normal leading-[21px] text-black"
                >
                  Enter Your Message
                </FormLabel>
                <FormControl>
                  <TextareaComponent
                    placeholder="Your Message"
                    {...field}
                    rows={4}
                    className="sm:text-md block w-full rounded-xl border-2 border-[#9D9999] px-4 py-4 text-gray-700 placeholder:text-[16px] placeholder:text-gray-600 focus:shadow-none focus:outline-none sm:leading-[20.8px] "
                    wrapperClassName=""
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <Alert
            type="error"
            message={form.formState.errors.root?.message || ''}
          />
          <Button
            type="submit"
            variant="secondary"
            size="none"
            className="font-roboto block w-full rounded-lg bg-[#FFCC01] px-[55px] py-[17.5px] text-[16px] font-semibold leading-[18.7px] text-black lg:w-[178px]"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
          {error && (
            <p className="text-xs text-red-500">Error: {error.message}</p>
          )}
        </form>
      </Form>
    </>
  );
};

export default React.memo(ContactForm);
