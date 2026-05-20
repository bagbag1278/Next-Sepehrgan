import VillaSlider from './components/SliderPopularArea/VillaSlider';
import SecoundContainer from './components/secoundContainer/SecoundContainer';
import ThirdContainer from './components/thirdContainer/ThirdContainer';
import TopCategories from './components/TopCategories/TopCategories';
import FirstContainer from './components/FirstContainer/FirstContainer';
import BuyAndSellSlider from './components/BuyAndSellSlider/BuyAndSellSlider';
import UserComments from './components/Comments/UserComments';

const Landing = () => {
  return (
    <div className=' w-full flex flex-col gap-18' dir='rtl'>
      {/* **** Top categories **** */}
      <TopCategories />
      {/* **** buy and sell sliedr **** */}
      <BuyAndSellSlider />   
      {/* *** container ***  */}
      <FirstContainer />
      {/**** popular area Slider ****/}
      <VillaSlider />

      {/* **** secound container **** */}
        <SecoundContainer />
      {/* *** third container *** */}
      <ThirdContainer />
      {/* **** users comment **** */}
      <UserComments />
    </div>
  )
}

export default Landing;
