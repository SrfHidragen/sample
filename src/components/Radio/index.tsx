/* eslint-disable no-unused-vars */
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Radio, RadioGroup } from '@headlessui/react';

export interface selectedGroup {
  id: number;
  label: string;
  value: string;
}

interface RadioGroupTypes {
  groups: selectedGroup[];
  LabelClassName?: string;
  selected: selectedGroup | null;
  setSelected: (value: selectedGroup) => void;
  divClassName?: string;
  className?: string;
}

const RadioGroupComponent = forwardRef<HTMLDivElement, RadioGroupTypes>(
  (
    {
      groups,
      LabelClassName,
      selected,
      setSelected,
      divClassName,
      className = 'space-y-2',
    },
    ref,
  ) => {
    return (
      <div className={cn(`w-full ${divClassName}`)} ref={ref}>
        <RadioGroup
          value={selected}
          onChange={setSelected}
          aria-label="Server size"
          className={cn(`space-y-2 ${className}`)}
        >
          {groups?.map((group) => (
            <Radio
              key={group.id}
              value={group}
              className="group relative flex cursor-pointer gap-4"
            >
              <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full border-[2px] border-black p-1">
                <div className="h-full w-full rounded-full  bg-transparent group-data-[checked]:bg-gray-900"></div>
              </div>
              <p className={cn(`capitalize text-white ${LabelClassName}`)}>
                {group?.label}
              </p>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    );
  },
);

RadioGroupComponent.displayName === 'Radio';

export default RadioGroupComponent;

export { RadioGroupComponent };

// /* eslint-disable no-unused-vars */
// import React, { forwardRef } from 'react';
// import { cn } from '@/lib/utils';
// import { Field, Radio, RadioGroup } from '@headlessui/react';

// export interface selectedGroup {
//   id: number;
//   label: string;
//   value: string;
// }

// export interface RadioGroupTypes {
//   groups: selectedGroup[];
//   LabelClassName?: string;
//   selected: selectedGroup | null | string;
//   setSelected: (value: selectedGroup) => void;
//   divClassName?: string;
//   groupContanerClassNames?: string;
// }

// const RadioGroupComponent = forwardRef<HTMLDivElement, RadioGroupTypes>(
//   (
//     {
//       groups,
//       LabelClassName,
//       selected,
//       setSelected,
//       divClassName,
//       groupContanerClassNames,
//     },
//     ref,
//   ) => {
//     return (
//       <div className={cn(`w-full ${divClassName}`)} ref={ref}>
//         <RadioGroup
//           value={selected}
//           onChange={setSelected}
//           aria-label="Server size"
//           className={cn(`space-y-2 ${groupContanerClassNames}`)}
//         >
//           {groups?.map((group) => (
//             <Field key={group.id}>
//               <Radio
//                 value={group}
//                 className="group relative flex cursor-pointer gap-4"
//               >
//                 <div className="h-6 w-6 overflow-hidden rounded-full border-[3px] border-[#FFCC01] p-[3px]">
//                   <div className="h-full w-full rounded-full  bg-transparent group-data-[checked]:bg-secondary"></div>
//                 </div>
//                 <p className={`capitalize text-white ${LabelClassName}`}>
//                   {group?.label}
//                 </p>
//               </Radio>
//             </Field>
//           ))}
//         </RadioGroup>
//       </div>
//     );
//   },
// );

// RadioGroupComponent.displayName === 'Radio';

// export default RadioGroupComponent;

// export { RadioGroupComponent };
