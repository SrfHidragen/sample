/* eslint-disable no-irregular-whitespace */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
'use client';
import PrimaryCard from '@/components/PrimaryCard';
import DashboardMainContents from '@/features/dashboard/DashboardMainContents';
import ImportantMessage from '@/features/dashboard/kyc-features/ImportantMessage';
import SocialMediaIcons from '@/features/SocialMediaIcons';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  ASSOCIATE_LIST,
  DASHBOARD_QUERY,
} from '@/graphql/query/dashboard.query';
import DashboardMainPageSkeleton from '@/features/dashboard/DashboardSkeleton/MainPage';
import { useKycStore } from '@/store/kyc.store';
import Typography from '@/components/Typography';
import { useRouter } from 'next/navigation';
import { usePaymentProcess } from '@/store/paymentprocess.store';
import { convertToInrSymbol, encode } from '@/lib/utils';
import { PAYMENT_TYPE } from '@/types/paymentprocess.store.type';
import { useAuthStore } from '@/store/auth.store';
import { defaultId, onLogoutService } from '@/services/onLogoutService';
import { FaUserCircle } from 'react-icons/fa';
import {
  GET_PMF_HISTORY_LIST,
  GIVE_HELP_HISTORY_LIST,
  RECENT_RECEIVE_HELP_LIST,
  WITHDRAWAL_HISTORY,
} from '@/graphql/query/all-history.query';
import { UserPmfList } from '@/types/history-type/pmfhistory.type';
import { GiveHelpHistoryType } from '@/types/history-type/give.help.history.type';
import { RecentReceiveHelpHistory } from '@/types/history-type/recent.receive.help.type';
import { GetWithdrawalHistoryResponse } from './Reports/WithdrawalReport';
import { GlobalVariables } from '@/lib/constant';

type KycInfo = {
  isAadhaar: boolean;
  isAddress: boolean;
  isPan: boolean;
  isBank: boolean;
  isSelfie: boolean;
};
// Function to calculate KYC level
// const calculateKycLevel = (kycInfo: KycInfo) => {
//   console.log({ kycInfo });
//   let currentKycLevel = 0;

//   if (!kycInfo.isAadhaar) {
//     currentKycLevel = 1;
//   } else {
//     return currentKycLevel;
//   }

//   if (!kycInfo.isAddress) {
//     currentKycLevel = 2;
//   } else {
//     return currentKycLevel;
//   }

//   if (!kycInfo.isBank) {
//     currentKycLevel = 3;
//   } else {
//     return currentKycLevel;
//   }

//   if (!kycInfo.isPan) {
//     currentKycLevel = 4;
//   } else {
//     return currentKycLevel;
//   }

