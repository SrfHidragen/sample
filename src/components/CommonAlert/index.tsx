/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Alert, AlertService, defaultId } from '@/services/alertService';
import { useDialogStore } from '@/store/dialog.store';
import React, { useEffect, useState } from 'react';
import ServerError from '../Error/500';

// const CustomError = ({ message }: { message: string }) => {
//   return (
//     <div className="flex h-80 w-full items-center justify-center">
//       <span className="text-xl text-red-500">{message}</span>
//     </div>
//   );
// };

const CommonAlert: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { openDialog } = useDialogStore();

  useEffect(() => {
    const unsubscribe = AlertService.onAlert(defaultId, (alert) => {
      setAlerts((alerts) => [...alerts, alert]);

      if (alert.autoClose) {
        setTimeout(() => {
          setAlerts((alerts) => alerts.filter((x) => x !== alert));
        }, 3000);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //   const handleDialog = (errorMessage: string) => {
  //     openDialog({
  //       children: <CustomError message={errorMessage} />,
  //     });
  //   };

  useEffect(() => {
    const errorMessage = alerts?.map((item) => item?.message)[0] || '';
    if (errorMessage) {
      openDialog({
        children: <ServerError />,
      });
    }
  }, [alerts]);
  return null;
  // (
  //   <div>
  //     {alerts.map((alert, index) => (
  //       <div key={index} className={`alert alert-${alert.type?.toLowerCase()}`}>
  //         {alert.message}
  //       </div>
  //     ))}
  //   </div>
  // );
};
export default CommonAlert;
