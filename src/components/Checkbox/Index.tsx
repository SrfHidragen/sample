import { cn } from '@/lib/utils';
import React from 'react';

type CheckboxProps = {
  id?: string;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  checked?: boolean;
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, className, onChange, value, checked, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          value={value}
          checked={checked}
          id={id}
          onChange={onChange}
          {...props}
          type="checkbox"
          className={cn(
            `] h-5 w-5 flex-shrink-0 rounded-lg border border-[#f1f1f1] text-sm ${className}`,
          )}
        />
      </>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
