'use client';

import React from 'react';
import Typography from '@/components/Typography';
import PrimaryCard from '@/components/PrimaryCard';
import { useQuery } from '@apollo/client';
import { GET_ACCOUNT_DETAILS } from '@/graphql/query/common.query';
import PageLoading from '@/components/PageLoading';
import { localDateConvertion } from '@/lib/utils';
import { FaCircleUser } from 'react-icons/fa6';
import withConsumer from '@/helper/withConsumer';
import { useAuthStore } from '@/store/auth.store';
import { GlobalVariables } from '@/lib/constant';

const MyAccountCard1: React.FC = () => {
  const { user } = useAuthStore();
  const { data, loading } = useQuery(GET_ACCOUNT_DETAILS);
  if (loading) return <PageLoading />;

  const account = data?.account;

  return (
    <>
      <div className="flex w-full max-w-[579px] flex-col gap-4">
        <PrimaryCard className="p-auto rounded-xl sm:px-[14px] sm:py-[21px]">
          <div className="flex items-center gap-7 rounded-[21px] bg-[#02158A] px-[14px] py-[21px]">
            <div>
              {user?.userDetails?.personal?.avatar ? (
                <div className="h-[90px] w-[90px] overflow-hidden rounded-full">
                  <img
                    src={
                      GlobalVariables.imgURL +
                      user?.userDetails?.personal?.avatar
                    }
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <FaCircleUser size={90} color="white" />
              )}
            </div>
            <div>
              <Typography as="h2" className="font-normal text-white">
                {account?.basic.name}
              </Typography>
              <Typography as="h4" className="font-normal text-white">
                Consumer No : {account?.basic.consumerNo}
              </Typography>
              <Typography as="h4" className="font-normal text-white">
                Registered on :{' '}
                {localDateConvertion(account?.basic.createdAt, true)}
              </Typography>
            </div>
          </div>
        </PrimaryCard>

        <PrimaryCard className="rounded-xl sm:p-[23px]">
          <Typography as="h4" className="font-semibold text-white">
            Basic Details
          </Typography>
          <div className="h-4"></div>
          <div className="grid grid-cols-[3fr,.5fr,3fr] gap-y-2">
            <div>
              <Typography as="h4" className="font-normal text-white">
                Aadhar Number
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.basic.aadhaarNumber}
              </Typography>
            </div>

            <div>
              <Typography as="h4" className="font-normal text-white">
                PAN Number
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.basic.pan}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                Primary Mobile Number
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.basic.mobile}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                WhatsApp Number
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.basic.whatsapp}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                Alternative Mobile Number
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.basic.alternativeMobile}
              </Typography>
            </div>
          </div>
        </PrimaryCard>

        <PrimaryCard className="rounded-xl sm:p-[23px]">
          <Typography as="h4" className="font-semibold text-white">
            Bank Account
          </Typography>
          <div className="h-4"></div>
          <div className="grid grid-cols-[3fr,.5fr,3fr] gap-y-3">
            <div>
              <Typography as="h4" className="font-normal text-white">
                Name
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.bank.name}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                Account Number
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.bank.accountNo}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                IFSC Code
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.bank.ifsc}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                Bank Name
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.bank.bankName}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                Branch
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.bank.branch}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                Primary UPI Address
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.bank.primaryUpi}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                Secondary UPI Address
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.bank.secondaryUpi}
              </Typography>
            </div>
          </div>
        </PrimaryCard>

        <PrimaryCard className="rounded-xl sm:p-[23px]">
          <Typography as="h4" className="font-semibold text-white">
            Address
          </Typography>
          <div className="h-4"></div>
          <div className="grid grid-cols-[3fr,.5fr,3fr] gap-y-3">
            <div>
              <Typography as="h4" className="font-normal text-white">
                State
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.address.state}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                District
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.address.district}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                Panchayath
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.address.panchayath}
              </Typography>
            </div>
            <div>
              <Typography as="h4" className="font-normal text-white">
                Ward
              </Typography>
            </div>
            <Typography as="h4" className="text-center font-normal text-white">
              :
            </Typography>
            <div>
              <Typography as="h4" className="font-normal text-white">
                {account?.address?.ward}
              </Typography>
            </div>
          </div>
        </PrimaryCard>
      </div>
    </>
  );
};

export default withConsumer(MyAccountCard1);
