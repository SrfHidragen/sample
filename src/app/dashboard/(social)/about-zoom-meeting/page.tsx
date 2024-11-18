import AboutSocialMediaContent from '@/features/AboutSocialMediaContent';
import React from 'react';

const channelData = {
  type: 'Zoom',
  title: 'Why giveNtake Zoom',
  description:
    'Join our Zoom meetings for in-depth discussions, webinars, and live Q&A sessions. Stay engaged with our community!',
  channelLists: [
    {
      channelName: 'Zoom',
      link: 'https://giventake-world.zoom.us/my/training.gnt?pwd=QjFmYjBhWVMxL0cxcy9VVDdGYVNyZz09',
      icon: '/img/social-media/zoom.png',
      btnTitle: 'Click to join',
    },
  ],
};

const page = () => {
  return <AboutSocialMediaContent channelData={channelData} />;
};

export default page;
