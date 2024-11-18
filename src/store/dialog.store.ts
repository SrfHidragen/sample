/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { create } from 'zustand';

interface DialogStoretType {
  isOpen: boolean;
  children: ReactNode | null;
  title: string | undefined;
  className?: string | undefined;
  parentClassName?: string | undefined;
  componentProps?: any;
  titleClass?: string;
  isShowCloseIcon?: boolean;
  openDialog: (props: {
    children: ReactNode;
    title?: string;
    className?: string;
    componentProps?: any;
    titleClass?: string;
    parentClassName?: string;
    isShowCloseIcon?: boolean;
  }) => void;
  closeDialog: () => void;
}
export const useDialogStore = create<DialogStoretType>((set) => ({
  isOpen: false,
  children: null,
  title: '',
  openDialog: ({
    children,
    title = '',
    className = '',
    titleClass = '',
    parentClassName = '',
    componentProps = {},
    isShowCloseIcon,
  }) =>
    set({
      isOpen: true,
      children,
      title,
      className,
      titleClass,
      parentClassName,
      componentProps,
      isShowCloseIcon,
    }),
  closeDialog: () =>
    set({
      isOpen: false,
      children: null,
      title: '',
      className: '',
      parentClassName: '',
      titleClass: '',
      componentProps: undefined,
      isShowCloseIcon: false,
    }),
}));
