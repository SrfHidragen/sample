/* eslint-disable react/no-unescaped-entities */
import Typography from '@/components/Typography';
import React from 'react';

function RefundPolicy() {
  return (
    <div className="flex flex-col gap-1 text-base font-normal">
      <Typography as="p">
        At giveNtake.world online helping platform, we are committed to
        providing our users with a transparent and secure platform to give and
        receive financial help directly . While we primarily facilitate the
        direct transfer of financial help for our consumers from other consumers
        without selling physical goods, we understand the importance of having
        clear policies in place, especially regarding the services we charge
        for. This policy outlines the circumstances under which we will issue
        refunds to our users.
      </Typography>

      <Typography className="text-xl font-semibold">
        This refund policy covers the following paid services:
      </Typography>
      <Typography className=" font-semibold">Consumer ID Transfer</Typography>
      <Typography className="font-semibold">Consumer ID Updation</Typography>
      <Typography className="text-xl font-semibold">
        Refund Eligibility
      </Typography>
      <Typography as="p">
        <strong>Incorrect Transactions:</strong>
        If a service fee is charged due to an incorrect transaction initiated by
        our platform's system, the user is eligible for a full refund of the
        service fee charged.
      </Typography>
      <Typography as="p">
        <strong> Service Failure:</strong>
        If a paid service (e.g. ID Updation) is not completed due to a technical
        error or system failure on our part, users are eligible for a full
        refund.
      </Typography>
      <Typography as="p">
        <strong>Cancellation:</strong>
        If a user requests the cancellation of a service (e.g., ID Updation)
        before the service is executed, they may be eligible for a full or
        partial refund depending on the stage of service processing.
      </Typography>
      <Typography className="font-bold">Refund Process</Typography>
      <Typography as="p">
        <strong> 1. Request Submission:</strong>
        Users must submit a refund request through our designated customer
        support channels (Consumer care email ID). The request should include
        the user Consumer ID, transaction details, and a brief explanation of
        the reason for the refund.
      </Typography>

      <Typography as="p">
        <strong>2. Review Period:</strong>
        Refund requests will be reviewed within 7 business days. We may contact
        the user for additional information if necessary.
      </Typography>
      <Typography>
        <strong> 3. Refund Issuance:</strong> Once a refund request is approved,
        the refund will be processed back to the original payment method within
        5-10 business days.
      </Typography>
      <Typography className="font-bold">Exceptions</Typography>
      <Typography as="p">
        No refunds will be provided for services that have been fully delivered
        and used as intended.
      </Typography>
      <Typography as="p">
        Refunds are not available for dissatisfaction with financial help
        amounts between consumers, as these transactions are between consumers,
        and no money goes through giveNtake.world
      </Typography>
      <Typography className="font-bold">Contact Information</Typography>
      <Typography>
        For refund requests or questions regarding our refund policy, please
        contact our customer support team at
        <a href="mailto:consumercare@giventake.world" className="ml-2">
          consumercare@giventake.world
        </a>
        .
      </Typography>
    </div>
  );
}

export default RefundPolicy;
