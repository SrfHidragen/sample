import React from 'react';
import Typography from '../Typography';

const ServerError = () => {
  return (
    <div className="container h-full w-full rounded-sm bg-white">
      <div className="flex flex-col items-center justify-center p-6">
        <div className="flex gap-3">
          <Typography as="h2" className="text-7xl font-bold">
            500
          </Typography>
          <Typography as="h2" className="text-7xl font-bold text-red-600">
            Server Error
          </Typography>
        </div>
        <Typography as="p" className="text-2xl">
          {' '}
          Oops, Something went wrong !
        </Typography>
      </div>
    </div>
  );
};

export default ServerError;
