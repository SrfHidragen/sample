/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Typography from '@/components/Typography';
import { capitalizeFirstLetter, cn, convertToInrSymbol } from '@/lib/utils';
import React from 'react';
import { Button } from '@/components/Button';
import { useMutation, useQuery } from '@apollo/client';

import { FaUserCircle } from 'react-icons/fa';
import PageLoading from '@/components/PageLoading';
import { GlobalVariables } from '@/lib/constant';

import { GET_CUSTOMER_INITIAL_APPROACH } from '@/graphql/query/initialapproach.query';
import InfoRow from '../kyc-page/AddressForm/InfoRow';
import { COMPLETE_CUSTOMER_APPROACH } from '@/graphql/mutation/initialapproach.mutation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type GetCustomerGiveHelpListResponse = {
  getCustomerGiveHelpList: {
    id: string;
    versions: string;
    amount: string;
    transactionId: string;
    payments: {
      id: string;
      amount: string;
      member: {
        id: string;
        avatar: string | null;
        name: string;
        username: string;
        address: {
          addressLine1: string | null;
          addressLine2: string | null;
          city: string;
          state: string;
          district: string;
          panchayath: string;
          ward: string;
          houseNo: string;
          street: string;
          postalCode: string;
        };
        bankDetails: {
          upiRegisteredAccountNumber: string;
          upiRegisteredBankIfsc: string;
          accountHolderName: string;
          upiRegisteredBankBranch: string;
          upiRegisteredBankName: string;
        };
      };
    }[];
  };
};

const ApproachAboutPayment = () => {
  const router = useRouter();
  const { data, loading } = useQuery<GetCustomerGiveHelpListResponse>(
    GET_CUSTOMER_INITIAL_APPROACH,
    {
      fetchPolicy: 'network-only',
    },
  );

  const [completeCustomerApproach, { loading: loadingComplete }] = useMutation(
    COMPLETE_CUSTOMER_APPROACH,
  );
  const isLoading = loadingComplete || loading;
  if (loading) return <PageLoading />;

  const onCompleteGiveHelp = async (transactionId: string | undefined) => {
    try {
      const { data } = await completeCustomerApproach({
        variables: { transactionId },
      });
      if (data?.completeCustomerApproach?.statusCode !== 200) {
        return toast.error(data?.completeCustomerApproach?.message);
      }
      toast.success(data?.completeCustomerApproach?.message);
      router.push('/dashboard');
    } catch (error) {
      toast.error('Server issues Please try again');
    }
  };
  return (
    <div className="flex w-full items-center justify-center py-24">
      {/* <div className="min-w-md w-full px-4 sm:w-10/12 sm:min-w-[700px] sm:px-0"> */}
      <div className="flex flex-col gap-6 rounded-lg bg-[#FFF1CF] p-6">
        <Typography as="h2" className="leading-[28.13px] text-black">
          More about this payment
        </Typography>

        <div className={cn('flex flex-col gap-2')}>
          {data?.getCustomerGiveHelpList?.payments &&
            data?.getCustomerGiveHelpList.payments?.map(
              (item, index: React.Key) => (
                <div
                  className="flex flex-col justify-between gap-2 rounded-md bg-[#F3E1B2] p-4"
                  key={index}
                >
                  <div className="flex items-start justify-between">
                    <div className="">
                      <Typography as="p" className="text-base font-medium">
                        Name:
                      </Typography>
                      <Typography as="p" className="text-base font-normal">
                        {capitalizeFirstLetter(item?.member.name)}
                      </Typography>
                      <div className="h-1"></div>
                      <Typography as="p" className="text-base font-medium">
                        Consumership Number:
                      </Typography>
                      <Typography as="p" className="text-base font-normal">
                        {item?.member?.username}
                      </Typography>

                      <Typography as="p" className="text-base font-medium">
                        Pay Amount:
                      </Typography>
                      <Typography as="p" className="text-base font-normal">
                        {convertToInrSymbol(item?.amount)}
                      </Typography>
                    </div>

                    {item?.member.avatar ? (
                      <div className="rounded-full border-[1.53px] border-[#2FEA00] p-1">
                        <img
                          src={GlobalVariables.imgURL + item?.member.avatar}
                          alt="alt"
                          className="h-11 w-11 rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="rounded-full border-[1.53px] border-[#2FEA00] p-1">
                        <FaUserCircle size={42.82} color="gray" />
                      </div>
                    )}
                  </div>
                  <div>
                    <Typography as="h4" className="text-base font-medium">
                      Address
                    </Typography>
                    <Typography as="p" className=" text-base font-normal">
                      {item?.member?.address?.state},{' '}
                      {item?.member?.address?.district},{' '}
                      {item?.member?.address?.panchayath},{' '}
                      {item?.member?.address?.ward}
                    </Typography>
                  </div>
                  {item?.member?.bankDetails && (
                    <div>
                      <Typography as="h4" className="text-base font-medium">
                        Bank Details
                      </Typography>
                      <div className="h-1"></div>
                      <div className="mb-1 grid grid-cols-[1.5fr,1fr,2fr] gap-y-1">
                        {!!item?.member?.bankDetails?.upiRegisteredBankName && (
                          <InfoRow
                            label="Bank Name"
                            value={
                              item?.member?.bankDetails
                                ?.upiRegisteredBankName || ''
                            }
                          />
                        )}
                        {!!item?.member?.bankDetails
                          ?.upiRegisteredAccountNumber && (
                          <InfoRow
                            label="Account Number"
                            value={
                              item?.member?.bankDetails
                                ?.upiRegisteredAccountNumber || ''
                            }
                          />
                        )}
                        {!!item?.member?.bankDetails
                          ?.upiRegisteredBankBranch && (
                          <InfoRow
                            label="Branch"
                            value={
                              item?.member?.bankDetails
                                ?.upiRegisteredBankBranch || ''
                            }
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ),
            )}
        </div>

        <div className="">
          <Button
            type="submit"
            variant={'secondary'}
            onClick={() =>
              onCompleteGiveHelp(data?.getCustomerGiveHelpList.transactionId)
            }
            disabled={isLoading}
          >
            Complete Give Help
          </Button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ApproachAboutPayment;
