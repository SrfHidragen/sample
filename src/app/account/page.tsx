import ForgotConsumership from '@/features/account-page/forgot-consumership/ForgotConsumership';
import ForgotPassword from '@/features/account-page/forgot-password/ForgotPassword';
import NewPassword from '@/features/account-page/forgot-password/NewPassword';
import LoginForm from '@/features/account-page/SignIn/login-form';
import { isObjectNullOrHasNullValues } from '@/lib/utils';
import { notFound, redirect } from 'next/navigation';

export default function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  let ActualForm;

  const isInvalidSearchParams = isObjectNullOrHasNullValues(searchParams);

  if (isInvalidSearchParams) {
    redirect('/account?credential=SignIn');
  }

  //login Steps
  //consumer / customer selection
  if (searchParams?.credential === 'SignIn') {
    ActualForm = LoginForm;
  }

  if (searchParams?.credential === 'forgot-consumership') {
    ActualForm = ForgotConsumership;
  }

  if (searchParams?.credential === 'forgot-password') {
    ActualForm = ForgotPassword;
  }

  if (searchParams?.credential === 'set-new-password') {
    ActualForm = NewPassword;
  }

  if (!ActualForm) {
    notFound();
  }

  return <ActualForm />;
}
