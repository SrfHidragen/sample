/* eslint-disable no-unused-vars */
'use client';

import React, { useMemo } from 'react';
import PrimaryCard from '@/components/PrimaryCard';
import Typography from '@/components/Typography';
import { Button } from '@/components/Button';
import { FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { ApolloError, useMutation } from '@apollo/client';
import { DELETE_INVITATION } from '@/graphql/mutation/customerfollowup.mutation';
import { localDateConvertion } from '@/lib/utils';
import NoData from '@/components/NoData';
import { useDialogStore } from '@/store/dialog.store';
import EditCustomerFollowup from './EditCustomerFollowup';

type Invitation = {
  id: string;
  customerName: string;
  aadharcardNumber: string;
  mobile: string;
  createdAt: string;
  isActive: boolean;
  isPmfPaid: boolean;
};

const InvitationList = ({
  data,
  handleRemove,
  loading,
  error,
}: {
  data: Invitation[];
  handleRemove: (id: string) => void;
  loading: boolean;
  error: ApolloError | undefined;
}) => {
  const { openDialog } = useDialogStore();

  const onOpenPopup = (data: Invitation, index: number) => {
    openDialog({
      children: <EditCustomerFollowup data={data} />,
      title: `Edit Invitation ${index}`,
      className: 'bg-[#003186] max-w-[400px] p-6',
      titleClass: 'text-white font-medium text-[18px]',
    });
  };
  if (data?.length === 0) return <NoData />;
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((invitation, index) => (
        <PrimaryCard key={invitation.id} className="sm:p-[23.74px]">
          <Typography as="h2" className="text-white">
            {`Invitation ${index + 1}`}
          </Typography>
          <div className="items-center">
            <div className="h-[11.87px]"></div>
            <div className="grid grid-cols-[2fr,1fr,1.5fr] gap-y-3 md:grid-cols-[5.5fr,1fr,1.5fr]">
              <div>
                <Typography
                  as="p"
                  className="text-[18px] font-normal text-white"
                >
                  Customer Name
                </Typography>
              </div>
              <Typography
                as="p"
                className="text-center text-[18px] font-normal text-white"
              >
                :
              </Typography>
              <div>
                <Typography
                  as="p"
                  className="text-[18px] font-normal text-white"
                >
                  {invitation.customerName}
                </Typography>
              </div>
              <div>
                <Typography
                  as="p"
                  className="text-[18px] font-normal text-white"
                >
                  Aadhar Number
                </Typography>
              </div>
              <Typography
                as="p"
                className="text-center text-[18px] font-normal text-white"
              >
                :
              </Typography>
              <div>
                <Typography
                  as="p"
                  className="text-[18px] font-normal text-white"
                >
                  {invitation.aadharcardNumber}
                </Typography>
              </div>
            </div>
            <div className="h-4"></div>
            <div className="flex justify-between gap-2">
              {!invitation?.isPmfPaid && (
                <Button
                  className="text-white"
                  variant={'outline'}
                  type="button"
                  onClick={() => onOpenPopup(invitation, index + 1)}
                  // disabled={invitation.isActive || loading}
                  // loading={loading}
                >
                  Edit
                </Button>
              )}
              {!invitation?.isActive && (
                <Button
                  className={`w-full max-w-full bg-[#FFE9C3] py-3 text-black ${loading || invitation.isActive ? 'cursor-not-allowed' : ''}`}
                  variant={'default'}
                  type="button"
                  onClick={() => handleRemove(invitation.id)}
                  disabled={invitation.isActive || loading}
                  loading={loading}
                >
                  Remove
                </Button>
              )}
            </div>
            {error && <p className="text-red-500">Error: {error.message}</p>}
          </div>
          <div className="h-4"></div>
          <div className="flex justify-between">
            <Typography as="p" className="text-base font-normal text-[#FFAD4E]">
              {localDateConvertion(invitation.createdAt)}
            </Typography>
            <FiClock className="h-[19px] w-[19px] text-[#FFAD4E]" />
          </div>
        </PrimaryCard>
      ))}
    </div>
  );
};

// Define the type for invitation

// Define the type for props
type InvitationCardProps = {
  invitations: Invitation[];
  onRemove: (id: string) => void;
};

const InvitationCard: React.FC<InvitationCardProps> = ({
  invitations,
  onRemove,
}) => {
  const [deleteInvitation, { loading, error }] = useMutation(DELETE_INVITATION);

  const handleRemove = async (id: string) => {
    try {
      await deleteInvitation({ variables: { id } });
      onRemove(id);
      toast.success('Invitation removed successfully');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error removing invitation:', err);
      toast.error('Failed to remove invitation');
    }
  };
  const RegisteredCustomer: Invitation[] = useMemo(
    () => invitations?.filter((item) => item?.isActive),
    [invitations],
  );

  const NonRegisteredCustomer: Invitation[] = useMemo(
    () => invitations?.filter((item) => !item?.isActive),
    [invitations],
  );
  return (
    <>
      <div className="h-8"></div>
      <Typography as="h4" className="text-2xl text-white">
        Invited Customer
      </Typography>
      <div className="h-3"></div>
      <InvitationList
        data={NonRegisteredCustomer}
        loading={loading}
        error={error}
        handleRemove={handleRemove}
      />
      <div className="h-10"></div>
      <Typography as="h4" className="text-2xl text-white">
        Registered Customer
      </Typography>

      <InvitationList
        data={RegisteredCustomer}
        loading={loading}
        error={error}
        handleRemove={handleRemove}
      />
    </>
  );
};

export default InvitationCard;
