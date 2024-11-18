/* eslint-disable no-unused-vars */
type CustomerRegistrationType = {
  phone: string;
  communicationLanguage: string[];
  motherTongue: string;
  isVerified: boolean;
  name: string;
};

type PasswordType = {
  password: string;
};
export interface RegisterStoreType {
  CustomerRegistration: CustomerRegistrationType;
  password?: PasswordType;
  addCustomerData: (
    data: Partial<CustomerRegistrationType>,
    callback?: () => void,
  ) => void;
  clearAll: () => void;
}
