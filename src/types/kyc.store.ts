/* eslint-disable no-unused-vars */
type AadhaarAddressType = {
  careOf?: string;
  country?: string;
  landmark?: string;
  locality?: string;
  postOffice?: string;
  house?: string;
  street?: string;
  state?: string;
  district?: string;
  pin?: string;
  vtc?: string;
  panchayathName?: string | null;
  wardName?: string | null;
};

type AadhaarUserProfileType = {
  unmaskedPhone: string;
};

type KycDetails = {
  aadhaarVerified?: boolean;
  panVerified?: boolean;
  bankVerified?: boolean;
  addressVerified?: boolean;
  selfiVerified?: boolean;
};

interface ProgressArrayType {
  id?: number;
  label?: string;
  pathname?: string;
  level?: number;
  isVerified?: boolean;
  isShow?: boolean;
}

interface AadharVerification {
  address: AadhaarAddressType;
  isSkipPan?: boolean;
  name: string;
  gender: string;
  maskedNumber: string;
  dateOfBirth: string;
  isKycFilled?: boolean;
  kyc_information: KycDetails;
  communicationLanguage?: string[] | undefined;
  motherTongue?: string;
  kycLevel?: string | number;
  userProfile: AadhaarUserProfileType;
  KycFlow: ProgressArrayType[];
}

type kycCompletion = {
  isBank: boolean;
  isAddress: boolean;
  isPan: boolean;
  isAadhaar: boolean;
  isSelfie: boolean;
};

export interface KycStore {
  kycVerification: AadharVerification;
  setAadharVerification: (verification: Partial<AadharVerification>) => void;
  updateKYCFlowCompletion: (kycCompletion: Partial<kycCompletion>) => void;
  clearAll: () => void;
}
