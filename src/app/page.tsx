import ChatOnWhatsapp from '@/features/HomePage/ChatOnWhatsapp';
import Conferrence from '@/features/HomePage/Conferrence';
// import DownLoadMobileAppNew from '@/features/HomePage/DownLoadMobileAppNew';
// import DownloadMobileApp from '@/features/HomePage/DownloadMobileApp';
import FaqSection from '@/features/HomePage/FaqSection';
import GiventakeWorld from '@/features/HomePage/GiventakeWorld';
import GroupOfCompanies from '@/features/HomePage/GroupOfCompanies';
import HelpingPlatform from '@/features/HomePage/HelpingPlatform';
import HeroSection from '@/features/HomePage/HeroSection';
import WordfromFounder from '@/features/HomePage/WordfromFounder';

export default function Home() {
  return (
    <>
      <div className="bg-[#02158A]">
        <HeroSection />
        <GiventakeWorld />
        <WordfromFounder />
        <HelpingPlatform />
        {/* <DownloadMobileApp /> */}
        {/* <DownLoadMobileAppNew /> */}
        <Conferrence />
        <ChatOnWhatsapp />
        <GroupOfCompanies />
        <FaqSection />
      </div>
    </>
  );
}
