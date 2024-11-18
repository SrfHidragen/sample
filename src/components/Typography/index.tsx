import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type TypographyProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  className?: string;
  children: ReactNode;
};

const Typography: React.FC<TypographyProps> = ({
  as: Component = 'p',
  className = '',
  children,
  ...props
}) => {
  const defaultClasses = {
    h1: 'text-[32px] font-medium',
    h2: 'text-[24px] font-medium',
    h3: 'text-[20px] font-medium',
    h4: 'text-[18px] font-medium',
    h5: '',
    h6: '',
    span: 'text-base',
    p: 'text-base',
  };

  const combinedClasses = cn(
    `${defaultClasses[Component] || 'text-base'} ${className}`,
  );

  const Tag = Component as keyof JSX.IntrinsicElements;

  return (
    <Tag className={combinedClasses} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;
