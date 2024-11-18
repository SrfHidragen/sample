import Typography from '@/components/Typography';
import React from 'react';
import Images from '@/components/Image';
import GradientCard from './GradientCard';

const GiventakeWorld = () => {
  return (
    <>
      <div className="container py-8 md:py-16">
        <GradientCard className="rounded-3xl  p-4  ">
          <div className="flex flex-col items-center gap-6 lg:flex-row  lg:gap-[50px] xl:gap-[114px]">
            <div className="flex w-full max-w-sm justify-center">
              <div className="max-h-[480px] max-w-[427px]">
                <Images
                  src="/img/homepage/giventakeworld.svg"
                  alt="Logo"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="w-full">
              <Typography
                as="h1"
                className="font-roboto text-center !text-[23px] leading-[35px] text-white sm:!text-[30px] md:text-left md:!text-[40px] md:leading-[47px]"
              >
                What is&nbsp;
                <Typography
                  as="span"
                  className=" font-roboto text-center !text-[23px] leading-[35px] text-tertiary sm:!text-[30px] md:text-left md:!text-[40px] md:leading-[47px]"
                >
                  give
                </Typography>
                N
                <Typography
                  as="span"
                  className=" font-roboto text-center !text-[23px] leading-[35px] text-tertiary sm:!text-[30px] md:text-left md:!text-[40px] md:leading-[47px]"
                >
                  take
                </Typography>
                <Typography
                  as="span"
                  className=" font-roboto text-center !text-[23px] leading-[35px] text-[#44C7F4] sm:!text-[30px] md:text-left md:!text-[40px] md:leading-[47px]"
                >
                  .world
                </Typography>
              </Typography>
              <div className="text-center md:text-left">
                <div className="h-6"></div>
                <Typography
                  as="p"
                  className="font-roboto text-[16px] leading-[28px] text-white"
                >
                  giveNtake.world, an innovative online helping platform, stands
                  as the debut project of Prasanth Panachikkal Enterprises
                  Private Limited, setting a new benchmark as a unique and
                  unparalleled platform for financial assistance, unmatched in
                  its approach to fostering financial aid and empowerment.
                  Members, upon understanding its concept, business potential,
                  and Terms of Service, pledge to help 10 individuals who are in
                  critical financial need though giveNtake online helping
                  platform&apos;s digital technological solutions. This
                  commitment then qualifies them to receive financial help
                  unconditionally ranging from Rs 150 to Rs 82,95,500 from
                  individuals who share a common vision with the platform&apos;s
                  core values and objectives.
                </Typography>
              </div>
            </div>
          </div>
        </GradientCard>
      </div>
    </>
  );
};

export default GiventakeWorld;
