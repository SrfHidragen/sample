import { RegisterStoreType } from '@/types/register.store.type';
import { create } from 'zustand';

export const useSignUpStore = create<RegisterStoreType>((set) => ({
  CustomerRegistration: {
    communicationLanguage: [],
    isVerified: false,
    motherTongue: '',
    phone: '',
    name: '',
  },
  password: {
    password: '',
  },
  addCustomerData(data, callback) {
    set((state) => {
      const resp = {
        CustomerRegistration: {
          ...state?.CustomerRegistration,
          ...data,
        },
      };
      if (callback) callback();
      return resp;
    });
  },
  clearAll() {
    set({
      CustomerRegistration: {
        communicationLanguage: [],
        isVerified: false,
        motherTongue: '',
        phone: '',
        name: '',
      },
      password: {
        password: '',
      },
    });
  },
}));
