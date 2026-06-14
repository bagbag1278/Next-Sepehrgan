import { useTranslations } from "next-intl";
import VillaSlider from './components/SliderPopularArea/VillaSlider';
import SecoundContainer from './components/secoundContainer/SecoundContainer';
import ThirdContainer from './components/thirdContainer/ThirdContainer';
import TopCategories from './components/TopCategories/TopCategories';
import FirstContainer from './components/FirstContainer/FirstContainer';
import BuyAndSellSlider from './components/BuyAndSellSlider/BuyAndSellSlider';
import UserComments from './components/Comments/UserComments';
import HeroSction from './components/HeroSction/HeroSction';
import AdvancedScrollAnimation from '@/components/common/Animation/AdvancedScrollAnimation';
import FleshRight from "./components/HeroSction/Icon/Flash/FleshRight";
import FleshRght2 from "./components/HeroSction/Icon/Flash/FleshRght2";
import FleshRight3 from "./components/HeroSction/Icon/Flash/FleshRight3";


const Landing = () => {
  const t = useTranslations("Landing");

  return (
    <div className='w-full flex flex-col gap-18' dir='rtl'>
      
      <AdvancedScrollAnimation type="fade" delay={0.1}>
        <div className=''>
          <HeroSction />
          <div className="hidden lg:block xl:block sm:hidden relative left-10 ">
            <div className="absolute bottom-40  flex  right-0 items-center gap-3 rotate-90 whitespace-nowrap max-[1420]:hidden">
              <span className="text-[12px] font-medium text-[#15977D80]">
                {t('scrollText')}
              </span>
              <div className="relative left-1 bottom-2">
                <div className="-rotate-90 -left-5 bottom-4 relative">
                  <FleshRight />
                </div>
                <div className="-rotate-90 absolute top-16">
                  <FleshRght2 />
                </div>
                <div className="-rotate-90 absolute top-9">
                  <FleshRight3 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdvancedScrollAnimation>

      {/* **** secound container **** */}
        <SecoundContainer />
      {/* *** third container *** */}
      <ThirdContainer />
      {/* **** users comment **** */}
      <UserComments />
    </div>
  );
}

export default Landing;
