// import { Button } from "@/components/Button";
// import Typography from "@/components/Typography";

// export default function ReceiveHelpStartTime() {
//   return (
//     <div className="flex items-center justify-center">
//       <div className="w-full max-w-4xl space-y-8 p-4 text-white">
//         <Typography
//           as="h4"
//           className="text-base font-normal text-white sm:text-[18px]"
//         >
//           When do you want to start accepting Receive Helps
//         </Typography>
//         <Button type="submit" variant={'secondary'} className="max-w-[113px]">
//           Save
//         </Button>
//       </div>
//     </div>
//   );
// }

'use client';

import * as React from 'react';
import { Button } from '@/components/Button';
import Typography from '@/components/Typography';
import { Switch } from '@/components/Switch';

export default function ReceiveHelpStartTime() {
  const [isOn, setIsOn] = React.useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="w-full max-w-4xl  text-white">
      <Typography as="h4" className="font-normal text-white">
        When do you want to start accepting Receive Helps
      </Typography>
      <div className="h-3"></div>
      {/* <div className="rounded-[4px] bg-[#0119AD] p-2"> */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Typography as="span" className="font-normal text-white">
              Accept Receive Helps after
            </Typography>
            <Typography as="span" className="font-normal text-white">
              completing Give Helps ?
            </Typography>
          </div>
          <div className="flex items-center">
            <div className="relative flex flex-col items-center">
              <Switch
                id="receive-helps-switch"
                checked={isOn}
                onCheckedChange={handleToggle}
                className="border-2 border-[#5F6368] bg-[#0119AD]"
              />
              <div
                className={`pointer-events-none absolute left-1 top-1 h-4 w-4 rounded-full transition-transform ${
                  isOn ? 'translate-x-[18px] bg-[#5F6368]' : 'bg-[#5F6368]'
                }`}
              ></div>
              <div>
                <span className="mt-1 text-white">{isOn ? 'On' : 'Off'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-6"></div>
      <Button
        type="submit"
        variant={'secondary'}
        className="max-w-[113px] bg-yellow-500 text-black hover:bg-yellow-600"
      >
        Save
      </Button>
    </div>
  );
}
