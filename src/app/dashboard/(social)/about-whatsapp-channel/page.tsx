import AboutSocialMediaContent from '@/features/AboutSocialMediaContent';
import React from 'react';

const channelData = {
  type: 'Whatsapp',
  title: 'Why giveNtake Whatsapp channel',
  description:
    ' Join our Whatsapp channel to receive updates and news directly to your phone. Stay connected with us for important updates!',
  channelLists: [
    {
      channelName: 'Whatsapp Channels',
      link: 'https://whatsapp.com/channel/0029Va54jAR3gvWfHnL9RZ0d',
      icon: '/img/social-media/whatsapp.png',
      btnTitle: 'Visit Channel',
    },
  ],
};

const page = () => {
  return <AboutSocialMediaContent channelData={channelData} />;
};

export default page;
