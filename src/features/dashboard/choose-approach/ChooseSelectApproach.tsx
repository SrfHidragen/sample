'use client';
import { Button } from '@/components/Button';
import Typography from '@/components/Typography';
import { GiveHelpApproachList } from '@/lib/constant';
import { convertToInrSymbol, decode } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

type ApproachType = {
  id: number;
  name: string;
  description: string;
  details: string;
  terms_details: string;
  payment_details: string;
  stage_give_help_amount: number;
  total_payable_amount: number;
};

function SelectedApproach() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const amount = searchParams.get('process') || '';
  const total_amount = decode(amount);
  const ApproachItems = searchParams.get('choose') || '';
  const CurrentApproach: ApproachType | null = useMemo(
    () =>
      GiveHelpApproachList?.find((item) =>
        item?.name
          ?.split(' ')
          .join('')
          .toLowerCase()
          .includes(decode(ApproachItems).split(' ')?.join('')?.toLowerCase()),
      ) || null,
    [ApproachItems],
  );

  const handleToPay = () => {
    router.push(
      `/dashboard/choose-approach/pay-amount?process=${amount}&tname=${ApproachItems}`,
    );
  };
  return (
    <div className="container px-4 sm:px-6 md:px-8">
      <div className="overflow-hidden bg-[#0119AD] p-4 sm:p-7">
        <Typography className="text-xl font-bold text-white">
          {CurrentApproach?.name} Approach
        </Typography>
        <div className="h-5"></div>
        <div>
          <Typography className="break-words text-base text-white">
            {CurrentApproach?.description}
          </Typography>
          <div className="h-4"></div>
          <Typography className="break-words text-base text-white">
            {CurrentApproach?.details}
          </Typography>
          <div className="h-4"></div>
          <Typography className="break-words text-base text-white">
            {CurrentApproach?.terms_details}
          </Typography>
          <div className="h-5"></div>
          <Typography className="break-words text-lg font-medium  text-[#FFCC01]">
            {CurrentApproach?.payment_details}
          </Typography>
          <div className="h-4"></div>
          <div className="flex w-full max-w-80 flex-col gap-3 text-white">
            <div className="full flex justify-between">
              <Typography className="flex-1">Give Help</Typography>
              <span>:</span>
              <Typography className="flex-1 text-right">
                {convertToInrSymbol(Number(total_amount))}
              </Typography>
            </div>
            <div className="full flex justify-between">
              <Typography className="flex-1">Total Payable</Typography>
              <span>:</span>
              <Typography className="flex-1 text-right">
                {convertToInrSymbol(Number(total_amount))}
              </Typography>
            </div>
            <div className="h-4"></div>
            <Button variant={'secondary'} onClick={handleToPay}>
              Continue to Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedApproach;
