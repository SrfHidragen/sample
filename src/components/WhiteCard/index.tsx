import { cn } from '@/lib/utils';
import React from 'react';

const WhiteCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`rounded-lg bg-white p-4 md:p-8 ${className}`)}>
      {children}
    </div>
  );
};

export default WhiteCard;
