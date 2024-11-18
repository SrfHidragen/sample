'use client';
import { useAuthStore } from '@/store/auth.store';
import { notFound, usePathname, useRouter } from 'next/navigation';
import { ComponentType, useEffect } from 'react';

export function withConsumer<P extends object>(
  WrappedComponent: ComponentType<P>,
) {
  const ConsumerWrapper: React.FC<P> = (props: P) => {
    const pathname = usePathname().split('/');

    const router = useRouter();
    const IsConsumer =
      useAuthStore((state) => state?.user?.userDetails?.userType) ===
        'consumer' || false;
    const TermsId = useAuthStore((state) => state?.user?.userDetails?.termsId);

    const IsAgreeTerms = Number(TermsId) > 5 || false;
    const GiveHelpAmount = useAuthStore(
      (state) => state?.user?.userDetails?.totalSpend,
    );
    const IsValidaGivehelp = Number(GiveHelpAmount) < 150 || false;

    useEffect(() => {
      if (!IsConsumer && !pathname.includes('payment')) {
        notFound();
      }
    }, [IsConsumer, pathname]);

    useEffect(() => {
      if (!IsAgreeTerms) {
        router.push('/dashboard/terms-of-service');
      }
    }, [IsAgreeTerms, router]);

    useEffect(() => {
      if (IsValidaGivehelp && pathname.includes('customer-followup')) {
        notFound();
      }
    }, [IsValidaGivehelp, pathname]);

    if (IsConsumer && IsAgreeTerms) {
      return <WrappedComponent {...props} />;
    }

    if (!IsConsumer && pathname.includes('payment') && IsAgreeTerms) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
  return ConsumerWrapper;
}

export default withConsumer;
