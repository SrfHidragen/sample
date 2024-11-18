import Payment from '@/features/dashboard/payment/Payment';
import PaymentFailed from '@/features/dashboard/payment/payment-fail/PaymentFailed';
import React from 'react';

const page = () => {
  return (
    <div>
      <PaymentFailed />
      <div className="h-6"></div>
      {/* <Payment /> */}
      <Payment status="failed" />
    </div>
  );
};

export default page;