//   if (!kycInfo.isSelfie) {
//     currentKycLevel = 5;
//   }
//   console.log({ currentKycLevel });
//   return currentKycLevel;
// };
const calculateKycLevel = (kycInfo: KycInfo) => {
  const kycChecks = [
    { check: kycInfo.isAadhaar, level: 1 },
    { check: kycInfo.isAddress, level: 2 },
    { check: kycInfo.isBank, level: 3 },
    { check: kycInfo.isPan, level: 4 },
    { check: kycInfo.isSelfie, level: 5 },
  ];

  for (const { check, level } of kycChecks) {
    if (!check) {
      return level;
    }
  }

  return 0;
};
const DashboardPage = () => {
  const [termsPolicy, setTermsPolicy] = useState<number | null>(null);
  const [isSessionNull, setIsSessionNull] = useState(false);
  const { user, updateUserDetails } = useAuthStore();
  // const { update } = useSession();

  const userDetails = useMemo(() => user?.userDetails, [user?.userDetails]);
  const addPaymentMethod = usePaymentProcess((state) => state?.AddPaymentInfo);
  const clearPaymentProcess = usePaymentProcess((state) => state?.clearProcess);

  const router = useRouter();
  const paymentId = useId();

  const {
    setAadharVerification,
    kycVerification,
    updateKYCFlowCompletion,
    clearAll,
  } = useKycStore();
  const [loading, setLoading] = useState(true);

  const [getDashboardData, { loading: loadingDashboard }] = useLazyQuery(
    DASHBOARD_QUERY,
    {
      fetchPolicy: 'network-only',
      onCompleted(data) {
        const userDetails = data?.userDetails;
        if (userDetails?.termsId <= 5) {
          router.push('/dashboard/terms-of-service');
        }
        setTermsPolicy(userDetails?.termsId);
        // Update user details

        updateUserDetails(userDetails);
        // KYC verification update
        const kycInfo = userDetails?.kycCompletion;
        const isKycFilled = userDetails?.isKycFilled;
        if (isKycFilled) {
          return clearAll();
        }
        if (!isKycFilled) {
          // if (kycInfo?.isAadhaar) {
          //   console.log(userDetails?.personal?.firstName);
          //   update({ name: userDetails?.personal?.firstName });
          // }
          // if (userDetails?.personal?.avatar) {
          //   update({ image: userDetails?.personal?.avatar });
          // }
          updateKYCFlowCompletion(kycInfo);
          setAadharVerification({
            isKycFilled,
            kyc_information: {
              aadhaarVerified: kycInfo.isAadhaar,
              addressVerified: kycInfo.isAddress,
              panVerified: kycInfo.isPan,
              bankVerified: kycInfo.isBank,
              selfiVerified: kycInfo.isSelfie,
            },
            ...(isKycFilled ? {} : { kycLevel: calculateKycLevel(kycInfo) }),
            dateOfBirth: userDetails?.personal?.dob,
            name: userDetails?.personal?.firstName,
            userProfile: {
              unmaskedPhone: userDetails?.personal?.contactNumber,
            },
            communicationLanguage: userDetails?.personal?.communicationLanguage,
            motherTongue: userDetails?.personal?.motherTongue,
            address: {
              careOf: userDetails?.personal?.careOf,
              district: userDetails?.address?.districtName,
              state: userDetails?.address?.stateName,
              house: userDetails?.address?.houseNo,
              panchayathName: userDetails?.address?.panchayathName,
              wardName: userDetails?.address?.wardName,
              pin: userDetails?.address?.postalCode,
              postOffice: userDetails?.address?.postOffice,
              street: userDetails?.address?.street,
            },
          });
        }
      },
    },
  );
  const [getPmfHistory, { data: pmfHistory }] = useLazyQuery<UserPmfList>(
    GET_PMF_HISTORY_LIST,
    {
      fetchPolicy: 'network-only',
      variables: {
        first: 10,
      },
    },
  );
  const [getReceiveData, { data: receiveHelpHistory }] =
    useLazyQuery<RecentReceiveHelpHistory>(RECENT_RECEIVE_HELP_LIST, {
      fetchPolicy: 'network-only',
      variables: {
        first: 10,
      },
    });
  const [getGiveHelpHistory, { data: giveHelpHistory }] =
    useLazyQuery<GiveHelpHistoryType>(GIVE_HELP_HISTORY_LIST, {
      fetchPolicy: 'network-only',
      variables: {
        first: 10,
      },
    });

  const [getWithdrawalHistory, { data: withdrawalList }] =
    useLazyQuery<GetWithdrawalHistoryResponse>(WITHDRAWAL_HISTORY, {
      fetchPolicy: 'network-only',
      variables: {
        first: 10,
      },
    });
  const [GetAssociates, { data: associateList }] = useLazyQuery(
    ASSOCIATE_LIST,
    {
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  const fetchAllData = useCallback(async () => {
    try {
      if (userDetails?.userType === 'consumer') {
        await Promise.allSettled([
          getPmfHistory(),
          getReceiveData(),
          getGiveHelpHistory(),
          GetAssociates(),
          getWithdrawalHistory(),
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [userDetails?.userType]);
  useEffect(() => {
    if (!isSessionNull) {
      fetchAllData();
    }
  }, [userDetails?.userType, isSessionNull]);

  let isprocessingFeeCompleted = userDetails?.isProcessingFeePaid;
  let isKycFilled = userDetails?.isKycFilled;

  let isPmfpaid = userDetails?.isInitialPmfPaid;

  const IsKycPartiallyCompleted =
    userDetails?.kycCompletion?.isAadhaar &&
    userDetails?.kycCompletion?.isAddress &&
    userDetails?.kycCompletion?.isBank;

  const IsGiveHelpProcess = !!Number(userDetails?.totalSpend) || false;

  useEffect(() => {
    clearPaymentProcess();
    const unsubscribe = onLogoutService.onLogout(defaultId, (alert) => {
      if (alert.isTokenAvailable) {
        setIsSessionNull(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading || loadingDashboard || !termsPolicy)
    return <DashboardMainPageSkeleton />;

  const initialPayment = () => {
    const encode_payment_id = encode(paymentId);
    addPaymentMethod(
      {
        amount: 16.95,
        unique_key: encode_payment_id,
        payment_type: PAYMENT_TYPE.PROCESSING_FEE,
        // payment_description_type: 'processingFee',
        total_amount: 20,
        tax: {
          gst_amount: 3.05,
          gst_percentage: 18,
        },
      },
      () => {
        router.push(
          `/dashboard/payment/about-payment?process=${encode_payment_id}`,
        );
      },
    );
  };

  const initialPmfPayment = () => {
    const PmfPaidId = encode(paymentId);
    addPaymentMethod(
      {
        amount: 100,
        unique_key: PmfPaidId,
        payment_type: PAYMENT_TYPE.INITIAL_PMF_FEE,
        // payment_description_type: 'pmfPayment',
        total_amount: 118,
        tax: {
          gst_amount: 18,
          gst_percentage: 18,
        },
      },
      () => {
        router.push(`/dashboard/payment/about-payment?process=${PmfPaidId}`);
      },
    );
  };

  const navigateKYC = () => {
    let kycPath;
    const KYC_LEVEL = kycVerification.kyc_information;
    const LEVEL = kycVerification.kycLevel;
    if (!kycVerification.isKycFilled) {
      if (LEVEL === 1 && !KYC_LEVEL.aadhaarVerified) {
        kycPath = '/dashboard/kyc';
      }
      if (LEVEL === 2 && !KYC_LEVEL.addressVerified) {
        kycPath = '/dashboard/kyc/address-verification';
      }
      if (LEVEL === 3 && !KYC_LEVEL.bankVerified) {
        kycPath = '/dashboard/kyc/kyc-bank-details';
      }
      if (LEVEL === 4 && !KYC_LEVEL.panVerified) {
        kycPath = '/dashboard/kyc/pan-card-kyc';
      }
      if (LEVEL === 5 && !KYC_LEVEL.selfiVerified) {
        kycPath = '/dashboard/kyc/IPV-kyc-verification';
      }
    } else {
      kycPath = '/dashboard';
    }
    router.push(kycPath || '');
  };

  if (termsPolicy <= 5) {
    router.push('/dashboard/terms-of-service');
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* First Step ==> indirect customer */}
      {/* {userDetails?.userType === 'indirect_customer' &&
        !userDetails?.updateReference &&
        !userDetails?.isProcessingFeePaid && (
          <PrimaryCard>
            <ImportantMessage
              title=""
              description={[
                '1. Please reach out to the consumer who invited you to the giveNtake.world online helping platform for support.',
                "2. If you haven't been invited to the giveNtake.world online helping platform, please connect with a consumer you know or one nearby.",
                "3. If you're not familiar with any consumer, please reach out to giveNtake consumer care department for direct assistance.",
              ]}
              isHiddenLinkorButton={true}
            />
          </PrimaryCard>
        )} */}

      {/* Payment Status */}
      {userDetails?.isPendingPayments && (
        <PrimaryCard>
          <ImportantMessage
            title="Check Your Last Payment Status"
            description="Your recent Payment was pending. Please visit the 'Initiated Payments' page and click on the 'Check Status' button  to view the current status"
            isHiddenLinkorButton={true}
            isLink
            btnTitle="Check Status"
            link="/dashboard/payment/payment-history"
            isWarning={true}
          />
        </PrimaryCard>
      )}

      {/* Second Step ==> 1*/}
      {!isprocessingFeeCompleted && (
        // (userDetails?.userType !== 'indirect_customer' ||
        //   (userDetails?.userType === 'indirect_customer' &&
        //     userDetails?.updateReference))&&
        <PrimaryCard>
          <ImportantMessage
            btnTitle={`Pay ${convertToInrSymbol(20)}`}
            onClickFn={initialPayment}
            title="Consumership verification fee"
          />
        </PrimaryCard>
      )}

      {/* When Update Reference is True */}
      {/* {userDetails?.updateReference &&
        userDetails?.isProcessingFeePaid &&
        userDetails?.isKycFilled && (
          <PrimaryCard>
            <ImportantMessage
              btnTitle={`Update Reference ID`}
              isLink
              title="You must want to update the Reference ID because you do not have a parent"
              link="/dashboard/reference-id-update"
            />
          </PrimaryCard>
        )} */}

      {/*  Step 2*/}
      {!isKycFilled && isprocessingFeeCompleted && (
        <PrimaryCard>
          <ImportantMessage
            btnTitle="Complete Kyc"
            title={
              userDetails?.userType === 'consumer'
                ? 'Please Complete KYC'
                : 'Please complete KYC to upgrade as a Consumer'
            }
            onClickFn={navigateKYC}
          />
        </PrimaryCard>
      )}

      {/*  Step 3*/}
      {!userDetails?.updateReference &&
        IsKycPartiallyCompleted &&
        isprocessingFeeCompleted &&
        !isPmfpaid && (
          <div className="flex flex-col gap-6 xl:flex-row">
            <PrimaryCard className="w-full">
              <ImportantMessage
                btnTitle="Pay Now"
                title="Pay Platform Maintenance Fee (PMF)"
                onClickFn={initialPmfPayment}
              />
            </PrimaryCard>
            {!!userDetails?.invitedBy && (
              <PrimaryCard className="w-full">
                <div className="w-full text-white transition-all duration-300 xl:max-w-full">
                  <Typography as="p" className="text-xl font-normal">
                    Invited by
                  </Typography>
                  <div className="h-4"></div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {userDetails?.invitedBy?.avatar ? (
                        <img
                          className="h-[43px] w-[43px] rounded-full object-cover"
                          src={`${GlobalVariables.imgURL}${userDetails?.invitedBy?.avatar}`}
                          alt="invited_user"
                        />
                      ) : (
                        <FaUserCircle size={43} />
                      )}
                    </div>
                    <div className="">
                      <Typography as="p" className="text-lg font-medium">
                        {userDetails?.invitedBy?.firstName}
                      </Typography>
                      <Typography className="font-light" as="p">
                        Consumership Number
                      </Typography>
                      <Typography as="p" className="text-lg">
                        {userDetails?.invitedBy?.username}
                      </Typography>
                    </div>
                  </div>
                  <div className="h-4"></div>
                  {userDetails?.invitedBy?.achievements &&
                    userDetails?.invitedBy?.achievements?.map(
                      (item: any, index: any) => (
                        <div key={index} className="flex items-center gap-3">
                          <img
                            src="/img/dashboard/badge.png"
                            className=""
                            alt=""
                          />
                          <Typography as="p" className="text-sm">
                            {item?.name}
                          </Typography>
                        </div>
                      ),
                    )}
                </div>
              </PrimaryCard>
            )}
          </div>
        )}

      {/* New Joinee Step 4 */}
      {userDetails?.isProcessingFeePaid &&
        userDetails?.isKycFilled &&
        userDetails?.isInitialPmfPaid &&
        !userDetails?.isRegistrationCompleted &&
        !userDetails?.approachIsSelected && (
          <PrimaryCard className="w-full">
            <ImportantMessage
              btnTitle="Choose Approach"
              title="Choose Your giveNtake Approach"
              isLink
              link={'/dashboard/choose-approach'}
            />
          </PrimaryCard>
        )}

      {/* New Joinee Step 5 */}
      {userDetails?.isProcessingFeePaid &&
        userDetails?.isKycFilled &&
        userDetails?.isInitialPmfPaid &&
        userDetails?.approachIsSelected &&
        !userDetails?.isParentAssigned && (
          <PrimaryCard className="w-full">
            <ImportantMessage
              btnTitle="Add Inviting Associate's Consumership No"
              title="Add Consumership Number of the giveNtake Associate who is inviting you."
              isLink
              link={`/dashboard/update-reference?roll-up=${encode('true')}`}
            />
          </PrimaryCard>
        )}

      {/* New Joinee Step  6*/}
      {userDetails?.isProcessingFeePaid &&
        userDetails?.isKycFilled &&
        userDetails?.isInitialPmfPaid &&
        userDetails?.approachIsSelected &&
        userDetails?.isParentAssigned &&
        !userDetails?.isRegistrationCompleted && (
          <PrimaryCard className="w-full">
            <ImportantMessage
              btnTitle="Complete Give Help"
              title="Your Give Help Not Completed"
              isLink
              link={'/dashboard/choose-approach/approach-about-payment'}
            />
          </PrimaryCard>
        )}

      {isprocessingFeeCompleted &&
        IsKycPartiallyCompleted &&
        isPmfpaid &&
        userDetails?.isRegistrationCompleted &&
        !userDetails?.updateReference &&
        !userDetails?.isGiveHelpCompleted && (
          <PrimaryCard className="w-full">
            <ImportantMessage
              btnTitle="Pay Now"
              title="Pay Give Help"
              isLink
              link={
                IsGiveHelpProcess
                  ? '/dashboard/give-help'
                  : '/dashboard/give-help/give-help-process'
              }
            />
          </PrimaryCard>
        )}
      {userDetails?.userType === 'consumer' &&
        userDetails.isRegistrationCompleted && (
          <>
            <DashboardMainContents
              pmfHistoryData={pmfHistory?.userPmfList.pmfList.edges}
              ReceiveHelpHistoryData={
                receiveHelpHistory?.recentReceiveHelpHistory?.edges
              }
              GiveHelpHistoryData={giveHelpHistory?.giveHelpHistory?.edges}
              withdrawalHistoryData={
                withdrawalList?.getWithdrawalHistory?.edges
              }
              associateList={associateList?.listAssociates}
            />
          </>
        )}
      {(userDetails?.userType !== 'consumer' ||
        !userDetails?.isRegistrationCompleted) && <SocialMediaIcons />}
    </div>
  );
};

export default React.memo(DashboardPage);
