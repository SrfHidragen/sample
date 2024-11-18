import Typography from '@/components/Typography';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  const transactionTypes = [
    {
      link: '/dashboard/all-transactions/pmf-history',
      label: 'PMF',
    },
    {
      link: '/dashboard/all-transactions/give-help-history',
      label: 'Give Help',
    },
    {
      link: '/dashboard/all-transactions/top-up-history',
      label: 'Top Up',
    },
    {
      link: '/dashboard/all-transactions/receive-help-history',
      label: 'Receive Help History',
    },
    {
      link: '/dashboard/all-transactions/withdrawal-history',
      label: 'Withdrawal History',
    },
    {
      link: '/dashboard/all-transactions/gst-invoices',
      label: 'GST Invoices',
    },
    {
      link: '/dashboard/all-transactions/processing-fee',
      label: 'Processing Fee',
    },
    {
      link: '/dashboard/all-transactions/buy-account',
      label: 'Buy Account',
    },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {transactionTypes?.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="flex h-[112px] w-[180px] items-center justify-center rounded-lg bg-tertiary p-2 text-center"
        >
          <Typography as="p" className=" text-lg font-medium">
            {item?.label}
          </Typography>
        </Link>
      ))}
    </div>
  );
};

export default Page;
