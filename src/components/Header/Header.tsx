/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { HiMiniBars3 } from 'react-icons/hi2';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Navigation from '@/components/Header/Navigation';
import { Button } from '@/components/Button';
import Images from '@/components/Image';
import HomeUserMenu from '../UserMenu/HomeUserMenu';
import { defaultId, onLogoutService } from '@/services/onLogoutService';
import { signOut, useSession } from 'next-auth/react';
import useAuth from '@/hooks/useAuth';
import Typography from '../Typography';

function classNames(...classes: (string | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

const Header = ({ session }: any) => {
  const { data: sessionInfo } = useSession();
  const { clearedAllSection } = useAuth();
  const [isSessionNull, setIsSessionNull] = useState<boolean>(false);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push('/account?credential=SignIn');
  };
  const handleSignUp = () => {
    router.push('/account/register?SignUp=terms-of-register');
  };
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const clearSession = () => {
    clearedAllSection();
    router.push('/account');
  };

  useEffect(() => {
    if (isSessionNull) {
      signOut({ redirect: false }).finally(() => {
        setTimeout(() => {
          clearSession();
        });
      });
    }
  }, [isSessionNull, sessionInfo]);

  useEffect(() => {
    const unsubscribe = onLogoutService.onLogout(defaultId, (alert) => {
      if (alert.isTokenAvailable) {
        setIsSessionNull(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={!pathname.startsWith('/mobile') ? 'block' : 'hidden'}>
      <div
        className={
          !pathname.startsWith('/dashboard')
            ? 'border-b-2 border-[#030187] bg-[#02158A] '
            : 'hidden'
        }
      >
        <div className="container mx-auto py-5 md:pb-2">
          <div className="flex items-center justify-between">
            <Link
              className="relative flex h-[88px] w-[210px] items-center"
              href={'/'}
            >
              <Images
                src="/img/header/BETA.svg"
                alt="gnt_logo"
                className="w-full"
              />
            </Link>

            <div className="flex items-center justify-between gap-4">
              <div className="hidden text-xs text-white md:block md:text-sm">
                {session?.isAuthenticated ? (
                  <>
                    <Typography className="text-white">
                      {session?.user.name}
                    </Typography>
                  </>
                ) : (
                  <a
                    href="mailto:info@giventake.world"
                    className="flex items-center gap-2"
                  >
                    info@giventake.world
                  </a>
                )}
              </div>
              {session?.isAuthenticated && pathname != '/dashboard' ? (
                <div className="hidden md:block">
                  {/* <Typography className="text-white">
                    {session?.user.name}
                  </Typography> */}
                  <HomeUserMenu
                    id={'home-user-menu'}
                    name={session?.user?.name}
                    image={session?.user?.image}
                  />
                </div>
              ) : (
                <div className="flex gap-3">
                  <Button
                    size="none"
                    variant="outline"
                    onClick={handleSignUp}
                    className=" hidden h-[40px] w-[103px] rounded-lg border-tertiary text-white md:block"
                  >
                    Register
                  </Button>
                  <Button
                    variant="secondary"
                    className="hidden h-[40px] w-[103px] rounded-lg md:block"
                    onClick={handleLogin}
                    size="none"
                  >
                    Login
                  </Button>
                </div>
              )}
              <HiMiniBars3
                onClick={() => setOpen(true)}
                className="block h-8 w-8 text-white md:hidden"
              />
            </div>
          </div>
          <div className="hidden h-3 md:block"></div>
          <div className="hidden flex-1 items-center justify-end md:flex">
            <div className="hidden md:block">
              <div className="flex gap-8 xl:gap-10">
                <Link
                  href={'/'}
                  className={classNames(
                    pathname == '/'
                      ? 'p-3 text-sm font-medium text-yellow-500'
                      : 'p-3 text-sm  text-white hover:text-yellow-500',
                  )}
                >
                  Home
                </Link>
                <Link
                  href={'/about-us'}
                  className={classNames(
                    pathname == '/about-us'
                      ? 'text-sm font-medium text-yellow-500'
                      : 'text-sm text-white  hover:text-yellow-500',
                    'p-3',
                  )}
                >
                  About Us
                </Link>
                <Link
                  href={'/gallery'}
                  className={classNames(
                    pathname == '/gallery'
                      ? 'text-sm font-medium text-yellow-500'
                      : 'text-sm text-white  hover:text-yellow-500',
                    'p-3',
                  )}
                >
                  Gallery
                </Link>
                <Link
                  href={'/contact-us'}
                  className={classNames(
                    pathname == '/contact-us'
                      ? 'text-sm font-medium text-yellow-500'
                      : 'text-sm text-white  hover:text-yellow-500',
                    'p-3',
                  )}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navigation open={open} setOpen={setOpen} />
    </div>
  );
};

export default Header;
