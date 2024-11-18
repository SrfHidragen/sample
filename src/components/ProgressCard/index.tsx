import React from 'react';
import { GrFormCheckmark } from 'react-icons/gr';

const successIcon =
  'w-10 h-10 rounded-full flex justify-center items-center  font-bold  border-4 border-[#147D03] text-[#147D03]';
const successLabel = 'font-medium text-black';
const inProgressIcon =
  'w-10 h-10 rounded-full flex justify-center items-center  font-bold  border-4 border-[#FFA800] text-[#FFA800]';
const inProgressLabel = 'font-bold  text-[#833D04]';
const notStartedIcon =
  'w-10 h-10  rounded-full flex justify-center items-center  font-bold  border-4 border-[#FF0000] text-[#FF0000]';
const notStartedLabel = 'font-medium text-black';

interface CardTypes {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progressArray: any[];
}

const ProgressIndicatorCard = ({ title, progressArray }: CardTypes) => {
  return (
    <div className=" h-fit w-full max-w-full rounded-3xl bg-[#FDF2DF] px-6 py-6 md:max-w-md lg:px-10 lg:py-6 xl:px-[54px]">
      <h2 className="mb-11 text-2xl font-medium lg:text-3xl xl:text-[32px]">
        {title}
      </h2>
      {/* progress */}
      {progressArray?.map((item, index) => (
        <div className="mt-3" key={item?.id}>
          <div className={'mb-3 flex items-center gap-5'}>
            {/* icon */}
            <div
              className={
                item?.status === 'completed'
                  ? successIcon
                  : item?.status === 'not_started'
                    ? notStartedIcon
                    : inProgressIcon
              }
            >
              {item?.status !== 'not_started' ? (
                <GrFormCheckmark size={'2rem'} className="" />
              ) : (
                <div className="h-2 w-2 rounded-full bg-[#FF0000]"></div>
              )}
            </div>
            {/* label */}
            <p
              className={
                item?.status === 'completed'
                  ? successLabel
                  : item?.status === 'progress'
                    ? inProgressLabel
                    : notStartedLabel
              }
            >
              {item?.label}
            </p>
          </div>
          {progressArray?.length - 1 !== index && (
            <div className="w-10">
              <div className="mx-auto h-2 w-2 rounded-full bg-gray-600"></div>
              <div className="mx-auto h-3 w-[1px]  bg-gray-600"></div>
              <div className="mx-auto h-2 w-2 rounded-full bg-gray-600"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicatorCard;
