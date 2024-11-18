/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useKycStore } from '@/store/kyc.store';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { GrFormCheckmark } from 'react-icons/gr';

const KycFlowCard = () => {
  const pathname = usePathname();
  const { isKycFilled, KycFlow } = useKycStore(
    (state) => state?.kycVerification,
  );

  return (
    !isKycFilled && (
      <>
        <div className="flex w-full justify-center sm:gap-1">
          {/* progress */}
          {KycFlow?.map(
            (item, index) =>
              item?.isShow && (
                <div className="flex items-start" key={item?.id}>
                  <div className={'flex w-fit flex-col items-center'}>
                    {/* icon */}
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full border-[3.5px] font-bold',
                        item?.isVerified
                          ? 'border-green-500 text-green-500'
                          : pathname === item?.pathname
                            ? 'border-[#FFA800] text-[#FFA800]'
                            : '',
                      )}
                    >
                      {item?.isVerified ? (
                        <GrFormCheckmark size={'2rem'} className="" />
                      ) : (
                        <div
                          className={cn(
                            'h-2 w-2 rounded-full bg-white',
                            pathname === item?.pathname && 'bg-[#FFA800]',
                          )}
                        ></div>
                      )}
                    </div>
                    {/* label */}
                    <div className="h-2"></div>
                    <div className="w-10 text-center text-xs font-medium text-white sm:w-full">
                      <p>{item?.label}</p>
                      <p className="hidden sm:block">Verification</p>
                    </div>
                  </div>
                  {KycFlow?.length - 2 !== index && (
                    <div className=" flex h-8 items-center">
                      <div
                        className={cn(
                          'mx-auto h-2 w-2 rounded-full bg-white',
                          item?.isVerified && 'bg-green-500',
                        )}
                      ></div>
                      <div
                        className={cn(
                          'mx-auto h-[1px] w-[15px] bg-gray-400  sm:w-[18px]',
                          item?.isVerified && 'bg-green-500',
                        )}
                      ></div>
                      <div
                        className={cn(
                          'mx-auto h-2 w-2 rounded-full bg-white',
                          item?.isVerified && 'bg-green-500',
                        )}
                      ></div>
                    </div>
                  )}
                </div>
              ),
          )}
        </div>
      </>
    )
  );
};

export default React.memo(KycFlowCard);
