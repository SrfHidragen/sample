// import React from 'react';
// import Typography from '@/components/Typography';
// import PrimaryCard from '@/components/PrimaryCard';
// import { TiChevronRight } from 'react-icons/ti';

// type Stage = {
//   stage: string;
//   associatedConsumers: string;
//   helpedConsumers: string;
//   partiallyPaidConsumers: string;
//   notInvitedMembers: string;
//   totalConumers: string;
// };

// type Props = {
//   stages: Stage[];
// };

// const ReceiveHelpHistoryCard: React.FC<Stage> = ({
//   stage,
//   associatedConsumers,
//   helpedConsumers,
//   partiallyPaidConsumers,
//   notInvitedMembers,
//   totalConumers,
// }) => (
//   <PrimaryCard>
//     <div className="flex items-center justify-between">
//       <Typography
//         as="h4"
//         className="rounded-[9.76px] border border-white px-[7.32px] py-[9.76px] font-bold text-white"
//       >
//         Stage {stage}
//       </Typography>
//       <div className="flex h-[29.27px] w-[29.27px] items-center justify-center rounded-full bg-yellow-500">
//         <TiChevronRight className="text-black" />
//       </div>
//     </div>
//     <div className="items-center">
//       <div className="h-[19.51px]"></div>
//       <div className="grid grid-cols-[2.5fr,1fr,1.5fr] gap-y-[10px]">
//         <div>
//           <Typography as="p" className="text-[18px] font-normal text-white">
//             Total Consumers
//           </Typography>
//         </div>
//         <Typography
//           as="p"
//           className="text-center text-[18px] font-normal text-white"
//         >
//           :
//         </Typography>
//         <div>
//           <Typography as="p" className="text-[24px] font-black text-white">
//             {totalConumers}
//           </Typography>
//         </div>
//         <div>
//           <Typography as="p" className="text-[18px] font-normal text-white">
//             Associated Consumers
//           </Typography>
//         </div>
//         <Typography
//           as="p"
//           className="text-center text-[18px] font-normal text-white"
//         >
//           :
//         </Typography>
//         <div>
//           <Typography as="p" className="text-[24px] font-black text-[#FFCC01]">
//             {associatedConsumers}
//           </Typography>
//         </div>
//         <div>
//           <Typography as="p" className="text-[18px] font-normal text-white">
//             Helped Consumers
//           </Typography>
//         </div>
//         <Typography
//           as="p"
//           className="text-center text-[18px] font-normal text-white"
//         >
//           :
//         </Typography>
//         <div>
//           <Typography as="p" className="text-[24px] font-black text-[#2CAB00]">
//             {helpedConsumers}
//           </Typography>
//         </div>
//         <div>
//           <Typography as="p" className="text-[18px] font-normal text-white">
//             Partially Helped
//           </Typography>
//         </div>
//         <Typography
//           as="p"
//           className="text-center text-[18px] font-normal text-white"
//         >
//           :
//         </Typography>
//         <div>
//           <Typography as="p" className="text-[24px] font-black text-[#44C7F4]">
//             {partiallyPaidConsumers}
//           </Typography>
//         </div>
//         <div>
//           <Typography as="p" className="text-[18px] font-normal text-white">
//             Non Invited
//           </Typography>
//         </div>
//         <Typography
//           as="p"
//           className="text-center text-[18px] font-normal text-white"
//         >
//           :
//         </Typography>
//         <div>
//           <Typography as="p" className="text-[24px] font-black text-[#FF4F4F]">
//             {notInvitedMembers}
//           </Typography>
//         </div>
//       </div>
//     </div>
//   </PrimaryCard>
// );

// const ReceiveHelpHistory: React.FC<Props> = ({ stages }) => {
//   return (
//     <>
//       <div className="h-8"></div>
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
//         {stages.map((stage, index) => (
//           <ReceiveHelpHistoryCard key={index} {...stage} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default ReceiveHelpHistory;

import React from 'react';
import Typography from '@/components/Typography';
import PrimaryCard from '@/components/PrimaryCard';
import { TiChevronRight } from 'react-icons/ti';

type Stage = {
  stage: string;
  associatedConsumers: string;
  helpedConsumers: string;
  partiallyPaidConsumers: string;
  notInvitedMembers: string;
  totalConumers: string;
};

type Props = {
  stages: Stage[];
  // eslint-disable-next-line no-unused-vars
  onStageSelect: (stage: string) => void;
};

const ReceiveHelpHistoryCard: React.FC<
  // eslint-disable-next-line no-unused-vars
  Stage & { onStageSelect: (stage: string) => void }
> = ({
  stage,
  associatedConsumers,
  helpedConsumers,
  partiallyPaidConsumers,
  notInvitedMembers,
  totalConumers,
  onStageSelect,
}) => (
  <PrimaryCard>
    <div className="flex items-center justify-between">
      <Typography
        as="h4"
        className="rounded-[9.76px] border border-white px-[7.32px] py-[9.76px] font-bold text-white"
      >
        Stage {stage}
      </Typography>
      <div
        className="flex h-[29.27px] w-[29.27px] cursor-pointer items-center justify-center rounded-full bg-yellow-500"
        onClick={() => onStageSelect(stage)}
      >
        <TiChevronRight className="text-black" />
      </div>
    </div>
    <div className="items-center">
      <div className="h-[19.51px]"></div>
      <div className="grid grid-cols-[2.5fr,1fr,1.5fr] gap-y-[10px] md:grid-cols-[3.5fr,1fr,1.5fr]">
        <div>
          <Typography as="h4" className="font-normal text-white">
            Total Consumers
          </Typography>
        </div>
        <Typography as="h4" className="text-center font-normal text-white">
          :
        </Typography>
        <div>
          <Typography as="h4" className="font-black text-white">
            {totalConumers}
          </Typography>
        </div>
        <div>
          <Typography as="h4" className="font-normal text-white">
            Associated Consumers
          </Typography>
        </div>
        <Typography as="h4" className="text-center font-normal text-white">
          :
        </Typography>
        <div>
          <Typography as="h4" className="font-black text-[#FFCC01]">
            {associatedConsumers}
          </Typography>
        </div>
        <div>
          <Typography as="h4" className="font-normal text-white">
            Helped Consumers
          </Typography>
        </div>
        <Typography as="h4" className="text-center font-normal text-white">
          :
        </Typography>
        <div>
          <Typography as="h4" className="font-black text-[#2CAB00]">
            {helpedConsumers}
          </Typography>
        </div>
        <div>
          <Typography as="h4" className="font-normal text-white">
            Partially Helped
          </Typography>
        </div>
        <Typography as="h4" className="text-center font-normal text-white">
          :
        </Typography>
        <div>
          <Typography as="h4" className="font-black text-[#44C7F4]">
            {partiallyPaidConsumers}
          </Typography>
        </div>
        <div>
          <Typography as="h4" className="font-normal text-white">
            Non Invited
          </Typography>
        </div>
        <Typography as="h4" className="text-center font-normal text-white">
          :
        </Typography>
        <div>
          <Typography as="h4" className="font-black text-[#FF4F4F]">
            {notInvitedMembers}
          </Typography>
        </div>
      </div>
    </div>
  </PrimaryCard>
);

const ReceiveHelpHistory: React.FC<Props> = ({ stages, onStageSelect }) => {
  return (
    <>
      <div className="h-8"></div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stages.map((stage, index) => (
          <ReceiveHelpHistoryCard
            key={index}
            {...stage}
            onStageSelect={onStageSelect}
          />
        ))}
      </div>
    </>
  );
};

export default ReceiveHelpHistory;
