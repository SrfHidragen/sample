'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const inputVariants = cva(['flex', 'w-full', 'border'], {
  variants: {
    variant: {
      default: '',
      primary:
        'focus:shadow-outline h-[54px] w-full appearance-none rounded-lg border-2  p-2 leading-tight shadow focus:outline-none  placeholder:text-gray-600 border-[#9D9999]',
      secondary:
        'focus:shadow-outline h-[54px] w-full appearance-none rounded-lg border-2 border-secondary p-2 leading-tight shadow focus:outline-none  placeholder:text-gray-600',
      tertiary:
        'focus:shadow-outline h-[54px] w-full appearance-none text-white rounded-lg border-2 border-secondary p-2 leading-tight shadow focus:outline-none placeholder:text-white bg-transparent ',
    },
    size: {
      default: '',
      small: '',
      medium: '',
      large: '56px',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface InputProps
  extends Omit<
      React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
      'size'
    >,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode | boolean;
  type: string;
  iconClassnames?: string;
}

const TextField = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      type,
      value = '',

      iconClassnames,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputClassName = cn(inputVariants({ variant, size, className }));

    const handlePasswordShow = () => {
      setShowPassword((prevState) => !prevState);
    };
    return (
      <div className="relative w-full">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          {...props}
          onWheel={(e) => e.currentTarget.blur()}
          ref={ref}
          value={value || ''}
          className={inputClassName}
        />
        {icon && type === 'password' ? (
          <div
            onClick={() => handlePasswordShow()}
            className={cn(
              `absolute inset-y-0 right-0 z-10 mx-4 flex cursor-pointer items-center text-[25px] text-[#9D9999] ${iconClassnames}`,
            )}
          >
            {/* {!showPassword ? (
              <FaRegEye size={'1.5rem'} />
            ) : (
              <FaRegEyeSlash size={'1.5rem'} />
            )} */}
            {!showPassword ? (
              <FaRegEyeSlash size={'1.5rem'} />
            ) : (
              <FaRegEye size={'1.5rem'} />
            )}
          </div>
        ) : icon && type !== 'password' ? (
          <div
            onClick={() => handlePasswordShow()}
            className={cn(
              `absolute inset-y-0 right-0 z-10 flex cursor-pointer items-center px-4 text-[25px] text-[#FFCC01] ${iconClassnames}`,
            )}
          >
            {icon}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  },
);

TextField.displayName = 'Input';

export default TextField;

export { TextField };
