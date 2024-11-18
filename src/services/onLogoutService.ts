/* eslint-disable no-unused-vars */
import { createGlobalAbortController } from '@/helper/apolloClient';

const defaultId = 'on-logout-alert';
const defaultToken = 'on-logout-alerts';

const userAvailableEventTarget = new EventTarget();

interface logoutOption {
  id?: string;
}

export interface LogoutType {
  id?: string;
  isTokenAvailable?: boolean;
}

export const onLogoutService = {
  onLogout,
  logout,
  onLogoutProcess,
};

function onLogout(
  id: string = defaultId,
  callback: (status: LogoutType) => void,
) {
  const listener = (event: Event) => {
    const status = (event as CustomEvent).detail;
    if (status && status.id === id) {
      callback(status);
    }
  };

  userAvailableEventTarget.addEventListener(id, listener);

  return () => {
    userAvailableEventTarget.removeEventListener(id, listener);
  };
}

function logout(isTokenValid: boolean, option?: logoutOption) {
  if (isTokenValid) {
    createGlobalAbortController();
  }
  onLogoutProcess({ ...option, isTokenAvailable: isTokenValid });
}

function onLogoutProcess(status: Omit<LogoutType, 'id'> & Partial<LogoutType>) {
  status.id = status.id || defaultId;
  const event = new CustomEvent(status.id, { detail: status });
  userAvailableEventTarget.dispatchEvent(event);
}

export { defaultId, defaultToken };
