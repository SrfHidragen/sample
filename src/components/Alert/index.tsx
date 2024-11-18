import React from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';

interface AlertType {
  type: 'success' | 'error' | 'warning';
  message: string;
}

function Alert({ type, message }: AlertType) {
  const baseClasses = 'flex justify-between items-center rounded p-2';
  const successClasses = 'bg-green-100 text-green-700 border-green-400';
  const errorClasses = 'bg-red-100 text-red-700 border-red-400';
  const warningClasses = 'bg-yellow-100 text-yellow-700 border-yellow-400';

  let alertClasses = baseClasses;
  let Icon: IconType = FaExclamationCircle; // default icon

  switch (type) {
    case 'success':
      alertClasses += ` ${successClasses}`;
      Icon = FaCheckCircle;
      break;
    case 'error':
      alertClasses += ` ${errorClasses}`;
      Icon = FaTimesCircle;
      break;
    case 'warning':
      alertClasses += ` ${warningClasses}`;
      Icon = FaExclamationCircle;
      break;
    default:
      break;
  }

  return (
    type &&
    message && (
      <div className={alertClasses} role="alert">
        <div className="flex items-baseline gap-2 text-base">
          <Icon className="text-base" />
          {message}
        </div>
      </div>
    )
  );
}

export default Alert;
