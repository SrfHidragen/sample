import AboutSocialMediaContent from '@/features/AboutSocialMediaContent';
import React from 'react';

const channelData = {
  type: 'Youtube',
  title: 'Why giveNtake Youtube Channel',
  description:
    'Join our Youtube channel to stay updated with the latest videos, tutorials, and live streams on various topics related to giveNtake. Subscribe now!',
  channelLists: [
    {
      channelName: 'Youtube Page',
      link: 'https://www.youtube.com/c/GiventakeBusinessChannel',
      icon: '/img/social-media/youtube.png',
      btnTitle: 'Visit Channel',
    },
  ],
};

const page = () => {
  return <AboutSocialMediaContent channelData={channelData} />;
};

export default page;
