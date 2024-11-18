/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
// types/auth.ts

// Language Type
type Language = {
  id: string;
  code: string;
  name: string;
};

interface PersonalInfo {
  avatar?: string;
  id?: string;
  firstName?: string | null | undefined;
  dob?: string;
  careOf?: string;
  contactNumber?: string;
  motherTongue?: Language;
  communicationLanguage?: Language[];
}

interface AddressInfo {
  id: string;
  postalCode: string;
  postOffice: string;
  street: string;
  panchayathName: string | null;
  wardName: string | null;
  stateName: string;
  houseNo: string;
  districtName: string;
}

type InvitedByType = {
  firstName: string;
  lastName: string | null;
  username: string;
  avatar: string;
  id: string;
  totalSpend: number;
  totalReceived: number;
  achievements: any[];
};

type ParentType = {
  firstName?: string;
  totalReceived?: string;
  username?: string;
  avatar?: string;
  lastName?: string;
  totalSpend?: string;
  achievements?: [];
};

type KycProcessType = {
  isBank: boolean;
  isAddress: boolean;
  isPan: boolean;
  isAadhaar: boolean;
  isSelfie: boolean;
};

export type UserDetailsType = {
  id?: string;
  isUnreadNotifications?: boolean;
  totalReceived?: string | null;
  totalSpend?: string;
  totalWithdrawalAmount?: string | number;
  userType?: string;
  isParentAssigned?: boolean;
  paidLevel?: number;
  giveAmount?: number;
  userPlan?: string | number;
  isProcessingFeePaid?: boolean;
  isInitialPmfPaid?: boolean;
  isGiveHelpCompleted?: boolean;
  isKycFilled?: boolean;
  approachIsSelected?: boolean;
  isRegistrationCompleted?: boolean;
  username?: string;
  isPendingPayments?: boolean;
  pmf?: number;
  tax?: number;
  walletBalance?: string;
  registrationTime?: string;
  notifications?: string | null | object | [];
  avatar?: string;
  parent?: ParentType;
  invitedBy?: InvitedByType;
  personal?: PersonalInfo;
  updateReference?: boolean;
  mobile?: string;
  email?: string;
  address?: AddressInfo;
  termsId?: number | string;
  kycCompletion?: KycProcessType;
};
export interface AuthData {
  id?: string;
  token: string | undefined | {};
  userDetails?: UserDetailsType;
}

export interface AuthStoreState {
  isAuthenticated: boolean;
  user: AuthData | null;
  addAuthData: (data: AuthData) => void;
  updateAuthData: (data: Partial<AuthData>) => void;
  updateUserDetails: (data: Partial<AuthData>) => void;
  clearAuthData: () => void;
}
