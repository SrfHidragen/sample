'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import Images from '@/components/Image';
import Typography from '@/components/Typography';
import { cn } from '@/lib/utils';
import React from 'react';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { NotificationType } from '.';
import { GlobalVariables } from '@/lib/constant';
import { useRouter } from 'next/navigation';
import { MAKE_NOTIFICATION_VIEWED } from '@/graphql/mutation/notification.mutation';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
function base64EncodeUnicode(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(parseInt(p1, 16));
    }),
  );
}
const FilterTab = ({ data }: { data: NotificationType }) => {
  const [UpdateView] = useMutation(MAKE_NOTIFICATION_VIEWED);
  const router = useRouter();
  const handleNavigation = async (Id: string, value: NotificationType) => {
    try {
      const { data } = await UpdateView({
        variables: {
          notificationId: Id,
        },
      });
      if (data.makeNotificationView.statusCode === 200) {
        router.push(
          `/dashboard/notifications/${Id}?&data=${base64EncodeUnicode(JSON.stringify(value))}`,
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message || 'An error occurred while updating the notification',
      );
    }
  };
  return (
    <div
      onClick={() => handleNavigation(data.id, data)}
      // href={`/dashboard/notifications/${data?.id}?&data=${base64EncodeUnicode(JSON.stringify(data))}`}
      // href={{
      //   pathname: `/dashboard/notifications/${data?.id}`,
      //   query: encodeURI(da)),
      // }}
    >
      <div
        className={
          data?.isRead
            ? 'w-full cursor-pointer overflow-hidden rounded-lg bg-[#283795]'
            : 'w-full cursor-pointer overflow-hidden rounded-lg border-[4px] border-[#001BC2] bg-[#011487]'
        }
      >
        <div
          className={cn(
            `flex flex-col-reverse items-center justify-center gap-4 bg-gradient-to-br  from-[#0018AB] to-[#011487] px-4 py-4 md:flex-row md:justify-between md:gap-0 md:py-2`,
          )}
        >
          <div className="flex w-full flex-col md:w-fit">
            <div>
              <Typography as="h2" className="capitalize text-white">
                {data?.title}
              </Typography>
              <Typography className="text-white">
                {data?.description}
              </Typography>
            </div>
            <div className="mt-4 flex h-8 w-8 cursor-pointer items-center justify-center self-end rounded-full bg-tertiary shadow-xl md:self-auto">
              <MdOutlineKeyboardArrowRight size={20} />
            </div>
          </div>
          <div>
            {data?.image ? (
              <Images
                src={GlobalVariables.imgURL + data?.image}
                className={
                  data?.image
                    ? 'h-[129px] w-[129px] rounded-[20px] border-4 border-tertiary '
                    : 'h-[129px] w-[129px] rounded-[20px] border-4 border-tertiary opacity-90'
                }
                alt="img-icon"
              />
            ) : (
              <div className="relative h-[129px]  w-[129px] overflow-hidden rounded-[20px] ">
                <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/20 text-center font-bold text-black ">
                  Image <br /> Not Found
                </div>
                <div
                  className={
                    'absolute left-0 top-0 h-full w-full  overflow-hidden rounded-[20px] border-4 border-tertiary opacity-90'
                  }
                >
                  <Images
                    className="h-full w-full"
                    src={'/img/image-placeholder.webp'}
                    alt="img-icon"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTab;
