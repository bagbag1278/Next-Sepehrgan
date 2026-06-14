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


const Landing = () => {
  const t = useTranslations("Landing");

  return (
    <div className='w-full flex flex-col gap-18' dir='rtl'>
      
      <AdvancedScrollAnimation type="fade" delay={0.1}>
        <div className=''>
          <HeroSction />
          
        </div>
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="slide-up" delay={0.2}>
        <TopCategories />
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="slide-left" delay={0.3}>
        <BuyAndSellSlider />
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="scale" delay={0.4}>
        <FirstContainer />
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="slide-right" delay={0.5}>
        <VillaSlider />
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="slide-up" delay={0.6}>
        <SecoundContainer />
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="fade" delay={0.7}>
        <ThirdContainer />
      </AdvancedScrollAnimation>

      <AdvancedScrollAnimation type="scale" delay={0.8}>
        <UserComments />
      </AdvancedScrollAnimation>

    </div>
  );
}

export default Landing;