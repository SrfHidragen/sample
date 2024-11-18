import React from 'react';
import Image from '../Image';
import { FaAngleDown } from 'react-icons/fa';
import { GlobalVariables } from '@/lib/constant';

type AvatarType = {
  isImageAvailable?: boolean;
  src?: string;
  user_name?: string;
  isIconShow?: boolean;
};

const Avatar: React.FC<AvatarType> = ({
  isImageAvailable,
  src,
  user_name,
  isIconShow = true,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#94a3b8] ring-2 ring-white duration-200 ">
        {isImageAvailable ? (
          <Image
            src={GlobalVariables.imgURL ? GlobalVariables.imgURL + src : ''}
            alt="img-user"
            className="h-full w-full"
          />
        ) : (
          <span className="text-[20px] font-bold text-white">
            {user_name?.charAt(0)?.toUpperCase()}
          </span>
        )}
      </div>
      {isIconShow && <FaAngleDown size={20} color="white" />}
    </div>
  );
};

export default Avatar;
