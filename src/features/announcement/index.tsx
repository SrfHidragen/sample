/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import FilterTab from './FilterTab';
import { useQuery } from '@apollo/client';
import { NOTIFICATIONS_QUERY } from '@/graphql/query/notification.query';
import NoData from '@/components/NoData';
import PageLoading from '@/components/PageLoading';

export type NotificationType = {
  id: string;
  image: string;
  title: string;
  description: string;
  createdAt: string | null;
  isRead: boolean;
};

const Announcement = () => {
  const { data, loading } = useQuery(NOTIFICATIONS_QUERY, {
    fetchPolicy: 'network-only',
  });
  const AllNotificationList: NotificationType[] = data?.allNotifications?.items;

  // if (searchParams?.tb === 'all') {
  //   return (
  //     <>
  //       {AnnouncementList?.map((item) => (
  //         <React.Fragment key={item?.id}>
  //           <FilterTab
  //             name={item?.name}
  //             description={item?.description}
  //             img={item?.img}
  //             date={item?.date}
  //             time={item?.time}
  //             handleData={() => handleRoute(item?.id)}
  //           />
  //         </React.Fragment>
  //       ))}
  //     </>
  //   );
  // }
  // const filterData = AnnouncementList?.filter(
  //   (item) => item?.category === searchParams?.tb,
  // );

  if (loading) return <PageLoading />;
  if (AllNotificationList?.length === 0) return <NoData />;
  return (
    <>
      <div className="flex flex-col gap-6">
        {AllNotificationList?.map((item) => (
          <React.Fragment key={item?.id}>
            <FilterTab data={item} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Announcement;
