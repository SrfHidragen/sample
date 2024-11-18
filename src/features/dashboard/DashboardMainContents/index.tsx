/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/components/Typography';
import React, { useMemo } from 'react';
import PmfHistory from '@/features/dashboard/DashboardMainContents/PmfHistory';
import GiveHelpHistory from './GiveHelp';
import ReceiveHelpHistory from './ReceiveHelp';
import WithdrawalHistory from './Withdrawal';
import { useAuthStore } from '@/store/auth.store';
import { FaUserCircle } from 'react-icons/fa';
import { PmfEdge } from '@/types/history-type/pmfhistory.type';
import { GiveHelpHistoryEdgeType } from '@/types/history-type/give.help.history.type';
import { classifyArea, convertToInrSymbol } from '@/lib/utils';
import DashboardMobileVew from '@/components/dashboard/DashboardMobileView';
import { withdrawHistoryEdge } from '../Reports/WithdrawalReport';
import { PartialPaymentTypeEdge } from '@/types/history-type/recent.receive.help.type';
import { GlobalVariables } from '@/lib/constant';

const DashboardMainContents = ({
  pmfHistoryData,
  ReceiveHelpHistoryData,
  GiveHelpHistoryData,
  withdrawalHistoryData,
  associateList,
}: {
  pmfHistoryData: PmfEdge[] | undefined;
  ReceiveHelpHistoryData: PartialPaymentTypeEdge[] | undefined;
  GiveHelpHistoryData: GiveHelpHistoryEdgeType[] | undefined;
  withdrawalHistoryData: withdrawHistoryEdge[] | undefined;
  associateList: any;
}) => {
  const { user } = useAuthStore();
  const userDetails = useMemo(() => user?.userDetails, [user?.userDetails]);
  return (
    <div className="flex w-full flex-col gap-4">
      {/* mobile view content */}
      <DashboardMobileVew associateList={associateList} />
      {/* content one */}
      <div className="hidden flex-wrap gap-4 md:flex ">
        <div className="min-w-fit flex-1 flex-shrink-0 content-center space-y-1 rounded-lg bg-[#0050D8] p-4 transition-all duration-300">
          <Typography as="p" className="font-light text-white">
            My Give Help
          </Typography>
          {classifyArea(Number(userDetails?.userPlan))?.label !== 'Unknown' && (
            <Typography as="p" className="text-lg text-white">
              My giveNtake Approach :{' '}
              <Typography className="font-light" as="span">
                {classifyArea(Number(userDetails?.userPlan))?.label || ''}
              </Typography>
            </Typography>
          )}
          <Typography className="text-xl font-bold text-white">
            <span className="ml-1 inline-flex items-baseline">
              {' '}
              ₹{userDetails?.totalSpend ?? ''}
            </span>
          </Typography>
        </div>
        <div className="w-full min-w-fit content-center space-y-1 rounded-lg bg-[#0050D8] p-4 transition-all duration-300 sm:max-w-[200px]">
          <Typography as="p" className="font-light text-white">
            PMF + 18 % GST
          </Typography>
          <Typography className="text-xl font-bold text-white">
            <span className="ml-1 inline-flex items-baseline">
              {' '}
              ₹
              {(Number(userDetails?.pmf) + Number(userDetails?.tax)).toFixed(2)}
            </span>
          </Typography>
        </div>
        <div className="min-w-fit flex-1 flex-shrink-0 content-center space-y-1 rounded-lg bg-[#0050D8] p-4 transition-all duration-300">
          <Typography as="p" className="font-light text-white">
            My Receive Help
          </Typography>
          {/* <Typography as="p" className="text-lg text-white">
            Designation :{' '}
            <Typography className="font-light" as="span">
              Legendary giveNtaker
            </Typography>
          </Typography> */}
          <Typography className="text-xl font-bold text-white">
            <span className="ml-1 inline-flex items-baseline">
              {' '}
              ₹{userDetails?.totalReceived ?? '0'}
            </span>
          </Typography>
        </div>
        <div className="w-full min-w-fit content-center space-y-1 rounded-lg bg-[#0050D8] p-4 transition-all duration-300 sm:max-w-[200px]">
          <Typography as="p" className="font-light text-white">
            My Withdrawal
          </Typography>
          <Typography className="text-xl font-bold text-white">
            <span className="ml-1 inline-flex items-baseline">
              {convertToInrSymbol(Number(userDetails?.totalWithdrawalAmount))}
            </span>
          </Typography>
        </div>
      </div>
      {/* content two */}
      <div className="hidden gap-2  sm:grid-cols-2 md:grid xl:grid-cols-4">
        {!!userDetails?.invitedBy && (
          <div className="w-full  bg-[#0119AD] p-3 text-white transition-all duration-300 xl:max-w-full">
            <Typography as="p" className="text-xl font-normal">
              Invited by
            </Typography>
            <div className="h-4"></div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {userDetails?.invitedBy?.avatar ? (
                  <img
                    className="h-[43px] w-[43px] rounded-full border object-cover"
                    src={`${GlobalVariables.imgURL}${userDetails?.invitedBy?.avatar}`}
                    alt="invited_user"
                  />
                ) : (
                  <FaUserCircle size={43} />
                )}
              </div>
              <div className="">
                <Typography as="p" className="text-lg font-medium">
                  {userDetails?.invitedBy?.firstName}
                </Typography>
                <Typography className="font-light" as="p">
                  Consumership Number
                </Typography>
                <Typography as="p" className="text-lg">
                  {userDetails?.invitedBy?.username}
                </Typography>
              </div>
            </div>
            <div className="h-4"></div>
            {userDetails?.invitedBy?.achievements &&
              userDetails?.invitedBy?.achievements?.map(
                (item: any, index: any) => (
                  <div key={index} className="flex items-center gap-3">
                    <img src="/img/dashboard/badge.png" className="" alt="" />
                    <Typography as="p" className="text-sm">
                      {item?.name}
                    </Typography>
                  </div>
                ),
              )}
          </div>
        )}

        {userDetails?.parent && (
          <div className="w-full  bg-[#0119AD] p-3 text-white transition-all duration-300 xl:max-w-full">
            <Typography as="p" className="text-xl font-normal">
              Enrolled By
            </Typography>
            <div className="h-4"></div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {userDetails?.parent?.avatar ? (
                  <img
                    className="h-[43px] w-[43px] rounded-full border border-white object-cover"
                    src={`${GlobalVariables.imgURL}${userDetails?.parent?.avatar}`}
                    alt="parent_user"
                  />
                ) : (
                  <FaUserCircle size={43} />
                )}
              </div>
              <div className="">
                <Typography as="p" className="text-lg font-medium">
                  {userDetails?.parent?.firstName}
                </Typography>
                <Typography className="font-light" as="p">
                  Consumership Number
                </Typography>
                <Typography as="p" className="text-lg">
                  {userDetails?.parent?.username}
                </Typography>
              </div>
            </div>
            <div className="h-4"></div>
            {userDetails?.parent?.achievements &&
              userDetails?.parent?.achievements?.map(
                (item: any, index: any) => (
                  <div key={index} className="flex items-center gap-3">
                    <img src="/img/dashboard/badge.png" className="" alt="" />
                    <Typography as="p" className="text-sm">
                      {item?.name}
                    </Typography>
                  </div>
                ),
              )}
          </div>
        )}

        {associateList?.length > 0 &&
          associateList?.map((item: any, index: number) => (
            <div
              key={index}
              className="w-full  bg-[#0119AD] p-3 text-white transition-all duration-300 xl:max-w-full"
            >
              <Typography as="p" className="text-xl font-normal">
                Associate {index + 1}
              </Typography>
              <div className="h-4"></div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {item?.avatar ? (
                    <img
                      className="h-[43px] w-[43px]"
                      src={`${GlobalVariables.imgURL}${item?.avatar}`}
                      alt="invited_user"
                    />
                  ) : (
                    <FaUserCircle size={43} />
                  )}
                </div>
                <div className="">
                  <Typography as="p" className="text-lg font-medium">
                    {item?.firstName}
                  </Typography>
                  <Typography className="font-light" as="p">
                    Consumership Number
                  </Typography>
                  <Typography as="p" className="text-lg">
                    {item?.consumerNo}
                  </Typography>
                </div>
              </div>
              <div className="h-4"></div>
              {/* <div className="flex items-center gap-3">
                <img src="/img/dashboard/badge.png" className="" alt="" />
                <Typography as="p" className="text-sm">
                  Super Senior giveNtaker
                </Typography>
              </div> */}
            </div>
          ))}
      </div>
      {/* content three */}
      <div className="grid gap-4 md:grid-cols-2">
        <PmfHistory pmfHistoryData={pmfHistoryData} />
        <GiveHelpHistory GiveHelpHistoryData={GiveHelpHistoryData} />
        <ReceiveHelpHistory ReceiveHelpHistoryData={ReceiveHelpHistoryData} />
        <WithdrawalHistory withdrawalHistoryData={withdrawalHistoryData} />
      </div>
    </div>
  );
};

export default React.memo(DashboardMainContents);
