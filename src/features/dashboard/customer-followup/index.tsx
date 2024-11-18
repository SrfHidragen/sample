'use client';
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import FollowUp from '@/features/dashboard/customer-followup/CustomerFollowup';
import InvitationCard from '@/features/dashboard/customer-followup/CustomerFollowupCard';
import { GET_MY_INVITATIONS } from '@/graphql/query/customerfollowup.query';
import PageLoading from '@/components/PageLoading';
import withConsumer from '@/helper/withConsumer';

type MyInvitationsType = {
  id: string;
  customerName: string;
  aadharcardNumber: string;
  isActive: boolean;
  createdAt: string;
  mobile: string;
  isPmfPaid: boolean;
};
const CustomerFollowup = () => {
  const [invitations, setInvitations] = useState<MyInvitationsType[]>([]);

  const { loading, data, refetch } = useQuery(GET_MY_INVITATIONS, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setInvitations(data?.myInvitations);
    },
  });

  useEffect(() => {
    if (data?.myInvitations) {
      setInvitations(data.myInvitations);
    }
  }, [data]);

  const handleRemove = (id: string) => {
    setInvitations((prevInvitations) =>
      prevInvitations.filter(
        (invitation: MyInvitationsType) => invitation.id !== id,
      ),
    );
  };

  return (
    <>
      <div>
        <FollowUp refetch={refetch} />
        {loading ? (
          <PageLoading />
        ) : (
          <InvitationCard invitations={invitations} onRemove={handleRemove} />
        )}
      </div>
    </>
  );
};

export default withConsumer(CustomerFollowup);
