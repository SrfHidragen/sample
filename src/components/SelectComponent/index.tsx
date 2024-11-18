/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState, forwardRef } from 'react';
import { Combobox } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa6';
import { TiArrowSortedDown } from 'react-icons/ti';
import clsx from 'clsx';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
interface OptionType {
  id: string;
  name: string;
}

interface SelectTypes {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedOption: any;
  // eslint-disable-next-line no-unused-vars
  onChange: (option: OptionType | null) => void;
  options: OptionType[];
  isLoading?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
}

// eslint-disable-next-line react/display-name
const SelectComponent: React.FC<SelectTypes> = forwardRef<
  HTMLInputElement,
  SelectTypes
>(
  (
    {
      selectedOption,
      onChange,
      options,
      isLoading,
      isDisabled,
      placeholder = 'Please choose',
    },
    ref,
  ) => {
    const [query, setQuery] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [filteredOptions, setFilteredOptions] = useState<any>(options);

    useEffect(() => {
      const filteredOptions =
        query === ''
          ? options
          : options.filter((option) =>
              option.name.toLowerCase().includes(query.toLowerCase()),
            );
      setFilteredOptions(filteredOptions);
    }, [query, options]);

    return (
      <div className="relative">
        <Combobox
          // as="div"
          value={selectedOption}
          onChange={(options) => {
            onChange(options);
          }}
          disabled={isDisabled}
          onClose={() => setQuery('')}
          immediate
        >
          <div className="relative">
            <Combobox.Input
              ref={ref}
              className={clsx(
                'h-[54px] w-full rounded-lg border-2 border-[#FFCC01] bg-white py-2 pl-2 pr-8 text-black placeholder:text-gray-600 focus:outline-none disabled:border-gray-300 disabled:placeholder:text-gray-300',
              )}
              displayValue={(option: OptionType) => option?.name || ''}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={placeholder}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2.5">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <TiArrowSortedDown className="h-5 w-5 text-black" />
              )}
            </Combobox.Button>
          </div>
          {filteredOptions?.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredOptions?.map((option: any) => (
                <Combobox.Option
                  key={option.id}
                  value={option}
                  className={({ active, selected }) =>
                    clsx(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-[#FFCC01] text-white' : 'text-gray-900',
                      selected ? 'font-semibold' : '',
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={clsx(
                          'block truncate',
                          selected && 'font-semibold',
                        )}
                      >
                        {option.name}
                      </span>
                      {selected && (
                        <span
                          className={clsx(
                            'absolute inset-y-0 right-0 flex items-center pr-4',
                            active ? 'text-white' : 'text-[#FFCC01]',
                          )}
                        >
                          <FaCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </Combobox>
      </div>
    );
  },
);

export default SelectComponent;
