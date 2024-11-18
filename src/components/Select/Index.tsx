import React from 'react';

export interface OptionType {
  id: string;
  name: string;
  label?: string;
}

interface SelectInputProps extends React.ComponentProps<'select'> {
  options: OptionType[];
  placeholder: string;
}

export function SelectInput({
  options,
  placeholder,
  ...props
}: SelectInputProps) {
  return (
    <select
      {...props}
      className={`custom-select focus:shadow-outline h-[54px] w-full appearance-none rounded-lg border-2 border-[#9D9999] p-2 leading-tight shadow placeholder:text-gray-600 focus:outline-none ${props.className || ''} ${props.value == '' && 'text-gray-600'}`}
    >
      <option key={''} value={''} hidden>
        {placeholder}
      </option>
      {options?.map((item) => (
        <option key={item.id} className="custom-option" value={item.name}>
          {item?.label ?? item?.name}
        </option>
      ))}
    </select>
  );
}
