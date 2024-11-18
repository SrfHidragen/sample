/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-extra-boolean-cast */
import { Combobox } from '@/components/Combobox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import { useLazyQuery } from '@apollo/client';
import { FETCH_GEO_BY_STATE_DISTICT } from '@/graphql/query/common.query';
import { addressVerificationSchema } from '@/schema/kyc.schema';
import { GeoDataListType, StateType } from '@/types/geo.data.type';

interface LivingAddressType {
  formInfo: UseFormReturn<z.infer<typeof addressVerificationSchema>>;
}
const LivingAddressForm: React.FC<LivingAddressType> = ({ formInfo }) => {
  const [GeoDataList, setGeoDataList] = useState<GeoDataListType>();
  const [fetchState] = useLazyQuery(FETCH_GEO_BY_STATE_DISTICT, {
    fetchPolicy: 'cache-first',
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
  const handleToggleLivingAddressPanchayath = () => {
    formInfo.setValue(
      'isFindLivingPanchayath',
      !formInfo.watch('isFindLivingPanchayath'),
    );
    formInfo.setValue('livingPanchayathId', '');
    formInfo.setValue('livingPanchayath', '');
    formInfo.setValue(
      'isFindLivingWard',
      formInfo.watch('isFindLivingPanchayath'),
    );
    formInfo.setValue('livingWardId', '');
    formInfo.setValue('livingWard', '');
  };

  const handleToggleLivingAddressWard = () => {
    formInfo.setValue('isFindLivingWard', !formInfo.watch('isFindLivingWard'));
    formInfo.setValue('livingWardId', '');
    formInfo.setValue('livingWard', '');
  };

  const fetchingLivingGeo = () => {
    fetchState({
      variables: {
        stateId: formInfo.watch('livingStateId'),
        districtId: formInfo.watch('livingDistrictId'),
        panchayathId: formInfo.watch('livingPanchayathId'),
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
  };

  useEffect(() => {
    fetchingLivingGeo();
  }, [
    formInfo.watch('livingStateId'),
    formInfo.watch('livingDistrictId'),
    formInfo.watch('livingPanchayathId'),
  ]);
  return (
    <>
      {!formInfo.watch('isSame') && (
        <>
          <Typography
            as="span"
            className="font-roboto mb-6 text-xl !font-bold leading-[18.75px]"
          >
            Living Address
          </Typography>
          <div className="h-6"></div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <FormField
              name="livingPincode"
              control={formInfo.control}
              render={({ field: { onChange, ...fields } }) => (
                <FormItem>
                  <FormLabel
                    htmlFor=""
                    className="text-xs font-normal sm:text-sm "
                  >
                    PIN Code
                  </FormLabel>
                  {/* <div className="h-[.5px]"></div> */}
                  <FormControl>
                    <TextField
                      {...fields}
                      placeholder="Enter your PIN Code"
                      onChange={(e) => {
                        const { value } = e.target;
                        if (value?.length <= 6) {
                          onChange(value);
                        }
                      }}
                      type="number"
                      variant="primary"
                      className=" mt-2 placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={formInfo.control}
              name="livingStateId"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="state"
                    className="text-xs font-normal sm:text-sm "
                  >
                    State
                  </FormLabel>
                  <FormControl>
                    <Combobox
                      Options={GeoDataList?.states || []}
                      SelectedOption={
                        GeoDataList?.states.find(
                          (item: StateType) => item.id === value,
                        ) || null
                      }
                      isDisabled={GeoDataList?.states?.length === 0}
                      // isLoading={isGeoLoading}
                      onChange={(option) => {
                        formInfo.setValue('livingDistrictId', '');
                        formInfo.setValue('livingPanchayathId', '');
                        formInfo.setValue('livingPanchayath', '');
                        formInfo.setValue('livingWard', '');
                        formInfo.setValue('livingWardId', '');
                        onChange(option ? option.id : null);
                      }}
                      placeholder="Choose Your State"
                    />
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
                District
              </FormLabel>
              <div className="mt-2">
                <FormField
                  control={formInfo.control}
                  name="livingDistrictId"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormControl>
                        <Combobox
                          Options={GeoDataList?.districts || []}
                          SelectedOption={
                            GeoDataList?.districts?.find(
                              (item: StateType) => item.id === value,
                            ) || null
                          }
                          isDisabled={GeoDataList?.districts?.length === 0}
                          // isLoading={isGeoLoading}
                          onChange={(value) => {
                            formInfo.setValue('livingPanchayathId', '');
                            formInfo.setValue('livingPanchayath', '');
                            formInfo.setValue('livingWard', '');
                            formInfo.setValue('livingWardId', '');
                            onChange(value?.id);
                          }}
                          placeholder="Choose Your District"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="w-full">
              <FormLabel
                htmlFor="district"
                className="text-xs font-normal sm:text-sm "
              >
                Panchayath/Corporation/Municipality/Township
              </FormLabel>
              <div className="mt-2">
                {!formInfo.watch('isFindLivingPanchayath') && (
                  <FormField
                    control={formInfo.control}
                    name="livingPanchayathId"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormControl>
                          <Combobox
                            Options={GeoDataList?.panchayaths || []}
                            SelectedOption={
                              GeoDataList?.panchayaths?.find(
                                (item: StateType) => item?.id === value,
                              ) || null
                            }
                            isDisabled={GeoDataList?.panchayaths?.length === 0}
                            // isLoading={isGeoLoading}
                            onChange={(value) => {
                              formInfo.setValue('livingWard', '');
                              formInfo.setValue('livingWardId', '');
                              onChange(value?.id);
                            }}
                            placeholder="Choose Your Panchayat"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                )}
                {formInfo.watch('isFindLivingPanchayath') && (
                  <div className="mt-2">
                    <FormField
                      control={formInfo.control}
                      name="livingPanchayath"
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

                {GeoDataList?.panchayaths?.length ? (
                  <div onClick={handleToggleLivingAddressPanchayath}>
                    <Typography
                      as="span"
                      className="font-roboto cursor-pointer text-end text-sm !font-normal text-[#FFCC01]"
                    >
                      {formInfo.watch('isFindLivingPanchayath')
                        ? 'Close'
                        : '* Couldn’t Find your Panchayat?'}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className=" w-full">
              <FormLabel
                htmlFor="ward"
                className="text-xs font-normal sm:text-sm "
              >
                Ward Name
              </FormLabel>
              <div className="mt-2">
                {!formInfo.watch('isFindLivingWard') && (
                  <FormField
                    control={formInfo.control}
                    name="livingWardId"
                    render={({ field: { value, onChange } }) => (
                      <FormItem>
                        <FormControl>
                          <Combobox
                            Options={GeoDataList?.wards || []}
                            SelectedOption={
                              GeoDataList?.wards?.find(
                                (item: StateType) => item.id === value,
                              ) || null
                            }
                            // isLoading={isGeoLoading}
                            isDisabled={GeoDataList?.wards?.length === 0}
                            onChange={(value) => onChange(value?.id)}
                            placeholder="Choose Your Ward Name"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                )}
                {formInfo.watch('isFindLivingWard') && (
                  <div className="mt-2">
                    <FormField
                      control={formInfo.control}
                      name="livingWard"
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
                {GeoDataList?.wards?.length ? (
                  <div onClick={handleToggleLivingAddressWard}>
                    <Typography
                      as="span"
                      className="font-roboto cursor-pointer text-end text-sm !font-normal text-[#FFCC01]"
                    >
                      {formInfo.watch('isFindLivingWard')
                        ? 'Close'
                        : '* Couldn’t Find your Ward Name?'}
                    </Typography>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LivingAddressForm;
