'use client';
import Typography from '@/components/Typography';
import Link from 'next/link';
import React from 'react';
import { faqData } from '@/lib/constant';
import Accordion from '@/components/Accordion/Index';

const FaqSection = () => {
  return (
    <div className="container pb-10 pt-8 md:pb-20 md:pt-16">
      <div className="mx-auto sm:w-11/12 xl:w-10/12">
        <div className="flex items-center justify-between">
          <div>
            <Typography
              as="h1"
              className="hidden text-[56px] font-medium text-white sm:block"
            >
              FAQ
            </Typography>
          </div>
          <Link
            className="m-0 hidden p-0 text-lg font-medium text-tertiary  sm:block"
            href={'/faq'}
          >
            <Typography as="span" className="!text-[18px]">
              View All
            </Typography>
          </Link>
        </div>
        <Typography className="block text-xl font-bold text-white sm:hidden">
          Frequently Asked Questions
        </Typography>
        <div className="h-4"></div>
        <div className=" flex flex-col gap-4 ">
          {faqData
            ?.slice(0, 5)
            .map((item) => (
              <Accordion
                iconClassNames="md:size-11 fill-white"
                containerClassNames="max-w-full  w-full"
                answer={item?.answer}
                question={item?.question}
                IsImage={item?.image}
                src={item?.src}
                key={item.id}
                bodyClassNames="text-white"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
