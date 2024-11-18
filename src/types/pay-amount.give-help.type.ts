// Define types for receiver's address
type Address = {
  state: string;
  district: string;
  panchayath: string | null;
  ward: string | null;
};

// Define types for receiver's personal information
type PersonalInfo = {
  firstName: string;
};

// Define types for receiver's bank details
type BankDetails = null | {
  upiRegisteredBankName: string;
  upiRegisteredAccountNumber: string;
  upiRegisteredBankBranch: string;
};

// Define types for receiver's information
type ReceiverInfo = {
  username: string;
  upiId: string;
  personal: PersonalInfo;
  address: Address;
  bankDetails: BankDetails;
};

// Define types for payment information
type PaymentInfo = {
  pendingAmount: number;
  totalAmount: number;
  avatar: string;
  receiverInfo: ReceiverInfo;
};

// Define the overall structure returned by the query
type GetReceiverAccountInfo = {
  helpAmount: number;
  approachAmount: number;
  paymentInfo: PaymentInfo[];
};

// Define the structure for the overall query response
export type GetReceiverAccountInfoResponse = {
  getReceiverAccountInfo: GetReceiverAccountInfo;
};
