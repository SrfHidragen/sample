import AboutSocialMediaContent from '@/features/AboutSocialMediaContent';
import React from 'react';

const channelData = {
  type: 'Instagram',
  title: 'Why giveNtake Instagram Page',
  description:
    'Follow our Instagram page to stay updated with the latest posts, stories and reels . Join us to engage with the community!',
  channelLists: [
    {
      channelName: 'Instagram Page',
      link: 'https://www.instagram.com/giventakeworld/',
      icon: '/img/social-media/instagram.png',
      btnTitle: 'Visit Page',
    },
  ],
};

const page = () => {
  return <AboutSocialMediaContent channelData={channelData} />;
};

export default page;
