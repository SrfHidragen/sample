/* eslint-disable no-unused-vars */
const defaultId = 'default-alert';
const defaultToken = 'default-alerts';

export interface Alert {
  id: string;
  message?: string;
  content?: string[];
  type?: keyof typeof AlertType;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
  fade?: boolean;
}

interface AlertOptions {
  id?: string;
  autoClose?: boolean;
  keepAfterRouteChange?: boolean;
}

const alertEventTarget = new EventTarget();

export const AlertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  axiosDialog,
  graphqlError,
  clear,
};

export const AlertType = {
  Success: 'Success',
  Error: 'Error',
  graphqlError: 'graphqlError',
  Info: 'Info',
  Warning: 'Warning',
} as const;

type AlertType = (typeof AlertType)[keyof typeof AlertType];

function onAlert(id: string = defaultId, callback: (alert: Alert) => void) {
  const listener = (event: Event) => {
    const alert = (event as CustomEvent).detail;
    if (alert && alert.id === id) {
      callback(alert);
    }
  };

  alertEventTarget.addEventListener(id, listener);

  return () => {
    alertEventTarget.removeEventListener(id, listener);
  };
}

function success(
  message: string,
  content: string[] = [],
  options: AlertOptions = {},
) {
  alert({ ...options, type: AlertType.Success, message, content });
}

function error(
  message: string,
  content: string[] = [],
  options: AlertOptions = {},
) {
  alert({ ...options, type: AlertType.Error, message, content });
}

function graphqlError(message: string, options: AlertOptions = {}) {
  axiosDialog({ ...options, type: AlertType.graphqlError, message });
}

function info(
  message: string,
  content: string[] = [],
  options: AlertOptions = {},
) {
  alert({ ...options, type: AlertType.Info, message, content });
}

function warn(
  message: string,
  content: string[] = [],
  options: AlertOptions = {},
) {
  alert({ ...options, type: AlertType.Warning, message, content });
}

function alert(alert: Omit<Alert, 'id'> & Partial<Alert>) {
  alert.id = alert.id || defaultId;
  alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
  const event = new CustomEvent(alert.id, { detail: alert });
  alertEventTarget.dispatchEvent(event);
}

function axiosDialog(alert: Omit<Alert, 'id'> & Partial<Alert>) {
  alert.id = alert.id || defaultToken;
  alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
  const event = new CustomEvent(alert.id, { detail: alert });
  alertEventTarget.dispatchEvent(event);
}

// clear alerts
function clear(id: string = defaultId): void {
  alertEventTarget.dispatchEvent(new CustomEvent(id, { detail: { id } }));
}

export { defaultId, defaultToken };
