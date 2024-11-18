import React from 'react';
import Typography from './Typography';

interface ApiMessageProps {
  type: 'success' | 'failed';
  message: string;
}

const ApiMessage: React.FC<ApiMessageProps> = ({ type, message }) => {
  return (
    <>
      {type === 'success' ? (
        <div className="mx-auto mt-8 max-w-lg rounded-lg bg-[#A1FF80] p-2 text-center  ">
          <Typography as="p" className="text-center text-sm">
            {message ? message : ' '}
          </Typography>
        </div>
      ) : (
        <div className=" mx-auto mt-8 max-w-lg rounded-lg  bg-red-500 p-2 text-center ">
          <Typography as="p" className="text-center  text-sm text-white">
            {message ? message : ' '}
          </Typography>
        </div>
      )}
    </>
  );
};

export default ApiMessage;
