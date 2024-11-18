/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Typography from '../Typography';
import { MdNavigateNext } from 'react-icons/md';
import { GrFormPrevious } from 'react-icons/gr';
import { cn, convertToInrSymbol, localDateConvertion } from '@/lib/utils';

type DashboardTableType = {
  CurrentData: any;
  name: string;
  dateField: string;
  className?: string;
  amountType?: string;
};

const ITEMS_PER_PAGE = 5;
const DashboardTable: React.FC<DashboardTableType> = ({
  CurrentData,
  name,
  dateField,
  className,
  amountType,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(CurrentData?.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const data = CurrentData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex h-80 flex-col gap-6">
        {data?.map((item: any, index: number) => (
          <div key={index} className="flex items-start justify-between gap-4">
            <div>
              <Typography as="h6" className="text-lg font-normal">
                {name}
              </Typography>
              <Typography as="p" className="font-light">
                {/* {dateField === 'createdAt' &&
                  localDateConvertion(item?.createdAt, true)} */}

                {dateField === 'givehelp' &&
                  localDateConvertion(item?.approvedAt, true)}

                {dateField === 'updatedAt' &&
                  localDateConvertion(item?.updatedAt, true)}
                {dateField === 'time' && localDateConvertion(item?.time)}
                {dateField === 'pmf' &&
                  localDateConvertion(
                    item?.approvedAt ? item?.approvedAt : item?.createdAt,
                    true,
                  )}
                {dateField === 'withdrawal' &&
                  localDateConvertion(
                    item?.updatedAt ? item?.updatedAt : item?.createdAt,
                    true,
                  )}
              </Typography>
            </div>
            <div>
              {amountType === 'paid' ? (
                <Typography
                  className={cn(`text-xl font-bold text-tertiary ${className}`)}
                >
                  {convertToInrSymbol(item?.paidAmount)}
                </Typography>
              ) : (
                <Typography
                  className={cn(`text-xl font-bold text-tertiary ${className}`)}
                >
                  {convertToInrSymbol(item?.amount)}
                </Typography>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex h-full w-full items-end justify-end gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-7 w-7  rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
        >
          <GrFormPrevious />
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={
            currentPage === totalPages || data?.length !== ITEMS_PER_PAGE
          }
          className="h-7 w-7 rounded-md bg-white text-[30px] font-bold text-primary disabled:bg-gray-500"
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default DashboardTable;
