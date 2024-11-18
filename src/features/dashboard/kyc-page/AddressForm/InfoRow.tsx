'use client';
import React from 'react';
import Typography from '@/components/Typography';

interface InfoRowProps {
  label?: string;
  value?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <>
      <Typography as="span" className="font-sm text-black">
        {label}
      </Typography>
      <Typography as="span" className="text-center font-normal text-black">
        :
      </Typography>
      <Typography as="span" className="font-sm text-black">
        {value}
      </Typography>
    </>
  );
};

export default InfoRow;
