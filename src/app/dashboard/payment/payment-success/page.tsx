import Payment from '@/features/dashboard/payment/Payment';
import PaymentSuccessful from '@/features/dashboard/payment/payment-success/PaymentSuccessful';
import React from 'react';

const page = () => {
  return (
    <div>
      <PaymentSuccessful />
      <div className="h-6"></div>
      <Payment status="success" />
    </div>
  );
};

export default page;
