import React from 'react';
import { cn } from '@/lib/utils';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';

import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import Typography from '../Typography';
import Image from '../Image';

interface AccorionProps {
  question: string | undefined;
  answer: string;
  containerClassNames?: string;
  headerClassNames?: string;
  bodyClassNames?: string;
  iconClassNames?: string;
  defaultOpen?: boolean;
  IsImage?: boolean;
  src?: string;
}

export default function Accordion({
  answer,
  question,
  containerClassNames,
  headerClassNames,
  bodyClassNames,
  iconClassNames,
  IsImage = false,
  src = '',
  defaultOpen = false,
}: AccorionProps) {
  return (
    <Disclosure
      as="div"
      className={cn(
        `w-full max-w-xl overflow-hidden  border-b border-white/40 ${containerClassNames}`,
      )}
      defaultOpen={defaultOpen}
    >
      <DisclosureButton
        className={cn(
          `group flex w-full items-center justify-between py-6 font-semibold text-white ${headerClassNames}`,
        )}
      >
        <span className="mr-auto w-11/12 text-left">{question}</span>
        <MdOutlineKeyboardArrowDown
          className={cn(
            `size-5 flex-shrink-0 fill-white/60 group-data-[open]:rotate-180 group-data-[hover]:fill-white/50 ${iconClassNames}`,
          )}
        />
      </DisclosureButton>
      <DisclosurePanel className={cn(`bg-white/10 p-6 ${bodyClassNames}`)}>
        {IsImage ? (
          <Image src={src} alt="faq-img" />
        ) : typeof answer === 'string' ? (
          answer?.split('\n').map((line: string, index: number) => (
            <React.Fragment key={index}>
              <Typography as="p"> {line}</Typography>
              <div className="h-1"></div>
            </React.Fragment>
          ))
        ) : (
          answer
        )}
      </DisclosurePanel>
    </Disclosure>
  );
}
