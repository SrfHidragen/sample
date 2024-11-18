// store/useAuthStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthStoreState, AuthData } from '@/types/auth.store.type';
import { customLocalStorage } from '@/lib/utils';

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      addAuthData: (data: AuthData) => {
        set(() => {
          const newState = {
            isAuthenticated: true,
            user: data,
          };
          return newState;
        });
      },
      updateAuthData: (data: Partial<AuthData>, callback?: () => void) => {
        set((state) => {
          if (!state.user) return state;

          const newUser = { ...state.user, ...data };
          const newState = {
            isAuthenticated: state.isAuthenticated,
            user: newUser,
          };

          if (callback) callback();
          return newState;
        });
      },
      updateUserDetails: (data: Partial<AuthData>) => {
        set((state) => {
          if (!state.user) return state;
          const update_data = {
            ...state,
            user: {
              ...state?.user,
              userDetails: { ...state?.user?.userDetails, ...data },
            },
          };
          return update_data;
        });
      },
      clearAuthData: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: 'auth-crd',
      storage: createJSONStorage(() => customLocalStorage),
    },
  ),
);
