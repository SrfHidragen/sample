import { cn } from '@/lib/utils';
import React from 'react';

const GradientCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(`h-fit w-fit rounded-2xl bg-[#00117A] p-8 ${className}`)}
    >
      {children}
    </div>
  );
};

export default GradientCard;
