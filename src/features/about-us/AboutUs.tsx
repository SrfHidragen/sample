import Typography from '@/components/Typography';
import React from 'react';
import Images from '@/components/Image';

const AboutUs = () => {
  return (
    <>
      <div className="container py-4 md:py-8">
        <div className="flex flex-col-reverse items-center gap-6 lg:flex-row lg:gap-44">
          <div className="w-full">
            <Typography
              as="h5"
              className="text-center text-[56px] font-semibold leading-[93.75px] text-white md:text-left md:text-[80px]"
            >
              About Us
            </Typography>
            <div className="text-center md:text-left">
              <div className="h-6 lg:h-[51px]"></div>
              <Typography
                as="h4"
                className="font-normal leading-[28px] text-white"
              >
                Through the giventake.world online helping platform, individuals
                in our country with urgent financial needs can support one
                another through mutual cooperation. giveNtake.world is the
                world&rsquo;s first online helping platform dedicated to
                fostering a supportive community by offering unconditional
                financial assistance. We believe in the power of shared
                responsibility and the profound impact of individuals selflessly
                helping others. In situations where people struggle to meet
                their urgent financial needs through formal financial systems,
                giveNtake.world provides a valuable alternative to address these
                challenges. Recognizing that mutual support is the foundation of
                our platform, people here willingly step forward to help others
                unconditionally, with amounts ranging from ₹150 to ₹5,000.
              </Typography>
              <div className="h-4"></div>
              <Typography
                as="h4"
                className="font-normal leading-[28px] text-white"
              >
                By creating a sustainable and transparent social system where
                individuals can both give and receive financial assistance
                through an organized and disciplined approach, we nurture a
                culture of cooperation and goodwill. Here, members offer and
                extend financial help without expectations to those who joined
                the platform before them. In this way, our platform is built on
                the belief that fostering cooperative individuals can lead to
                significant positive change in society through the simple act of
                helping others.
              </Typography>
            </div>
          </div>
          <div className="h-[125px] w-[125px] md:h-[334.01px] md:w-[334.07px]">
            <Images
              src="/img/about/about-logo.svg"
              alt="Logo"
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="h-32 md:h-36"></div>
        <div className="flex flex-col-reverse items-center justify-between gap-6 lg:flex-row lg:gap-32">
          <div className="h-40 w-40 md:h-[400px] md:w-[400px]">
            <Images
              src="/img/about/missionandvission.svg"
              alt="Logo"
              className="h-full w-full"
            />
          </div>

          <div className="w-full">
            <Typography
              as="h5"
              className="text-center text-[40px] font-semibold leading-[46.88px] text-white md:text-left"
            >
              Our Vision & Mission
            </Typography>
            <div className="text-center md:text-left">
              <div className="h-4 md:h-[29px]"></div>
              <Typography
                as="h4"
                className="font-normal leading-[28px] text-white"
              >
                Our vision and mission is to create an opportunity for
                individuals in urgent need of financial assistance to achieve
                financial security through mutual, unconditional support through
                the Giventake.world online helping platform.
              </Typography>
            </div>
          </div>
        </div>

        {/* <div className="h-32 md:h-36"></div>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-44">
          <div className="w-full">
            <Typography
              as="h5"
              className="text-center text-[40px] font-semibold leading-[46.88px] text-white md:text-left"
            >
              Our Mission
            </Typography>
            <div className="text-center md:text-left">
              <div className="h-4 md:h-[29px]"></div>
              <Typography
                as="h4"
                className="font-normal leading-[28px] text-white"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Typography>
            </div>
          </div>
          <div className="h-[147px] w-[212px] md:h-[252px] md:w-[363.22px]">
            <Images
              src="/img/about/mission.svg"
              alt="Logo"
              className="h-full w-full"
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AboutUs;
