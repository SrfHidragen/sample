import AboutSocialMediaContent from '@/features/AboutSocialMediaContent';
import React from 'react';

const channelData = {
  type: 'Facebook',
  title: 'Why giveNtake Facebook Page',
  description:
    'Join our Facebook groups to participate in discussions, ask questions, and engage with other community members. Be a part of the conversation!',
  channelLists: [
    {
      channelName: 'Facebook Group',
      link: 'https://www.facebook.com/groups/giventake.world',
      icon: '/img/social-media/facebook.png',
      btnTitle: 'Visit Group',
    },
    {
      channelName: 'Facebook Page',
      link: 'https://www.facebook.com/giventakeworld',
      icon: '/img/social-media/facebook.png',
      btnTitle: 'Visit Page',
    },
  ],
};

const page = () => {
  return <AboutSocialMediaContent channelData={channelData} />;
};

export default page;
