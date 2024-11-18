'use client';

import React, { useRef, useState } from 'react';
import { Camera } from 'react-camera-pro';
import { Button } from '@/components/Button';
import Image from '@/components/Image';
import Alert from '@/components/Alert';
import toast from 'react-hot-toast';
import { GrCheckmark } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import { dataURLtoFile } from '@/lib/utils';
import { useKycStore } from '@/store/kyc.store';
import { useMutation } from '@apollo/client';
import { FILE_UPLOAD, KYC_FINAL_SUBMIT } from '@/graphql/mutation/kyc.mutation';
import { useAuthStore } from '@/store/auth.store';
import { withKYC } from './withKYC';

interface submitDataType {
  fileImage?: string;
  isSubmitted?: boolean;
}
interface CameraInstance {
  takePhoto: () => string;
}
function ImageView() {
  const { updateUserDetails, user } = useAuthStore();
  const [mutateKycFinalSubmit, { loading: kycLoading }] =
    useMutation(KYC_FINAL_SUBMIT);
  const { kycVerification, setAadharVerification } = useKycStore();
  const [uploadFile, { loading }] = useMutation(FILE_UPLOAD, {
    context: { useUploadLink: true },
  });
  const router = useRouter();
  const cameraRef = useRef<CameraInstance | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSelfieUploaded, setIsSelfieUploaded] = useState<boolean>(false);
  const [submitData, setSubmitData] = useState<submitDataType>({
    fileImage: '',
    isSubmitted: false,
  });

  const errorMessages = {
    noCameraAccessible: 'No camera device accessible.',
    permissionDenied: 'Permission denied to access camera.',
    switchCamera: 'Unable to switch camera.',
    canvas: 'Canvas is not supported.',
  };

  const captureImage = () => {
    try {
      if (cameraRef.current) {
        const image = cameraRef.current.takePhoto();
        setCapturedImage(image);
        setErrorMessage(null);
      } else {
        setErrorMessage('Camera not initialized properly.');
      }
    } catch (error) {
      setErrorMessage('Error capturing the image.');
      //   console.error(error);
    }
  };

  const uploadImage = async () => {
    if (!capturedImage) {
      toast.error('Please capture an image first.');
      return;
    }
    const file = dataURLtoFile(
      capturedImage,
      `${kycVerification?.name?.split(' ').join('_') || 'kyc-user-img'}.jpg`,
    );
    try {
      const { data } = await uploadFile({
        variables: {
          file,
        },
      });
      if (data?.fileUpload?.statusCode !== 200) {
        return setErrorMessage('Captured Image is error, Please Re-take Image');
      }
      toast.success(data?.fileUpload?.message);
      setIsSelfieUploaded(true);
      setSubmitData({
        fileImage: data?.fileUpload?.data?.filePath,
        isSubmitted: true,
      });
    } catch (error) {
      setErrorMessage('Captured Image is error, Please Re-take Image');
    }
  };

  //reset camera
  const resetCamera = () => {
    setCapturedImage(null);
    setIsSelfieUploaded(false);
  };

  // skip selfi
  const onHandleSkipPan = () => {
    router.replace('/dashboard');
  };

  const handleFinalSubmit = async () => {
    if (!submitData?.fileImage) return;
    const input = {
      profileImage: submitData?.fileImage,
    };

    try {
      const { data } = await mutateKycFinalSubmit({
        variables: {
          ...input,
        },
      });
      if (data.kyc.statusCode !== 200) {
        return setErrorMessage(data.kyc.message);
      }
      const checkValueKycCompleted =
        kycVerification?.KycFlow?.every((item) => item?.isVerified === true) ||
        false;

      setAadharVerification({
        kyc_information: { selfiVerified: true },
        isKycFilled: checkValueKycCompleted,
      });

      const newNewUserData = {
        ...user?.userDetails,
        isKycFilled: checkValueKycCompleted,
      };
      updateUserDetails(newNewUserData);
      if (checkValueKycCompleted) {
        router.replace('/dashboard/kyc/congratulations');
      } else {
        router.replace('/dashboard');
      }
    } catch (error) {
      setErrorMessage('image file path is incorrect, Please try again');
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {!capturedImage && (
        <div className="flex w-full items-center justify-center">
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full bg-gray-200 md:h-[512px] md:w-[512px]">
            <Camera
              ref={cameraRef}
              errorMessages={errorMessages}
              aspectRatio={1} // Ensures the camera is a perfect square
            />
            {/* Capture Button */}
            {/* <Button onClick={captureImage} variant="secondary" className="">
              Capture
            </Button> */}
          </div>
        </div>
      )}
      <div className="h-2"></div>

      <div className="w-[350px]">
        {!capturedImage && (
          <div className="flex gap-3">
            <div className="w-64">
              <Button
                className="w-full max-w-xl flex-1 text-white"
                variant={'outline'}
                type="button"
                onClick={onHandleSkipPan}
              >
                Skip
              </Button>
            </div>
            <Button onClick={captureImage} variant="secondary" className="">
              Capture
            </Button>
          </div>
        )}
      </div>
      {capturedImage && (
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="h-[300px] w-[300px] overflow-hidden rounded-full md:h-[512px] md:w-[512px]">
              <Image
                src={capturedImage}
                alt="Captured Selfie"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center">
            {isSelfieUploaded && (
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center  rounded-full border-2 border-green-500">
                  <GrCheckmark size={'.8rem'} className="text-green-500" />
                </div>
                <span className="text-green-500">
                  Selfie Uploaded Successfully
                </span>
              </div>
            )}

            {!submitData?.isSubmitted ? (
              <div className="flex space-x-4">
                <Button
                  onClick={resetCamera}
                  variant="secondary"
                  className="w-full"
                >
                  Retake
                </Button>
                <Button
                  onClick={uploadImage}
                  variant="secondary"
                  className="w-full"
                  disabled={loading}
                  loading={loading}
                >
                  Upload
                </Button>
              </div>
            ) : (
              <div className="w-full">
                <div className="h-3"></div>
                <Button
                  onClick={handleFinalSubmit}
                  variant="secondary"
                  className="relative z-10 w-full "
                  disabled={kycLoading || loading}
                  loading={kycLoading}
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="h-2"></div>

      {errorMessage && <Alert type="error" message={errorMessage} />}
    </div>
  );
}

export default React.memo(withKYC(ImageView));
