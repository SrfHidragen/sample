import Image from '@/components/Image';
import Typography from '@/components/Typography';
import React from 'react';

type InvitationFlowCardType = {
  src: string;
  description: string;
  step: number;
  total_step: number;
};
function InvitationFlowCard({
  src,
  description,
  step,
  total_step,
}: InvitationFlowCardType) {
  return (
    <div className="flex flex-col-reverse items-center gap-10 p-0 md:flex-row md:gap-32 md:p-2">
      <div>
        <Image src={src || ''} alt="frame1" />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-1">
          <Typography className="font-bold text-white">Step {step}</Typography>

          <Typography className="text-[#9D9999]">
            of{'  '}
            {total_step}
          </Typography>
        </div>
        <div className="h-3"></div>
        <Typography className="break-words text-[18px] font-normal text-white">
          {description}
        </Typography>
      </div>
    </div>
  );
}

export default InvitationFlowCard;
