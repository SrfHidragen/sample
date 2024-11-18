import Typography from '@/components/Typography';
import Link from 'next/link';
import React from 'react';

const SocialMediaIcons = () => {
  const socialMediaArray = [
    {
      id: 1,
      label: 'Telegram Channel',
      icon: '/img/social-media/telegram.png',
      link: '/dashboard/about-telegram-channel',
    },
    {
      id: 2,
      label: 'Youtube Channel',
      icon: '/img/social-media/youtube.png',
      link: '/dashboard/about-youtube-channel',
    },
    {
      id: 3,
      label: 'Instagram Page',
      icon: '/img/social-media/instagram.png',
      link: '/dashboard/about-instagram-page',
    },
    {
      id: 4,
      label: 'Whatsapp Channel',
      icon: '/img/social-media/whatsapp.png',
      link: '/dashboard/about-whatsapp-channel',
    },
    {
      id: 5,
      label: 'facebook Page',
      icon: '/img/social-media/facebook.png',
      link: '/dashboard/about-facebook-page',
    },
    {
      id: 6,
      label: 'Zoom Meeting',
      icon: '/img/social-media/zoom.png',
      link: '/dashboard/about-zoom-meeting',
    },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {socialMediaArray?.map((item) => (
        <Link
          className="flex max-w-[90px] flex-col items-center gap-4"
          key={item?.id}
          href={item?.link}
        >
          <img className="h-16 w-16" src={item?.icon} alt={item?.label} />
          <Typography className="text-center text-white" as="p">
            {item?.label}
          </Typography>
        </Link>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
