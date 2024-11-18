import React, { forwardRef } from 'react';
import { Textarea } from '@headlessui/react';
import { cn } from '@/lib/utils';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, wrapperClassName, ...props }, ref) => {
    const wrapperClass =
      wrapperClassName !== undefined ? wrapperClassName : 'mb-4 w-full';
    const textareaClass =
      className ||
      `shadow appearance-none border-2 rounded-lg border-secondary w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`;

    return (
      <div className={cn(wrapperClass)}>
        {label && (
          <label className="mb-4 block text-sm font-bold text-gray-700">
            {label}
          </label>
        )}
        <Textarea ref={ref} className={cn(textareaClass)} {...props} />
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      </div>
    );
  },
);

TextareaComponent.displayName = 'TextareaComponent';

export default TextareaComponent;
