/* eslint-disable no-unused-vars */
'use client';

import * as React from 'react';
import { FaSortDown } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';

type OptionType = {
  id?: string;
  lid?: string[];
  name?: string;
  code?: string;
  number?: string | undefined;
};

interface ComboboxType {
  Options: OptionType[];
  onChange: (option: OptionType | null) => void;
  SelectedOption: OptionType | null;
  isLoading?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
}

export const Combobox = React.forwardRef<HTMLDivElement, ComboboxType>(
  (
    {
      Options,
      onChange,
      SelectedOption,
      isLoading,
      placeholder = 'Select an option...',
      isDisabled,
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="relative" ref={ref}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="flex h-[54px] items-center justify-between rounded-lg border-gray-400 bg-white text-[15px] font-normal text-black hover:bg-white  focus:outline-none disabled:border-gray-300 disabled:bg-transparent"
              disabled={isDisabled}
            >
              {SelectedOption?.number
                ? `${SelectedOption?.name} / ${SelectedOption?.number}` ||
                  placeholder
                : SelectedOption?.name || placeholder}
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <FaSortDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </PopoverTrigger>
          {/* <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] overflow-y-auto bg-white"> */}
          <PopoverContent className="scrollbar-hide max-h-[260px] w-[--radix-popover-trigger-width] overflow-y-auto bg-white">
            <Command>
              <CommandInput placeholder="Search ..." />
              <CommandList>
                <CommandEmpty>No Item found.</CommandEmpty>
                <CommandGroup className="min-w-full">
                  {Options?.map((option) => (
                    <CommandItem
                      key={option.id}
                      value={option.name}
                      onSelect={() => {
                        onChange(option);
                        setOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      <FaCheck
                        className={cn(
                          'mr-2 h-4 w-4',
                          SelectedOption?.id === option.id
                            ? 'text-green-700 opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {option?.number
                        ? `${option?.name} / ${option?.number}` || placeholder
                        : option?.name || placeholder}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

Combobox.displayName = 'Combobox';
