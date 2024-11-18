import Payment from '@/features/dashboard/payment/Payment';
import PaymentStatus from '@/features/dashboard/payment/PaymentStatus';
import React from 'react';

const page = () => {
  return (
    <div>
      <PaymentStatus status="cancel" />
      <div className="h-6"></div>
      {/* <Payment /> */}
      <Payment status="cancel" />
    </div>
  );
};

export default page;
