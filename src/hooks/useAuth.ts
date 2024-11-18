/* eslint-disable no-unsafe-optional-chaining */
import { AuthAction, AuthActionType } from '@/actions/auth.action';
import {
  LOGIN_MUTATION,
  REGISTER_SUBMIT,
} from '@/graphql/mutation/auth.mutation';
import { LoginFormSchema } from '@/schema/auth.schema';
import { useAuthStore } from '@/store/auth.store';
import { useKycStore } from '@/store/kyc.store';
import { useMutation } from '@apollo/client';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as z from 'zod';

interface SignupFormDataType {
  phone: string;
  communicationLanguage: string[];
  motherTongue: string;
  password: string;
}

const useAuth = () => {
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addAuthData = useAuthStore((state) => state?.addAuthData);
  const clearKyc = useKycStore((state) => state?.clearAll);
  const clearAuthData = useAuthStore((state) => state?.clearAuthData);

  const [loginMutation, { loading: loginLoading }] =
    useMutation(LOGIN_MUTATION);

  const [signupMutation, { loading: SignupLoading }] =
    useMutation(REGISTER_SUBMIT);

  const loading = isLoading || loginLoading || SignupLoading;

  const storeNextAuth = async (value: AuthActionType) => {
    setIsLoading(true);
    try {
      await AuthAction(value, '/dashboard');
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      setError('Credential is Invalid');
    }
  };

  const login = async (formData: z.infer<typeof LoginFormSchema>) => {
    setError('');
    const { data } = await loginMutation({
      variables: {
        ...formData,
      },
    });

    if (data?.login?.statusCode === 200) {
      const { token, id, ...obj } = data?.login?.data;
      const StoreData = {
        id,
        auth_token: token,
        iAuthenticated: true,
        name: data?.login?.data?.userDetails?.personal?.firstName,
        image: data?.login?.data?.userDetails?.personal?.avatar || '',
      };
      const input = {
        ...obj,
        id,
        token,
      };
      addAuthData(input);
      await storeNextAuth(StoreData);
      toast.success('Login Successfully');
    } else {
      setError(data?.login?.message);
    }
  };

  const register = async (formData: SignupFormDataType) => {
    setError('');
    const { data } = await signupMutation({ variables: { ...formData } });
    if (data?.register?.statusCode === 200) {
      const { token, id, ...obj } = data?.register?.data;
      const StoreData = {
        id,
        auth_token: token,
        iAuthenticated: true,
        name: data?.register?.data?.userDetails?.personal?.firstName || '',
        image: data?.login?.data?.userDetails?.personal?.avatar || '',
      };
      const input = {
        ...obj,
        id,
        token,
      };
      addAuthData(input);
      await storeNextAuth(StoreData);
      toast.success('Registered Successfully');
    } else {
      setError(data?.register?.message);
    }
  };

  const clearedAllSection = () => {
    clearAuthData();
    clearKyc();
  };
  const logout = async () => {
    await signOut().finally(() => {
      clearedAllSection();
    });
  };

  return {
    error,
    loading,
    login,
    logout,
    register,
    clearedAllSection,
    setError,
  };
};
export default useAuth;
