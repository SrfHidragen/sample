import React from 'react';
import Typography from '@/components/Typography';

type Props = {
  totalConsumers: string;
  associatesConsumers: string;
  helpedConsumers: string;
  partiallyPaidConsumers: string;
  notInvitedCount: string;
};

const ReceiveHelp: React.FC<Props> = ({
  totalConsumers,
  associatesConsumers,
  helpedConsumers,
  partiallyPaidConsumers,
  notInvitedCount,
}) => {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 rounded-lg bg-[#03147C] px-20 py-6 shadow-md">
        <div className="grid grid-cols-[2fr,1fr,1fr] gap-y-[9px]">
          <Typography as="h4" className="font-semibold text-white">
            Total Consumers
          </Typography>
          <Typography as="h4" className="text-center font-semibold text-white">
            :
          </Typography>
          <Typography as="h4" className="font-semibold text-white">
            {totalConsumers}
          </Typography>

          <Typography as="h4" className="font-semibold text-[#FFCC01]">
            Associated Consumers
          </Typography>
          <Typography as="h4" className="text-center font-semibold text-white">
            :
          </Typography>
          <Typography as="h4" className="font-semibold text-[#FFCC01]">
            {associatesConsumers}
          </Typography>

          <Typography as="h4" className="font-semibold text-[#2CAB00]">
            Helped Consumers
          </Typography>
          <Typography as="h4" className="text-center font-semibold text-white">
            :
          </Typography>
          <Typography as="h4" className="font-semibold text-[#2CAB00]">
            {helpedConsumers}
          </Typography>
        </div>
      </div>

      <div className="flex-1 rounded-lg bg-[#03147C] px-20 py-6 shadow-md">
        <div className="grid grid-cols-[2fr,1fr,1fr] gap-y-[9px]">
          <Typography as="h4" className="font-semibold text-[#44C7F4]">
            Partially Helped
          </Typography>
          <Typography as="h4" className="text-center font-semibold text-white">
            :
          </Typography>
          <Typography as="h4" className="font-semibold text-[#44C7F4]">
            {partiallyPaidConsumers}
          </Typography>

          <Typography as="h4" className="font-semibold text-[#FF4F4F]">
            Non Invited
          </Typography>
          <Typography as="h4" className="text-center font-semibold text-white">
            :
          </Typography>
          <Typography as="h4" className="font-semibold text-[#FF4F4F]">
            {notInvitedCount}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ReceiveHelp;
