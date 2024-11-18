/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unsafe-optional-chaining */
'use client';
import Alert from '@/components/Alert';
import { Button } from '@/components/Button';
import Checkbox from '@/components/Checkbox/Index';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import PermanentAddressForm from './PermanentAddressForm';
import LivingAddressForm from './LivingAddressForm';
import { useKycStore } from '@/store/kyc.store';
import InfoRow from './InfoRow';
import { FETCH_GEO_BY_STATE_DISTICT } from '@/graphql/query/common.query';
import { useLazyQuery, useMutation } from '@apollo/client';
import { addressVerificationSchema } from '@/schema/kyc.schema';
import { filterUndefined, getCommunicationItemIds } from '@/lib/utils';
import toast from 'react-hot-toast';
import {
  KYC_ADDRESS_SUBMIT,
  UPDATE_LANGUAGE,
} from '@/graphql/mutation/kyc.mutation';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import LanguagesForm from './LanguagesForm';

type Datatype = {
  id: string;
  name: string;
};
export interface GeoDataType {
  states?: Datatype[];
  districts?: Datatype[];
  panchayaths?: Datatype[];
  wards?: Datatype[];
}

const AddressForm = () => {
  const router = useRouter();
  const [GeoDataList, setGeoDataList] = useState<GeoDataType>();
  const UserDetails = useAuthStore((state) => state?.user?.userDetails);
  const [fetchState] = useLazyQuery(FETCH_GEO_BY_STATE_DISTICT, {
    fetchPolicy: 'network-only',
  });
  const [mutateAddress, { loading: AddressLoading }] =
    useMutation(KYC_ADDRESS_SUBMIT);
  const [mutateLanguage, { loading: loadingLanguage }] =
    useMutation(UPDATE_LANGUAGE);
  const KycInfo = useKycStore((state) => state?.kycVerification);
  const { setAadharVerification, updateKYCFlowCompletion } = useKycStore();

  const isUpdateLanguage =
    UserDetails?.personal?.communicationLanguage?.length === 0 ||
    !UserDetails?.personal?.motherTongue;

  //formInformation
  const formInfo = useForm<z.infer<typeof addressVerificationSchema>>({
    resolver: zodResolver(addressVerificationSchema),
    mode: 'all',
    defaultValues: {
      isSame: false,
      permanentDistrict: KycInfo?.address?.district,
      permanentState: KycInfo?.address?.state,
      permanentPincode: KycInfo?.address?.pin,
      street: KycInfo?.address.street || '',
      vtc: KycInfo?.address.vtc || '',
    },
  });
  // user_type: isUpdateLanguage ? 'consumer' : 'customer',
  const fetchingPermanentGeo = useCallback(() => {
    fetchState({
      variables: {
        stateId: formInfo.watch('permanentStateId'),
        districtId: formInfo.watch('permanentDistrictId'),
        panchayathId: formInfo.watch('permanentPanchayathId'),
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
  }, []);
  //  [
  //    formInfo.watch('permanentStateId'),
  //    formInfo.watch('permanentDistrictId'),
  //    formInfo.watch('permanentPanchayathId'),
  //  ];

  //Fetching Permanent Address
  useEffect(() => {
    fetchingPermanentGeo();
  }, [
    formInfo.watch('permanentStateId'),
    formInfo.watch('permanentDistrictId'),
    formInfo.watch('permanentPanchayathId'),
  ]);

  //Initially find state district,panchayath,ward
  useEffect(() => {
    if (GeoDataList && Object.values(GeoDataList)?.length > 0) {
      const { districts, states } = GeoDataList;
      //find stateId
      if (states?.length !== 0 && !formInfo.watch('permanentStateId')) {
        const stateId =
          states?.find(
            (item: Datatype) =>
              item?.name.toLowerCase() ===
              KycInfo?.address?.state?.toLowerCase(),
          )?.id || '';
        formInfo?.setValue('permanentStateId', stateId);
      }
      //find districtId
      if (districts?.length !== 0 && !formInfo.watch('permanentDistrictId')) {
        const districtId =
          districts?.find(
            (item: Datatype) =>
              item?.name.toLowerCase() ===
              KycInfo?.address?.district?.toLowerCase(),
          )?.id || '';
        // if (districtId === '') {
        //   formInfo.setValue('isFindPermanentPanchayath', true);
        //   formInfo.setValue('isFindPermanentWard', true);
        // }
        formInfo.setValue('permanentDistrictId', districtId);
      }
    }
  }, [KycInfo.address, GeoDataList]);

  //final submit
  const onSubmit = async (
    values: z.infer<typeof addressVerificationSchema>,
  ) => {
    const {
      street,
      vtc,
      communicationLanguage,
      motherTongue,
      communicationId,
      ...address
    } = values;
    const {
      isSame,
      permanentPanchayath,
      permanentWard,
      livingPanchayath,
      livingWard,
      ...obj
    } = filterUndefined(address);
    getCommunicationItemIds(communicationId);
    const input = {
      ...obj,
      permanentPanchayathId: obj.permanentPanchayathId || null,
      permanentWardId: obj.permanentWardId || null,
      permanentWard,
      permanentPanchayath,
      street,
      vtc,
      ...(isSame
        ? {}
        : {
            livingPanchayathId: obj.livingPanchayathId || null,
            livingWardId: obj.livingWardId || null,
            livingPanchayath,
            livingWard,
          }),
    };
    try {
      const { data } = await mutateAddress({
        variables: {
          isSame: isSame === true ? 'true' : 'false',
          // permanentState: State?.id,
          ...input,
        },
      });
      if (data?.kycAddressSubmit?.statusCode !== 200) {
        return formInfo.setError('root', {
          message: data.kycAddressSubmit.message,
        });
      }
      if (isUpdateLanguage) {
        await onSubmitLanguage(communicationLanguage, motherTongue);
      } else {
        setAadharVerification({
          kyc_information: {
            addressVerified: true,
            aadhaarVerified: true,
          },
          kycLevel: 3,
        });
        updateKYCFlowCompletion({ isAadhaar: true, isAddress: true });
        toast.success('Address Verification Completed');
        router.replace('/dashboard/kyc/kyc-bank-details');
      }
    } catch (error) {
      formInfo.setError('root', {
        message: 'You entered Wrong information, please check information',
      });
    }
  };

  const onSubmitLanguage = async (
    communicationLanguage: string[] | undefined,
    motherTongue: string | undefined,
  ) => {
    try {
      const { data } = await mutateLanguage({
        variables: {
          communicationLanguage,
          motherTongue,
        },
      });
      if (data?.updateMemberLanguage?.statusCode !== 200) {
        formInfo.setError('root', {
          message: data?.updateMemberLanguage?.message,
        });
        return;
      }
      updateKYCFlowCompletion({ isAadhaar: true, isAddress: true });
      setAadharVerification({
        communicationLanguage,
        motherTongue,
        kyc_information: {
          addressVerified: true,
          aadhaarVerified: true,
        },
        kycLevel: 3,
      });

      toast.success('Address Verification Completed');
      router.replace('/dashboard/kyc/kyc-bank-details');
    } catch (error) {
      formInfo.setError('root', {
        message: 'Failed to update language information. Please try again.',
      });
    }
  };
  return (
    <>
      <div className="w-full rounded-lg bg-white p-4 shadow-lg md:p-6 lg:max-w-2xl">
        <Typography as="h1" className="mb-4 text-[32px] text-black">
          Aadhar & Address
        </Typography>
        <div className="mb-1 grid grid-cols-[2fr,1fr,1.5fr] gap-y-3">
          {!!KycInfo.name && (
            <InfoRow label="Name on Aadhar" value={KycInfo.name} />
          )}
          {!!KycInfo?.userProfile.unmaskedPhone && (
            <InfoRow
              label="Aadhar Linked Phone Number"
              value={KycInfo?.userProfile.unmaskedPhone || ''}
            />
          )}
          {!!KycInfo?.address?.careOf && (
            <InfoRow
              label="C/O (Care of)"
              value={KycInfo?.address?.careOf || ''}
            />
          )}
          {!!KycInfo?.dateOfBirth && (
            <InfoRow label="Date of Birth" value={KycInfo?.dateOfBirth || ''} />
          )}
          {!!KycInfo?.gender && (
            <InfoRow
              label="Gender"
              value={
                (KycInfo?.gender === 'M' && 'Male') ||
                (KycInfo?.gender === 'F' && 'Female') ||
                ''
              }
            />
          )}
          <>
            <Typography className="font-semibold">Address</Typography>
            <div></div>
            <div></div>
          </>
          {!!KycInfo?.address?.house && (
            <InfoRow label="House" value={KycInfo?.address?.house || ''} />
          )}
          {!!KycInfo?.address?.street && (
            <InfoRow label="Street" value={KycInfo?.address?.street || ''} />
          )}
          {!!KycInfo?.address?.postOffice && (
            <InfoRow label="Post" value={KycInfo?.address?.postOffice || ''} />
          )}
        </div>

        <div className="h-6 sm:h-10"></div>
        <Typography
          as="span"
          className="font-roboto text-2xl !font-bold leading-[18.75px]"
        >
          Permanent Address
        </Typography>
        <div className="h-4"></div>

        <Form {...formInfo}>
          <form onSubmit={formInfo.handleSubmit(onSubmit)}>
            <PermanentAddressForm
              formInfo={formInfo}
              permanentAddressDetails={GeoDataList}
            />
            <div className="h-4"></div>
            <div>
              <div className="flex items-start gap-4 text-white">
                <div>
                  <FormField
                    name="isSame"
                    control={formInfo.control}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-3">
                          <FormControl>
                            <Checkbox
                              {...field}
                              id="isSame"
                              checked={field.value}
                              onChange={(e) => {
                                formInfo.setValue('livingState', undefined);
                                formInfo.setValue('livingStateId', undefined);
                                formInfo.setValue('livingDistrict', undefined);
                                formInfo.setValue(
                                  'livingDistrictId',
                                  undefined,
                                );
                                formInfo.setValue(
                                  'livingPanchayath',
                                  undefined,
                                );
                                formInfo.setValue(
                                  'livingPanchayathId',
                                  undefined,
                                );
                                formInfo.setValue('livingWard', undefined);
                                formInfo.setValue('livingWardId', undefined);
                                formInfo.setValue('livingPincode', undefined);
                                field.onChange(e.target.checked);
                              }}
                            />
                          </FormControl>
                          <label
                            htmlFor="isSame"
                            className="font-formal font-robot mt-0 text-lg text-black"
                          >
                            The living address is the same as the permanent
                            address.
                          </label>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="h-6"></div>
            <LivingAddressForm formInfo={formInfo} />
            <div className="h-6"></div>
            <div className="grid grid-cols-1 gap-3">
              <FormField
                name="alternateMobile"
                control={formInfo.control}
                render={({ field: { onChange, ...fields } }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor=""
                      className="text-base font-normal leading-[18.7px]"
                    >
                      Please provide Friends and Family Emergency Backup Contact
                      Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <div className="w-[60px]">
                          <TextField
                            placeholder="+91"
                            type="text"
                            variant="primary"
                            className="bg-white placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                            disabled
                          />
                        </div>
                        <TextField
                          {...fields}
                          onChange={(e) => {
                            const { value } = e.target;
                            if (value?.length <= 10) {
                              onChange(value);
                            }
                          }}
                          placeholder="Enter alternative number"
                          type="number"
                          variant="primary"
                          className="w-full placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                        />
                      </div>
                    </FormControl>
                    <div className="pl-[58px]">
                      <FormMessage className="text-xs text-red-500" />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                name="whatsappNumber"
                control={formInfo.control}
                render={({ field: { onChange, ...fields } }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor=""
                      className="text-base font-normal leading-[18.7px]"
                    >
                      WhatsApp number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <div className="w-[60px]">
                          <TextField
                            placeholder="+91"
                            type="text"
                            variant="primary"
                            className="bg-white placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                            disabled
                          />
                        </div>
                        <TextField
                          {...fields}
                          onChange={(e) => {
                            const { value } = e.target;
                            if (value?.length <= 10) {
                              onChange(value);
                            }
                          }}
                          placeholder="Enter WhatsApp number"
                          type="number"
                          variant="primary"
                          className="w-full placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                        />
                      </div>
                    </FormControl>
                    <div className="pl-[52px]">
                      <FormMessage className="text-xs text-red-500" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="h-2"></div>
            <FormField
              name="email"
              control={formInfo.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor=""
                    className="text-base font-normal leading-[18.7px]"
                  >
                    Email address
                  </FormLabel>
                  <FormControl>
                    <TextField
                      {...field}
                      placeholder="Enter email address"
                      type="text"
                      variant="primary"
                      className="w-full placeholder:!text-[16px] placeholder:!leading-[17.5px]"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <div className="h-3"></div>
            {isUpdateLanguage && <LanguagesForm formInfo={formInfo} />}
            <div className="h-2"></div>
            <Alert
              type="error"
              message={formInfo?.formState?.errors?.root?.message || ''}
            />
            <div className="mt-6 flex flex-col items-center">
              <Button
                size={'lg'}
                className="w-full py-3 text-[15px] leading-[17.5px]"
                variant={'secondary'}
                type="submit"
                loading={AddressLoading || loadingLanguage}
                disabled={AddressLoading || loadingLanguage}
              >
                Save and Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddressForm;
