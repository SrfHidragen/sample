import React from 'react';
import Image from '../Image';
import Typography from '../Typography';
import { cn } from '@/lib/utils';

type NoDataType = {
  Error?: string;
  className?: string;
};
const NoData: React.FC<NoDataType> = ({ Error, className }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <Image src="/img/empty-file.svg" alt="empty-file" />
      <Typography
        className={cn(`text-base font-semibold text-white ${className}`)}
      >
        {Error || 'No Data'}
      </Typography>
    </div>
  );
};

export default NoData;
