import React from 'react';
import { cn } from '@/lib/utils';

const PrimaryCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`rounded-lg bg-secondary p-4 sm:p-8`, className)}>
      {children}
    </div>
  );
};

export default PrimaryCard;
