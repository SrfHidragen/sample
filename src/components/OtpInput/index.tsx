/* eslint-disable react/no-unknown-property */
/* eslint-disable react/display-name */
import { GlobalVariables } from '@/lib/constant';
import React, { forwardRef, Ref, useCallback } from 'react';
import OtpInput from 'react18-input-otp';

interface OtpInputComponentProps {
  otp?: string;
  // eslint-disable-next-line no-unused-vars
  setOtp?: (value: string | undefined) => void;
  numInputs?: number;
  separator?: React.ReactNode;
  inputStyle?: React.CSSProperties;
  focusStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

// eslint-disable-next-line react/display-name
const OtpInputComponent = forwardRef<HTMLInputElement, OtpInputComponentProps>(
  (
    {
      otp,
      setOtp = () => {},
      numInputs = 6,
      separator = <span className="w-1.5"></span>,
      inputStyle,
      focusStyle,
      containerStyle,
      onChange,
      ...props // Capture remaining props
    },
    ref,
  ) => {
    const handleChange = useCallback(
      (enteredOtp: string) => {
        if (
          GlobalVariables.Regex.number.test(enteredOtp) ||
          enteredOtp === ''
        ) {
          setOtp(enteredOtp);
          if (onChange) {
            onChange(enteredOtp);
          }
        }
      },
      [setOtp, onChange],
    );

    return (
      <>
        <OtpInput
          isInputNum={true}
          value={otp}
          ref={ref as Ref<OtpInput>}
          onChange={handleChange}
          numInputs={numInputs}
          separator={separator as React.ReactElement}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          containerStyle={containerStyle}
          inputProps={{
            type: 'number',
          }}
          id="otp-input"
          {...props}
        />
        <style jsx global>{`
          input {
            border-bottom: 2px solid lightgray;
          }
        `}</style>
      </>
    );
  },
);

export default React.memo(OtpInputComponent);
