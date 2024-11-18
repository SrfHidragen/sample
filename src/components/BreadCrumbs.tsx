import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';

interface NavigationItem {
  id: number;
  label: string;
  href?: string;
}

interface BreadCrumbsProps {
  title: string;
  navigation: NavigationItem[];
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ title, navigation }) => (
  <div className="bg-gradient-to-t from-[#031DC0] to-[#011487] px-24 py-[42px]">
    <div className="container">
      <h1 className="text-[28px] font-bold text-white lg:text-[48px]">
        {title}
      </h1>
      <div className="mt-8 flex flex-wrap items-center gap-6 text-base text-white">
        {navigation.map((item, index) => (
          <React.Fragment key={item.id}>
            {item.href && index < navigation.length - 1 ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < navigation.length - 1 && (
              <MdOutlineKeyboardDoubleArrowRight />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default BreadCrumbs;
