import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Spinner from '@/components/Spinner';

// Define button variants
const buttonVariants = cva('disabled:hover:shadow-none', {
  variants: {
    variant: {
      default:
        'text-center align-center bg-secondary font-semibold rounded-lg hover:bg-yellow-500 hover:shadow-2xl duration-300 hover:text-black',
      outline:
        'font-roboto rounded-2xl border-2 border-tertiary px-6 py-[10px] text-[15px] font-semibold leading-[15px] text-black hover:shadow-2xl duration-300',
      secondary:
        'font-roboto rounded-lg bg-tertiary px-6 py-[10px] text-[16px] font-semibold leading-[15px] text-black hover:bg-yellow-500 hover:shadow-2xl duration-300 hover:text-black',
      tertiary:
        'font-roboto rounded-2xl bg-[#906D00] px-5 py-[10px] text-[13px] font-semibold leading-[15px] text-black hover:bg-yellow-500 hover:shadow-2xl duration-300 hover:text-black',
      ghost:
        'hover:bg-yellow-500 hover:shadow-2xl duration-300 hover:text-black',
      link: '',
    },
    size: {
      default: 'h-[48px] w-full',
      sm: '',
      xsm: '',
      lg: 'h-[56px] w-full',
      icon: '',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

// Button component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          relative: loading,
        })}
        ref={ref}
        {...props}
      >
        {loading ? (
          <div className="flex w-full justify-center">
            <Spinner />
          </div>
        ) : (
          props.children
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
