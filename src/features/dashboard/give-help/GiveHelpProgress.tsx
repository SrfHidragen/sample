/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
'use client';
import { Button } from '@/components/Button';
import Typography from '@/components/Typography';
import { classifyArea, cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { GrFormCheckmark } from 'react-icons/gr';

interface ProgressItem {
  id: number;
  label: string;
  isClickable: boolean;
}

// const userTypeToIndexMap: Record<string, number> = {
//   Rural: 1,
//   'Semi-Rural': 2,
//   Urban: 3,
//   Township: 4,
//   Metro: 5,
// };

const GiveHelpProgress = () => {
  // const [CurrentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const userDetails = useAuthStore((state) => state.user)?.userDetails;
  // const userType = userDetails?.userPlan;

  const payDesignationAmount = () => {
    router.push(`/dashboard/give-help/give-help-process`);
  };

  const progressArray: ProgressItem[] = [
    {
      id: 1,
      label: 'Rural',

      isClickable: false,
    },
    {
      id: 2,
      label: 'Semi-Rural',
      // status:
      //   userType &&
      //   (userType == 'Semi-Rural' ||
      //     userType == 'Urban' ||
      //     userType == 'Township' ||
      //     userType == 'Metro')
      //     ? 'complete'
      //     : 'not-started',
      isClickable: false, // userType == 'Rural',
    },
    {
      id: 3,
      label: 'Urban',
      // status:
      //   userType &&
      //   (userType == 'Urban' || userType == 'Township' || userType == 'Metro')
      //     ? 'complete'
      //     : 'not-started',
      isClickable: false, // userType == 'Semi-Rural',
    },
    {
      id: 4,
      label: 'Township',
      isClickable: false, //userType == 'Urban',
    },
    {
      id: 5,
      label: 'Metro ',
      // status: userType && userType == 'Metro' ? 'complete' : 'not-started',
      isClickable: false, //userType == 'Township',
    },
  ];
  // console.log("hai")

  // useEffect(() => {
  //   if (userType && userTypeToIndexMap[userType] !== undefined) {
  //     setCurrentIndex(userTypeToIndexMap[userType]);
  //   } else {
  //     setCurrentIndex(0);
  //   }
  // }, [userType]);
  // console.log({ CurrentIndex });

  const { label: CurrentApproach, index: CurrentIndex } = classifyArea(
    Number(userDetails?.paidLevel),
  );
  return (
    <>
      {/* progress flow */}
      <div className="flex w-full justify-center py-5 sm:gap-1">
        {progressArray.map((item, index) => {
          return (
            <div className="flex items-start" key={item.id}>
              <div className="flex w-[60px] cursor-not-allowed flex-col items-center sm:w-[80px]">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full  border-[3.5px] ',
                    index <= CurrentIndex
                      ? 'border-green-500 font-bold text-green-500'
                      : 'border-white text-white',
                  )}
                >
                  {index <= CurrentIndex ? (
                    <GrFormCheckmark size={'2rem'} />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  )}
                </div>
                <div className="h-2"></div>
                <p className="text-center text-[14px] font-normal leading-[16.41px] text-white">
                  {item.label}
                </p>
              </div>
              {progressArray.length - 1 !== index && (
                <div className={cn('flex h-8 items-center')}>
                  <div
                    className={cn(
                      'mx-auto hidden h-2 w-2 rounded-full sm:block',
                      index <= CurrentIndex - 1
                        ? 'bg-green-500'
                        : 'bg-gray-400',
                    )}
                  ></div>
                  <div
                    className={cn(
                      'mx-auto h-[1px] w-[15px] sm:w-[18px]',
                      index <= CurrentIndex - 1
                        ? 'bg-green-500'
                        : 'bg-gray-400',
                    )}
                  ></div>
                  <div
                    className={cn(
                      'mx-auto hidden h-2 w-2 rounded-full sm:block',
                      index <= CurrentIndex - 1
                        ? 'bg-green-500'
                        : 'bg-gray-400',
                    )}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="h-6"></div>

      <div className="flex flex-col items-center justify-center gap-3 text-white">
        <Typography as="h3" className="text-[20px] font-normal">
          {Number(userDetails?.totalSpend) === 0
            ? 'Total Give Help Amount: 0'
            : `Total Give Help Amount: ₹${userDetails?.totalSpend}`}
        </Typography>
        {CurrentApproach !== 'Unknown' && (
          <Typography as="p" className="font-normal">
            Current Approach : {CurrentApproach}
          </Typography>
        )}
        {Number(userDetails?.paidLevel) !== 10 && (
          <Button
            className="max-w-[374px] text-base font-semibold text-black"
            variant={'secondary'}
            type="button"
            onClick={payDesignationAmount}
          >
            Upgrade your Approach
          </Button>
        )}
      </div>
    </>
  );
};

export default GiveHelpProgress;
