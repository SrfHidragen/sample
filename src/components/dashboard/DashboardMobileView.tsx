/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/components/Typography';
import { GlobalVariables } from '@/lib/constant';
import { convertToInrSymbol } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';
import React from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';

const DashboardMobileVew = ({ associateList }: { associateList: any }) => {
  const userDetails = useAuthStore((state) => state?.user?.userDetails);
  return (
    <div className="block md:hidden">
      <div className="mx-auto  w-full rounded-lg border border-white bg-gradient-to-t from-[#031DC0] to-[#011487] p-3  ">
        <div className="flex items-center gap-5">
          {userDetails?.personal?.avatar ? (
            <img
              src={`${GlobalVariables.imgURL + userDetails?.personal?.avatar}`}
              className="h-[70px] w-[70px] rounded-full"
              alt=""
            />
          ) : (
            <FaUserCircle fill="white" size={35} />
          )}

          <div>
            <div className="flex gap-2">
              <Typography
                as="p"
                className="text-sm font-medium uppercase text-white"
              >
                {userDetails?.personal?.firstName}
              </Typography>
              {userDetails?.isKycFilled && (
                <BsFillPatchCheckFill
                  size={'1rem'}
                  className="fill-green-500"
                />
              )}
            </div>
            {/* Date field not in the api */}
            {/* <Typography as="p" className="font-light text-white">
              Member Since - 03-07-2024
            </Typography> */}
            <div className="h-1"></div>
            <Typography className="font-medium text-tertiary" as="p">
              Consumership Number
            </Typography>
            <Typography className="track text-lg font-bold text-white">
              {userDetails?.username || ''
                ? (userDetails?.username || '')
                    .split('')
                    .map((digit, index) => {
                      const isFourthDigit =
                        (index + 1) % 4 === 0 &&
                        index !== (userDetails?.username || '').length - 1;

                      const isMiddleSection = index >= 4 && index < 8;

                      return (
                        <span
                          key={index}
                          className={`mr-1 ${isFourthDigit ? 'mr-3' : ''} ${isMiddleSection ? 'text-yellow-500' : ''}`}
                        >
                          {digit}
                        </span>
                      );
                    })
                : null}
            </Typography>
          </div>
        </div>
        <div className="h-5"></div>
        <div className="grid grid-cols-2 gap-2 text-white">
          <div className="rounded-lg border border-tertiary p-2">
            <Typography as="p" className="text-sm font-light">
              My Give Help
            </Typography>
            {/* <Typography as="p" className="font-bold">
              Rural
            </Typography> */}
            <Typography as="p" className="text-lg font-semibold">
              <span className="ml-1 inline-flex items-baseline">
                {convertToInrSymbol(Number(userDetails?.totalSpend || 0))}
              </span>
            </Typography>
          </div>
          <div className="rounded-lg border border-tertiary p-2">
            <Typography as="p" className="text-sm font-light">
              My Receive Help
            </Typography>
            {/* <Typography as="p" className="font-bold">
              Rural
            </Typography> */}
            <Typography as="p" className="text-lg font-semibold">
              <span className="ml-1 inline-flex items-baseline">
                {' '}
                {convertToInrSymbol(Number(userDetails?.totalReceived || 0))}
              </span>
            </Typography>
          </div>
          <div className="rounded-lg border border-tertiary p-2">
            <Typography as="p" className="text-sm font-light">
              PMF + 18 % GST
            </Typography>

            <Typography as="p" className="text-lg font-semibold">
              <span className="ml-1 inline-flex items-baseline">
                {' '}
                ₹
                {(Number(userDetails?.pmf) + Number(userDetails?.tax)).toFixed(
                  2,
                )}
              </span>
            </Typography>
          </div>
          <div className="rounded-lg border border-tertiary p-2">
            <Typography as="p" className="text-sm font-light">
              My Withdrawal
            </Typography>
            <Typography as="p" className="text-lg font-semibold">
              <span className="ml-1 inline-flex items-baseline">
                {convertToInrSymbol(Number(userDetails?.totalWithdrawalAmount))}
              </span>
            </Typography>
          </div>
        </div>
      </div>
      <div className="h-8"></div>
      {/* section 2 */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-x-4">
        {userDetails?.invitedBy && (
          <div>
            <Typography className="font-bold text-white">Invited by</Typography>
            <div className="h-2"></div>
            <div className="rounded-xl bg-[#0119AD] p-2">
              <div className="flex items-center gap-2">
                {userDetails?.invitedBy?.avatar ? (
                  <div className="h-fit w-fit rounded-full border-2 border-green-500 p-1">
                    <img
                      className="h-[40px] w-[40px] rounded-full object-cover"
                      src={`${GlobalVariables.imgURL}${userDetails?.invitedBy?.avatar}`}
                      alt=""
                    />
                  </div>
                ) : (
                  <FaUserCircle fill="white" size={35} />
                )}

                {/* <div className="flex flex-wrap items-center gap-2">
                  <img
                    src="/img/dashboard/badge.png"
                    className="h-[25px] w-[25px]"
                    alt=""
                  />
                  <img
                    src="/img/dashboard/badge.png"
                    className="h-[25px] w-[25px]"
                    alt=""
                  />
                  <img
                    src="/img/dashboard/badge.png"
                    className="h-[25px] w-[25px]"
                    alt=""
                  />
                </div> */}
              </div>
              <div className="h-3"></div>
              <Typography className="text-sm font-light uppercase text-white">
                {userDetails?.invitedBy?.firstName}
              </Typography>
              <div className="h-1"></div>
              <Typography className="text-sm  text-white">
                Consumership Number
              </Typography>
              {/* <div className="h-1"></div> */}
              <Typography className="text-sm uppercase text-white">
                {userDetails?.invitedBy?.username}
              </Typography>
            </div>
          </div>
        )}
        {userDetails?.parent && (
          <div>
            <Typography className="font-bold text-white">
              Enrolled By
            </Typography>

            <div className="h-2"></div>
            <div className="rounded-xl bg-[#0119AD] p-2">
              <div className="flex items-center gap-2">
                {userDetails?.parent?.avatar ? (
                  <div className="h-fit w-fit rounded-full border-2 border-green-500 p-1">
                    <img
                      className="h-[40px] w-[40px] rounded-full object-cover "
                      src={`${GlobalVariables.imgURL}${userDetails?.parent?.avatar}`}
                      alt=""
                    />
                  </div>
                ) : (
                  <FaUserCircle fill="white" size={35} />
                )}

                {/* <div className="flex flex-wrap items-center gap-2">
                  <img
                    src="/img/dashboard/badge.png"
                    className="h-[25px] w-[25px]"
                    alt=""
                  />
                  <img
                    src="/img/dashboard/badge.png"
                    className="h-[25px] w-[25px]"
                    alt=""
                  />
                  <img
                    src="/img/dashboard/badge.png"
                    className="h-[25px] w-[25px]"
                    alt=""
                  />
                </div> */}
              </div>
              <div className="h-3"></div>
              <Typography className="text-sm font-light uppercase text-white">
                {userDetails?.parent?.firstName}
              </Typography>
              <div className="h-1"></div>
              <Typography className="text-sm  text-white">
                Consumership Number
              </Typography>
              {/* <div className="h-1"></div> */}
              <Typography className="text-sm uppercase text-white">
                {userDetails?.parent?.username}
              </Typography>
            </div>
          </div>
        )}

        {/* associates */}
        {associateList?.length >= 0 &&
          associateList?.map((item: any, index: number) => (
            <div key={index}>
              <Typography className="font-bold text-white">
                Associate {index + 1}
              </Typography>
              <div className="h-2"></div>
              <div className="rounded-xl bg-[#0119AD] p-2">
                <div className="flex items-center gap-2">
                  {item?.avatar ? (
                    <div className="h-fit w-fit rounded-full border-2 border-green-500 p-1">
                      <img
                        className="h-[40px] w-[40px] rounded-full object-cover "
                        src={`${GlobalVariables.imgURL}${item?.avatar}`}
                        alt=""
                      />
                    </div>
                  ) : (
                    <FaUserCircle fill="white" size={35} />
                  )}

                  {/* <div className="flex flex-wrap items-center gap-2">
                  <img
                    src="/img/dashboard/badge.png"
                    className="h-[25px] w-[25px]"
                    alt=""
                  />
                  <img
                    src="/img/dashboard/badge.png"
                    className="h-[25px] w-[25px]"
                    alt=""
                  />
                  <img
                    src="/img/dashboard/badge.png"
                    className="h-[25px] w-[25px]"
                    alt=""
                  />
                </div> */}
                </div>
                <div className="h-3"></div>
                <Typography className="text-sm font-light uppercase text-white">
                  {item?.firstName}
                </Typography>
                <div className="h-1"></div>
                <Typography className="text-sm  text-white">
                  Consumership Number
                </Typography>
                {/* <div className="h-1"></div> */}
                <Typography className="text-sm uppercase text-white">
                  {item?.consumerNo}
                </Typography>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DashboardMobileVew;
