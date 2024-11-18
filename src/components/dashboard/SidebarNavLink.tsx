import { FaHandsHelping } from 'react-icons/fa';
import { IoPeopleSharp, IoSettingsOutline } from 'react-icons/io5';
import { MdFeed, MdOutlineWorkHistory, MdPayment } from 'react-icons/md';
import { PiCashRegisterBold, PiHandWithdraw } from 'react-icons/pi';
import {
  RiFileHistoryFill,
  RiFileList2Fill,
  RiFileList3Line,
  RiUserReceived2Line,
  RiUserShared2Line,
} from 'react-icons/ri';

interface SidebarProps {
  isSmallSidebar?: boolean;
  IsGiveHelpProcess?: boolean;
  IsKycVerified?: boolean;
  IsInitialProcessingFeeChecked?: boolean;
  isGiveHelpValid?: boolean;
}
export const getDashboardSidebarData = ({
  isSmallSidebar,
  IsGiveHelpProcess,
  IsKycVerified,
  IsInitialProcessingFeeChecked,
  isGiveHelpValid,
}: SidebarProps) => [
  {
    id: 1,
    label: 'Dashboard',
    isLock: false,
    link: '/dashboard',
    type: 'link',
    isSmallNav: false,
    UserType: ['indirect_customer', 'customer', 'consumer'],
    icon: (
      <img
        src="/img/dashboard/sidebar/dashboard-logo.png"
        className={isSmallSidebar ? 'h-auto w-6' : 'h-auto w-5'}
        alt=""
      />
    ),
  },
  {
    id: 2,
    label: 'Give Help',
    isLock: isGiveHelpValid || false,
    link: !IsKycVerified
      ? '/dashboard/kyc'
      : IsGiveHelpProcess
        ? '/dashboard/give-help/give-help-process'
        : '/dashboard/give-help',
    type: !IsInitialProcessingFeeChecked ? 'btn' : 'link',
    isSmallNav: false,
    UserType: ['consumer'],
    icon: (
      <RiUserShared2Line className={isSmallSidebar ? 'size-7' : 'size-5'} />
    ),
  },
  {
    id: 3,
    label: 'Receive Help',
    isLock: false,
    link: '/dashboard/receive-help-chart',
    type: 'link',
    isSmallNav: false,
    UserType: ['consumer'],
    icon: (
      <RiUserReceived2Line className={isSmallSidebar ? 'size-7' : 'size-5'} />
    ),
  },
  // {
  //   id: 4,
  //   label: 'Customer Follow Up',
  //   isLock: isGiveHelpValid || false,
  //   link: '/dashboard/customer-followup',
  //   type: 'link',
  //   isSmallNav: false,
  //   UserType: ['consumer'],
  //   icon: <IoPeopleSharp className={isSmallSidebar ? 'size-7' : 'size-5'} />,
  // },
  {
    id: 4,
    label: 'Customer Follow Up',
    isLock: false,
    link: '/dashboard/customer-followup',
    type: 'link',
    isSmallNav: false,
    UserType: ['indirect_customer', 'customer', 'consumer'],
    icon: <IoPeopleSharp className={isSmallSidebar ? 'size-7' : 'size-5'} />,
  },
  {
    id: 5,
    label: 'Payment History',
    isLock: false,
    link: '/dashboard/payment/payment-history',
    type: 'link',
    isSmallNav: false,
    UserType: ['customer', 'consumer'],
    icon: <MdPayment className={isSmallSidebar ? 'size-7' : 'size-5'} />,
  },
  {
    id: 6,
    label: 'Give Help History',
    isLock: false,
    link: '/dashboard/all-transactions/give-help-history',
    type: 'link',
    isSmallNav: false,
    UserType: ['consumer'],
    icon: (
      <RiFileHistoryFill className={isSmallSidebar ? 'size-7' : 'size-5'} />
    ),
  },
  {
    id: 7,
    label: 'Receive Help History',
    isLock: false,
    link: '/dashboard/all-transactions/receive-help-history',
    type: 'link',
    isSmallNav: false,
    UserType: ['consumer'],
    icon: (
      <MdOutlineWorkHistory className={isSmallSidebar ? 'size-7' : 'size-5'} />
    ),
  },
  {
    id: 8,
    label: 'Recent Receive Help',
    isLock: false,
    link: '/dashboard/all-transactions/recent-receive-help',
    type: 'link',
    isSmallNav: false,
    UserType: ['consumer'],
    icon: <FaHandsHelping className={isSmallSidebar ? 'size-7' : 'size-5'} />,
  },
  {
    id: 9,
    label: 'Withdrawal History',
    isLock: false,
    link: '/dashboard/all-transactions/withdrawal-history',
    type: 'link',
    isSmallNav: false,
    UserType: ['consumer'],
    icon: <PiHandWithdraw className={isSmallSidebar ? 'size-7' : 'size-5'} />,
  },
  {
    id: 10,
    label: 'PMF History',
    isLock: false,
    link: '/dashboard/all-transactions/pmf-history',
    type: 'link',
    isSmallNav: false,
    UserType: ['consumer'],
    icon: (
      <PiCashRegisterBold className={isSmallSidebar ? 'size-7' : 'size-5'} />
    ),
  },
  {
    id: 11,
    label: 'GST-Invoice',
    isLock: false,
    link: '/dashboard/all-transactions/gst-invoice',
    type: 'link',
    isSmallNav: false,
    UserType: ['consumer'],
    icon: <RiFileList3Line className={isSmallSidebar ? 'size-7' : 'size-5'} />,
  },
  {
    id: 12,
    label: 'Top-Up History',
    isLock: false,
    link: '/dashboard/all-transactions/top-up-history',
    type: 'link',
    isSmallNav: false,
    UserType: ['consumer'],
    icon: <RiFileList2Fill className={isSmallSidebar ? 'size-7' : 'size-5'} />,
  },
  {
    id: 13,
    label: 'Processing Fee',
    isLock: false,
    link: '/dashboard/all-transactions/processing-fee',
    type: 'link',
    isSmallNav: false,
    UserType: ['consumer'],
    icon: <MdFeed className={isSmallSidebar ? 'size-7' : 'size-5'} />,
  },
  {
    id: 14,
    label: 'Settings',
    isLock: false,
    link: '/dashboard',
    type: 'menu',
    isSmallNav: true,
    UserType: ['consumer'],
    // UserType: ['indirect_customer', 'invited_customer', 'consumer'],
    icon: <IoSettingsOutline className={'size-5'} />,
  },
  // {
  //   id: 14,
  //   label: 'Customer Follow Up',
  //   isLock: false,
  //   link: '/dashboard/customer-followup',
  //   type: 'link',
  //   isSmallNav: false,
  //   UserType: ['consumer', 'customer'],
  //   icon: <IoPeopleSharp className={isSmallSidebar ? 'size-7' : 'size-5'} />,
  // },
];
