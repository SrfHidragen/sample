/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import TextField from '@/components/TextField';
import { Combobox } from '@/components/Combobox';
import Typography from '@/components/Typography';
import { addressVerificationSchema } from '@/schema/kyc.schema';
import { GeoDataType } from '.';

interface PermanentAddressType {
  formInfo: UseFormReturn<z.infer<typeof addressVerificationSchema>>;
  permanentAddressDetails: GeoDataType | undefined;
}
const PermanentAddressForm: React.FC<PermanentAddressType> = ({
  formInfo,
  permanentAddressDetails,
}) => {
  const handleToggelPermanentPanchayath = () => {
    formInfo.setValue(
      'isFindPermanentPanchayath',
      !formInfo.watch('isFindPermanentPanchayath'),
    );
    formInfo.setValue('permanentPanchayath', '');
    formInfo.setValue('permanentPanchayathId', '');
    formInfo.setValue(
      'isFindPermanentWard',
      formInfo.watch('isFindPermanentPanchayath'),
    );
    formInfo.setValue('permanentWard', '');
    formInfo.setValue('permanentWardId', '');
  };

  const handleTogglePermanentWard = () => {
    formInfo.setValue(
      'isFindPermanentWard',
      !formInfo.watch('isFindPermanentWard'),
    );
    formInfo.setValue('permanentWard', '');
    formInfo.setValue('permanentWardId', '');
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <FormField
          name="permanentPincode"
          control={formInfo.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="" className="text-xs font-normal sm:text-sm ">
                PIN Code
              </FormLabel>
              <FormControl>
                <TextField
                  {...field}
                  placeholder="Enter your PIN Code"
                  type="text"
                  variant="primary"
                  className=" mt-2 placeholder:!text-[16px] placeholder:!leading-[17.5px] disabled:cursor-not-allowed disabled:bg-white disabled:opacity-85"
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          name="permanentStateId"
          control={formInfo.control}
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel
                htmlFor="permanentState"
                className="text-xs font-normal sm:text-sm "
              >
                State
              </FormLabel>
              <FormControl>
                <Combobox
                  Options={permanentAddressDetails?.states || []}
                  SelectedOption={
                    permanentAddressDetails?.states?.find(
                      (item: any) => item.id === value,
                    ) || null
                  }
                  isDisabled={permanentAddressDetails?.states?.length === 0}
                  onChange={(value) => {
                    formInfo.setValue('permanentState', value?.name || '');
                    formInfo.setValue('permanentDistrictId', '');
                    formInfo.setValue('permanentPanchayathId', '');
                    formInfo.setValue('permanentPanchayath', '');
                    formInfo.setValue('permanentWard', '');
                    formInfo.setValue('permanentWardId', '');

                    onChange(value?.id);
                  }}
                  placeholder="Choose Your State"
                />
                {/* <TextField
                  {...field}
                  placeholder="Choose Your State"
                  type="text"
                  variant="primary"
                  className=" mt-2 placeholder:!text-[16px] placeholder:!leading-[17.5px] disabled:cursor-not-allowed disabled:bg-white disabled:opacity-85"
                /> */}
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          name="permanentDistrictId"
          control={formInfo.control}
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel
                htmlFor="permanentDistrictId"
                className="text-xs font-normal sm:text-sm "
              >
                District
              </FormLabel>
              <FormControl>
                <Combobox
                  Options={permanentAddressDetails?.districts || []}
                  SelectedOption={
                    permanentAddressDetails?.districts?.find(
                      (item: any) => item.id === value,
                    ) || null
                  }
                  isDisabled={permanentAddressDetails?.districts?.length === 0}
                  onChange={(value) => {
                    formInfo.setValue('permanentDistrict', value?.name || '');
                    formInfo.setValue('permanentPanchayathId', '');
                    formInfo.setValue('permanentPanchayath', '');
                    formInfo.setValue('permanentWard', '');
                    formInfo.setValue('permanentWardId', '');
                    onChange(value?.id);
                  }}
                  placeholder="Choose Your District"
                />
                {/* <TextField
                  {...field}
                  placeholder="Choose Your District"
                  type="text"
                  variant="primary"
                  className=" mt-2 placeholder:!text-[16px] placeholder:!leading-[17.5px] disabled:cursor-not-allowed disabled:bg-white disabled:opacity-85"
                /> */}
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <div className="w-full">
          <FormLabel
            htmlFor="district"
            className="text-xs font-normal sm:text-sm "
          >
            Panchayath/Corporation/Municipality/Township
          </FormLabel>
          <div className="mt-2">
            {!formInfo.watch('isFindPermanentPanchayath') && (
              <FormField
                control={formInfo.control}
                name="permanentPanchayathId"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        Options={permanentAddressDetails?.panchayaths || []}
                        SelectedOption={
                          permanentAddressDetails?.panchayaths?.find(
                            (item: any) => item.id === value,
                          ) || null
                        }
                        isDisabled={
                          permanentAddressDetails?.panchayaths?.length === 0
                        }
                        onChange={(value) => onChange(value?.id)}
                        placeholder="Choose Your Division"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            )}
            {formInfo.watch('isFindPermanentPanchayath') && (
              <div className="mt-2">
                <FormField
                  control={formInfo.control}
                  name="permanentPanchayath"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          {...field}
                          placeholder="Enter your Panchayat"
                          type="text"
                          variant="primary"
                          className="mt-2 bg-white placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {formInfo.watch('permanentDistrictId') && (
              <div className="mt-2 text-end">
                <div onClick={handleToggelPermanentPanchayath}>
                  <Typography
                    as="span"
                    className="font-roboto cursor-pointer !font-normal text-[#FFCC01]"
                  >
                    {formInfo.watch('isFindPermanentPanchayath')
                      ? 'Close'
                      : 'Couldn’t Find your Panchayat?'}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 w-full">
          <FormLabel htmlFor="ward" className="text-xs font-normal sm:text-sm ">
            Ward Number
          </FormLabel>
          <div className="mt-2">
            {!formInfo.watch('isFindPermanentWard') && (
              <FormField
                control={formInfo.control}
                name="permanentWardId"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox
                        Options={permanentAddressDetails?.wards || []}
                        SelectedOption={
                          permanentAddressDetails?.wards?.find(
                            (item: any) => item.id === value,
                          ) || null
                        }
                        isDisabled={
                          permanentAddressDetails?.wards?.length === 0
                        }
                        onChange={(value) => onChange(value?.id)}
                        placeholder="Choose Your Ward Name"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            )}
            {formInfo.watch('isFindPermanentWard') && (
              <div className="mt-2">
                <FormField
                  control={formInfo.control}
                  name="permanentWard"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <TextField
                          {...field}
                          placeholder="Enter your Ward Name"
                          type="text"
                          variant="primary"
                          className="mt-2 bg-white placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {formInfo.watch('permanentPanchayathId') && (
              <div className="mt-2 text-end">
                <div onClick={handleTogglePermanentWard}>
                  <Typography
                    as="span"
                    className="font-roboto cursor-pointer !font-normal text-[#FFCC01]"
                  >
                    {formInfo.watch('isFindPermanentWard')
                      ? 'Close'
                      : 'Couldn’t Find your Ward Name?'}
                  </Typography>
                </div>
              </div>
            )}{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default PermanentAddressForm;
