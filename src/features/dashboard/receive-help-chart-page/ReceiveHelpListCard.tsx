/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/components/Typography';
import { convertToInrSymbol } from '@/lib/utils';
import { Stage } from '@/types/receive.help.type';
import Link from 'next/link';
import React from 'react';

function ReceiveHelpListCard({ StageData }: { StageData: Stage[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {StageData.map((item: Stage, index: number) => (
        <div className="rounded-lg bg-[#003186] p-[14px]" key={index}>
          <div className="flex justify-center gap-3">
            <Typography className="font-semibold text-white">
              Stage {index + 1}
            </Typography>
            <Typography className="font-semibold text-white">
              {convertToInrSymbol(item?.amount)}
            </Typography>
          </div>
          <div className="h-3"></div>

          <div className="flex flex-col gap-2 text-white">
            <Link
              href={`/dashboard/receive-help-chart/associated-consumers?stage=${index + 1}`}
              className=" flex cursor-pointer justify-between border border-[#FFCC01] p-3"
            >
              <span style={{ flex: 2 }}>Associated Consumers</span>
              <span>:</span>
              <div className="flex flex-1 justify-end">
                <Typography className="mr-2 text-[#FFCC01]">
                  {item?.associatedConsumers}
                </Typography>
                {'/'}
                <Typography className="ml-2">{item?.totalConumers}</Typography>
              </div>
            </Link>
            <Link
              href={`/dashboard/receive-help-chart/helped-consumers?stage=${index + 1}`}
              className="flex cursor-pointer justify-between border border-[#FFCC01] p-3"
            >
              <span style={{ flex: 2 }}>Helped Consumers</span>
              <span>:</span>
              <Typography className="flex-1 text-right text-[#2CAB00]">
                {item.helpedConsumers}
              </Typography>
            </Link>
            <Link
              href={`/dashboard/receive-help-chart/partially-helped?stage=${index + 1}`}
              className="flex justify-between border border-[#FFCC01] p-3 "
            >
              <span style={{ flex: 2 }}>Partially Consumers</span>
              <span>:</span>
              <Typography className="flex-1 text-right text-[#44C7F4]">
                {item.partiallyPaidConsumers}
              </Typography>
            </Link>
            <Link
              href={`/dashboard/receive-help-chart/associate-non-inviters?stage=${index + 1}`}
              className="flex justify-between border border-[#FFCC01] p-3"
            >
              <span style={{ flex: 2 }}>Associate Non-Inviters</span>
              <span>:</span>
              <Typography className="flex-1 text-right text-[#FF4F4F]">
                {item.notInvitedMembers}
              </Typography>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReceiveHelpListCard;
