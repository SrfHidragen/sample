'use client';
import React from 'react';
import GiveHelpProgress from './GiveHelpProgress';
import GiveHelpHistory from './GiveHelpHistory';
import withConsumer from '@/helper/withConsumer';

function GiveHelp() {
  return (
    <>
      <div>
        <GiveHelpProgress />
        <GiveHelpHistory />
      </div>
    </>
  );
}

export default withConsumer(GiveHelp);
