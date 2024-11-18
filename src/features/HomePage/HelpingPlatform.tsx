'use client';
import Typography from '@/components/Typography';
import React, { useState } from 'react';
import Images from '@/components/Image';
import GradientCard from './GradientCard';

const HelpingPlatform = () => {
  const [isShow, setShow] = useState(false);

  const onHandleToggleShow = () => setShow(true);
  const onHandleToggleFalse = () => setShow(false);

  return (
    <>
      <div className="container py-8 md:py-16">
        <GradientCard className="rounded-2xl !p-4 md:!px-16 md:!py-8">
          <div className="mx-auto h-[306px] max-w-[316px]">
            <Images
              src="/img/homepage/helping-platform.svg"
              alt="Logo"
              className="h-full w-full"
            />
          </div>
          <div className="h-10"></div>
          <div className="text-center md:text-left">
            <Typography
              as="h1"
              className="font-roboto !text-[23px] font-medium leading-[35px] text-white sm:!text-[30px] md:leading-[47px] lg:!text-[40px]"
            >
              Why&nbsp;
              <Typography
                as="span"
                className="font-roboto !text-[23px] font-medium leading-[35px] text-tertiary sm:!text-[30px] md:leading-[47px] lg:!text-[40px]"
              >
                give
              </Typography>
              N
              <Typography
                as="span"
                className="font-roboto !text-[23px] font-medium leading-[35px] text-tertiary sm:!text-[30px] md:leading-[47px] lg:!text-[40px]"
              >
                take
              </Typography>
              <Typography
                as="span"
                className="font-roboto !text-[23px] font-medium leading-[35px] text-[#44C7F4] sm:!text-[30px] md:leading-[47px] lg:!text-[40px]"
              >
                .world&nbsp;
              </Typography>
              online helping platform
            </Typography>

            <div className="h-6"></div>

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isShow
                  ? 'max-h-[1200px] opacity-100 md:max-h-[1000px]'
                  : 'max-h-96 opacity-90 md:max-h-48 '
              }`}
            >
              <Typography
                as="p"
                className="text-center leading-[28px] text-white md:text-left"
              >
                Money, often cited as the root cause behind 99% of the
                world&apos;s problems, is intricately linked to various aspects
                of life—ranging from basic survival needs and social status to
                healthcare, education, opportunities, social inequality, stress,
                mental health, safety, security, environmental impact, and
                global challenges. These connections, though not always
                immediately evident, become clear upon closer examination of our
                own lives and those around us, underscoring the profound
                influence money has on a myriad of circumstances.
              </Typography>
              <div className="h-4"></div>
              {isShow && (
                <>
                  <Typography
                    as="p"
                    className="text-center leading-[28px] text-white md:text-left"
                  >
                    In today&apos;s world, money remains a fundamental necessity
                    for human survival. Traditionally, 80% of the population has
                    depended on employment or a profession to earn a living.
                    However, with the advent and rapid expansion of the Internet
                    and Information Technology, the demand for human resources
                    has significantly declined, leading to a scenario where the
                    concept of employment for everyone is fast becoming an
                    unattainable dream. Yet, the necessity for financial
                    resources to sustain life on Earth persists.
                  </Typography>
                  <div className="h-4"></div>
                  <Typography
                    as="p"
                    className="text-center leading-[28px] text-white md:text-left"
                  >
                    In response to these challenges, our mission focuses on
                    addressing and resolving the myriad issues arising from the
                    influence of money, advocating for a new culture of mutual
                    financial support and income generation for all. It is
                    imperative for the new generation to adopt a collaborative
                    approach, assisting one another financially and fostering a
                    shift in mindset towards ensuring income for every
                    individual. This transformative vision not only benefits
                    ourselves and future generations but also contributes to the
                    betterment of our country and the world at large.
                  </Typography>
                </>
              )}
            </div>

            {isShow ? (
              <div
                className="cursor-pointer text-right transition-all duration-300 ease-in-out"
                onClick={onHandleToggleFalse}
              >
                <span className="text-lg font-medium leading-[32px] text-tertiary">
                  Read Less
                </span>
              </div>
            ) : (
              <div
                className="cursor-pointer text-right transition-all duration-300 ease-in-out"
                onClick={onHandleToggleShow}
              >
                <span className="text-lg font-medium leading-[32px] text-tertiary">
                  Read More
                </span>
              </div>
            )}
          </div>
        </GradientCard>
      </div>
    </>
  );
};

export default HelpingPlatform;
