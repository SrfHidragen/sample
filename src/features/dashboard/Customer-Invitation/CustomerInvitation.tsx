import Typography from '@/components/Typography';
import React from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import InvitationFlowCard from '@/features/dashboard/Customer-Invitation/InvitationFlowCard';

function CustomerInvitation() {
  return (
    <div className="container">
      <div className="h-full w-full bg-none p-0 md:bg-[#003186] md:px-10 md:py-16">
        <div className="flex items-center justify-between">
          <Typography className="text-[20px] font-normal text-white md:text-[24px] md:font-bold">
            Invitation Process Guide
          </Typography>
          <div className="flex cursor-pointer items-center gap-2 text-yellow-500">
            <MdOutlineContentCopy size={25} />
            <Typography className="hidden md:block">
              Copy your consumership No
            </Typography>
          </div>
        </div>
        <div className="h-10"></div>

        <InvitationFlowCard
          src="/img/invitation/frame1.svg"
          description="Ask the person you invited to complete Customer Registration"
          step={1}
          total_step={8}
        />
        <div className="h-16 md:h-32"></div>
        <InvitationFlowCard
          src="/img/invitation/frame2.svg"
          description="Ask the person you invited to Pay ₹ 20.00 Customer KYC Verification Fee"
          step={2}
          total_step={8}
        />
        <div className="h-16 md:h-32"></div>

        <InvitationFlowCard
          src="/img/invitation/frame3.svg"
          description="Ask the person you invited to Complete KYC Verification"
          step={3}
          total_step={8}
        />
        <div className="h-16 md:h-32"></div>

        <InvitationFlowCard
          src="/img/invitation/frame4.svg"
          description="Ask the person you invited to Pay PMF"
          step={4}
          total_step={8}
        />
        <div className="h-16 md:h-32"></div>

        <InvitationFlowCard
          src="/img/invitation/frame5.svg"
          description="Ask the person you invited to Choose giveNtake Approach"
          step={5}
          total_step={8}
        />
        <div className="h-16 md:h-32"></div>

        <InvitationFlowCard
          src="/img/invitation/frame6.svg"
          description="Ask the person you invited to Add your Consumership No. by clicking here"
          step={6}
          total_step={8}
        />
        <div className="h-16 md:h-32"></div>

        <InvitationFlowCard
          src="/img/invitation/frame7.svg"
          description="Ask the person you invited to Enter your Consumership No. here and click on submit button"
          step={7}
          total_step={8}
        />
        <div className="h-16 md:h-32"></div>

        <InvitationFlowCard
          src="/img/invitation/frame8.svg"
          description="Ask the person you invited to pay Give Help"
          step={8}
          total_step={8}
        />
      </div>
    </div>
  );
}

export default CustomerInvitation;
