/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GlobalVariables } from './constant';
import moment from 'moment';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isObjectNullOrHasNullValues(
  obj: { [key: string]: string | null | undefined } | null | undefined,
): boolean {
  if (obj === null || obj === undefined) {
    return true;
  }

  if (Object.keys(obj).length === 0) {
    return true;
  }

  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      return true;
    }
  }

  return false;
}

export const encode = (data: any) => {
  return btoa(JSON?.stringify(data));
};

export const decode = (data: string) => {
  return JSON?.parse(atob(data));
};
export function generateRandomId() {
  return `id_${Math.random().toString(36).substr(2, 9)}`;
}

export const customSessionStorage = {
  getItem: (name: string) => {
    const storedValue = sessionStorage.getItem(name);
    return storedValue ? decode(storedValue) : null;
  },
  setItem: (name: string, value: any) => {
    sessionStorage.setItem(name, encode(value));
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
  },
};

export const customLocalStorage = {
  getItem: (name: string) => {
    const storedValue = localStorage.getItem(name);
    return storedValue ? decode(storedValue) : null;
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, encode(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const getCommunicationItemIds = (
  communicationLanguage: string | undefined,
) => {
  if (communicationLanguage === '1') {
    const hindiId = GlobalVariables.CommunicationLanguage.find(
      (lang) => lang.code === 'HND',
    )?.id;
    const englishId = GlobalVariables.CommunicationLanguage.find(
      (lang) => lang.code === 'ENG',
    )?.id;
    return [hindiId, englishId];
  }
};

export const filterUndefined = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== undefined),
  );
};

export const imgConvertIntoBase64 = (data: string) => {
  return `data:image/jpeg;base64,${data}`;
};

//data URL convert to file
export function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);

  if (!mimeMatch) {
    throw new Error('Invalid data URL');
  }

  const mime = mimeMatch[1];
  const bstr = atob(arr[arr.length - 1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  return new File([u8arr], filename, { type: mime });
}

// download pdf
export const downloadFile = (data: any) => {
  const linkSource = `data:application/pdf;base64,${data}`;
  const downloadLink = document.createElement('a');
  const fileName = 'downloaded_file.pdf';

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};

function base64toBlob(base64Data: string) {
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: 'application/pdf' });
}

export function openBase64NewTab(base64Pdf: string): void {
  const blob = base64toBlob(base64Pdf);
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl);
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function classifyArea(paidLevel: number) {
  if (paidLevel >= 1 && paidLevel < 3) return { label: 'Rural', index: 0 };
  if (paidLevel >= 3 && paidLevel < 5) return { label: 'Semi-Rural', index: 1 };
  if (paidLevel >= 5 && paidLevel < 7) return { label: 'Urban', index: 2 };
  if (paidLevel >= 7 && paidLevel < 10) return { label: 'Township', index: 3 };
  if (paidLevel >= 10) return { label: 'Metro', index: 4 };
  return { label: 'Unknown', index: -1 };
}

export const localDateConvertion = (date: any, isUnix = false) => {
  if (date === null || date === undefined || !date) {
    return null;
  }
  let ProperDate;
  if (isUnix) {
    ProperDate = moment.unix(date).format('DD-MM-YYYY, hh:mm A');
  } else {
    ProperDate = moment(date).format('DD-MM-YYYY, hh:mm A');
  }
  return ProperDate;
};

export const findTotalPreviousDayCount = (date: any, isUnix = false) => {
  let DiffDate;
  let CurrentDate;
  let PreviousDate;
  if (isUnix) {
    CurrentDate = moment(new Date());
    PreviousDate = moment.unix(date);
    DiffDate = CurrentDate.diff(PreviousDate, 'day');
  } else {
    CurrentDate = moment(new Date());
    PreviousDate = moment(date);
    DiffDate = CurrentDate.diff(PreviousDate, 'day');
  }
  return DiffDate;
};

export const convertToInrSymbol = (price: number | string) => {
  return `₹${Number(price)?.toFixed(2)}`;
};
