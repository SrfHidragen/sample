/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Combobox } from '@headlessui/react';
import clsx from 'clsx';

interface OptionType {
  id: string;
  name: string | number | any;
  label?: string;
}

interface SelectTypes {
  selectedOption: OptionType | OptionType[] | null;
  // eslint-disable-next-line no-unused-vars
  onChange: (option: OptionType | OptionType[] | null) => void;
  options: OptionType[];
  isLoading?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  isMultiple?: boolean;
}

const ComboBoxInput: React.FC<SelectTypes> = ({
  selectedOption,
  onChange,
  options,
  isMultiple,
  isDisabled,
  placeholder = 'Please choose',
}) => {
  const [query, setQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<OptionType[]>(options);

  useEffect(() => {
    const filteredOptions =
      query === ''
        ? options
        : options?.filter((option) =>
            String(option?.name)?.toLowerCase()?.includes(query?.toLowerCase()),
          );
    setFilteredOptions(filteredOptions);
  }, [query, options]);

  const handleChange = (selected: OptionType | OptionType[]) => {
    if (isMultiple) {
      onChange(selected as OptionType[]);
    } else {
      onChange(selected as OptionType);
    }
  };

  return (
    <div className="relative">
      <Combobox
        value={selectedOption}
        onChange={handleChange}
        multiple={isMultiple}
        disabled={isDisabled}
        immediate
        as="div"
      >
        <div className="relative">
          <Combobox.Input
            className={clsx(
              'h-[54px] w-full rounded-lg border-2 border-[#9D9999] bg-white py-2 pl-2 pr-8 text-black placeholder:text-gray-600 focus:outline-none',
            )}
            displayValue={(selected: OptionType | OptionType[]) => {
              if (isMultiple && Array.isArray(selected)) {
                return selected
                  .map((s) => (s?.label ? s?.label : String(s?.name)))
                  .join(', ');
              }
              return String((selected as OptionType)?.name) || '';
            }}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2.5">
            {/* <ChevronDownIcon className="h-5 w-5 text-black" /> */}
          </Combobox.Button>
        </div>
        {filteredOptions?.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions?.map((option: OptionType) => (
              <Combobox.Option
                key={option.id}
                value={option}
                className={({ active, selected }) =>
                  clsx(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-blue-500 text-white' : 'text-gray-900',
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
                      {option?.label ?? option?.name}
                    </span>
                    {selected && (
                      <span
                        className={clsx(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-blue-500',
                        )}
                      >
                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
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
};

export default ComboBoxInput;
