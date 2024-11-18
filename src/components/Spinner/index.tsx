import { cn } from '@/lib/utils';
import React from 'react';
import { CgSpinner } from 'react-icons/cg';

const Spinner = ({
  className = '',
  size,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <CgSpinner
      size={size}
      className={cn(`animate-spin text-primary ${className}`)}
    />
  );
};

export default Spinner;
