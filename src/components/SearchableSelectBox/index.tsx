/* eslint-disable no-unused-vars */
import React, { useState, useEffect, forwardRef } from 'react';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';
import { cn } from '@/lib/utils';

interface optionType {
  id: string | number | null;
  name: string;
}

interface SearchableArrayTypes {
  options: optionType[];
  selected: optionType | null;
  setSelected: (option: optionType | null) => void;
  classNames?: string;
  IconClassName?: string;
  placeholder?: string;
}

const SearchableSelectBox = forwardRef<HTMLInputElement, SearchableArrayTypes>(
  (
    {
      options,
      selected,
      setSelected,
      classNames,
      placeholder,
      IconClassName,
      ...props
    },
    ref,
  ) => {
    const [query, setQuery] = useState('');

    const filteredOptions =
      query === ''
        ? options
        : options.filter((option) =>
            option?.name.toLowerCase().includes(query.toLowerCase()),
          );

    useEffect(() => {
      if (selected) {
        setQuery(selected?.name);
      }
    }, [selected]);

    return (
      <div className="relative">
        <Combobox
          value={selected}
          onChange={(value: optionType | null) => {
            setSelected(value);
            setQuery(''); // Reset query to enable typing after selection
          }}
        >
          <div className="relative">
            <ComboboxInput
              {...props}
              ref={ref}
              placeholder={placeholder ? placeholder : ''}
              className={cn(
                `focus:shadow-outline h-full w-full appearance-none rounded-lg border-2 border-secondary bg-white p-2 leading-tight text-black shadow focus:outline-none ${classNames}`,
              )}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              <MdOutlineKeyboardArrowDown
                className={cn(
                  `size-4 fill-black/60 group-hover:fill-black ${IconClassName}`,
                )}
              />
            </ComboboxButton>
          </div>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ComboboxOptions className="absolute top-14 z-10 w-full rounded-xl border border-white bg-primary p-1">
              {filteredOptions?.map((option, index) => (
                <ComboboxOption
                  key={index}
                  value={option}
                  className={({ active }) =>
                    `group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 ${
                      active ? 'bg-secondary text-white' : 'text-white'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <IoMdCheckmark
                        className={`size-4 fill-white ${
                          selected ? 'visible' : 'invisible'
                        }`}
                      />
                      <div className="text-sm/6">{option?.name}</div>
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </Transition>
        </Combobox>
      </div>
    );
  },
);

SearchableSelectBox.displayName = 'SearchableSelectBox';

export default SearchableSelectBox;
