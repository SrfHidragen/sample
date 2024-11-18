/* eslint-disable no-console */
import { usePathname } from 'next/navigation';
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('ErrorBoundary caught an error', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  refresh = () => {
    window.location.reload();
  };

  resetErrorBoundary = () => {
    this.setState({ hasError: false });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return (
        <div className="flex min-h-screen w-full flex-1 flex-col items-center justify-center gap-5 bg-[#001BC2] px-10 sm:gap-10 md:flex-row lg:gap-20">
          <div className="w-full ">
            <img
              className="mx-auto max-w-xs md:mx-0 md:ml-auto md:max-w-sm lg:max-w-md"
              src="/img/errors/error.png"
              alt=""
            />
          </div>
          <div className="w-fit md:w-full">
            <h1 className="mb-5 text-5xl font-bold text-white sm:text-7xl">
              Oops!
            </h1>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Something went wrong here
            </h2>
            <p className="mb-8 text-gray-400">
              I think we have something broken Can we try agian?
            </p>
            <button
              className="w-full cursor-pointer rounded-xl bg-white  px-2 py-3 text-lg font-bold tracking-wider hover:bg-slate-200 sm:max-w-xs"
              onClick={this.refresh}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}

export default function ErrorBoundaryWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const errorBoundaryRef = React.useRef<ErrorBoundary>(null);

  React.useEffect(() => {
    if (errorBoundaryRef.current) {
      errorBoundaryRef.current.resetErrorBoundary();
    }
  }, [pathname]);

  return <ErrorBoundary ref={errorBoundaryRef}>{children}</ErrorBoundary>;
}
