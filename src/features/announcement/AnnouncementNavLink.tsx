'use client';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface TabsListType {
  id: string | number;
  name: string;
  label: string;
}

const TabsData: TabsListType[] = [
  { id: 1, name: 'all', label: 'All' },
  { id: 2, name: 'meetings', label: 'Meetings' },
  { id: 3, name: 'app_updates', label: 'App Updates' },
  { id: 4, name: 'promotions', label: 'Promotions' },
  { id: 5, name: 'warnings', label: 'Warnings' },
  { id: 6, name: 'announcement', label: 'Announcement' },
];
const AnnouncementNavLink = () => {
  const route = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  const handleRoutes = (value: string) => {
    setActiveTab(value);
    route.push(`/dashboard/announcement?tb=${value}`);
  };
  return (
    <>
      <div className="flex justify-between gap-2 p-3">
        {TabsData?.map((item) => (
          <React.Fragment key={item?.id}>
            <button
              className={cn(
                `font-roboto flex-1 rounded-lg px-4 py-2 text-center text-[14px] font-normal ${activeTab === item?.name ? 'bg-[#FFCC01]' : 'bg-[#F5DAA1]'}`,
              )}
              onClick={() => handleRoutes(item?.name)}
            >
              {item?.label}
            </button>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default AnnouncementNavLink;
