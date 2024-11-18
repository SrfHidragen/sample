/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { customLocalStorage } from '@/lib/utils';
import { KycStore } from '@/types/kyc.store';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialState = {
  address: {
    careOf: '',
    state: '',
    district: '',
    pin: '',
    house: '',
    street: '',
    postOffice: '',
    panchayathName: '',
    wardName: '',
  },
  isKycFilled: false,
  isSkipPan: false,
  kyc_information: {
    aadhaarVerified: false,
    addressVerified: false,
    panVerified: false,
    bankVerified: false,
    selfiVerified: false,
  },
  kycLevel: '',
  dateOfBirth: '',
  gender: '',
  maskedNumber: '',
  name: '',
  communicationLanguage: [],
  motherTongue: '',
  userProfile: {
    unmaskedPhone: '',
  },
  KycFlow: [
    {
      id: 1,
      label: 'Aadhar',
      pathname: '/dashboard/kyc',
      isVerified: false,
      isShow: true,
      level: 1,
    },
    {
      id: 2,
      label: 'Address',
      pathname: '/dashboard/kyc/address-verification',
      isVerified: false,
      isShow: true,
      level: 2,
    },
    {
      id: 3,
      label: 'Bank',
      pathname: '/dashboard/kyc/kyc-bank-details',
      isVerified: false,
      isShow: true,
      level: 3,
    },
    {
      id: 4,
      label: `Pan`,
      pathname: '/dashboard/kyc/pan-card-kyc',
      isVerified: false,
      isShow: true,
      level: 4,
    },

    {
      id: 5,
      label: 'Selfie',
      pathname: '/dashboard/kyc/IPV-kyc-verification',
      isVerified: false,
      isShow: true,
      level: 5,
    },
    {
      id: 6,
      label: 'Congrats',
      pathname: '/dashboard/kyc/congratulations',
      isVerified: false,
      isShow: false,
      level: 6,
    },
  ],
};
export const useKycStore = create<KycStore>()(
  persist(
    (set) => ({
      kycVerification: initialState,
      setAadharVerification: (verification) =>
        set((state) => ({
          kycVerification: {
            ...state.kycVerification,
            ...verification,
          },
        })),
      updateKYCFlowCompletion: (kycCompletion) =>
        set((state) => {
          const { isAadhaar, isAddress, isBank, isPan, isSelfie } =
            kycCompletion;

          const updateKycFlow = state.kycVerification.KycFlow.map((item) => {
            switch (item?.label) {
              case 'Aadhar':
                return { ...item, isVerified: isAadhaar };
              case 'Address':
                return { ...item, isVerified: isAddress };
              case 'Bank':
                return { ...item, isVerified: isBank };
              case 'Pan':
                return { ...item, isVerified: isPan };
              case 'Selfie':
                return { ...item, isVerified: isSelfie };
              default:
                return item;
            }
          });

          return {
            kycVerification: {
              ...state.kycVerification,
              KycFlow: updateKycFlow,
            },
          };
        }),

      clearAll: () =>
        set({
          kycVerification: initialState,
        }),
    }),
    {
      name: 'kyc-store',
      storage: createJSONStorage(() => customLocalStorage),
    },
  ),
);
