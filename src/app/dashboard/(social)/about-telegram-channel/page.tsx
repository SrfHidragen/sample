import AboutSocialMediaContent from '@/features/AboutSocialMediaContent';
import React from 'react';

const channelData = {
  type: 'Telegram',
  title: 'Why giveNtake Telegram Channel',
  description:
    'Join our Telegram channel to receive updates and news directly on your phone. Stay connected with us for important updates!',
  channelLists: [
    {
      channelName: 'Telegram Channels',
      link: 'https://t.me/+1SE8xbcSVy01ZDVl',
      icon: '/img/social-media/telegram.png',
      btnTitle: 'Visit Channel',
    },
    // {
    //   channelName: 'giveNtake Hindi Telegram Channels',
    //   link: '',
    //   icon: '/img/social-media/telegram.png',
    // },
    // {
    //   channelName: 'giveNtake English Telegram Channels',
    //   link: '',
    //   icon: '/img/social-media/telegram.png',
    // },
  ],
};

const page = () => {
  return <AboutSocialMediaContent channelData={channelData} />;
};

export default page;
