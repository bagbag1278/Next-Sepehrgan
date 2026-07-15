import { useTranslations } from 'next-intl';
import SldierIcon4 from "../Icon/Slider/SldierIcon4";
import SliderIcon10 from "../Icon/Slider/SliderIcon10";
import SliderIcon11 from "../Icon/Slider/SliderIcon11";
import SliderIcon12 from "../Icon/Slider/SliderIcon12";
import SliderIcon2 from "../Icon/Slider/SliderIcon2";
import SliderIcon3 from "../Icon/Slider/SliderIcon3";
import SliderIcon5 from "../Icon/Slider/SliderIcon5";
import SliderIcon6 from "../Icon/Slider/SliderIcon6";
import SliderIcon7 from "../Icon/Slider/SliderIcon7";
import SliderIcon8 from "../Icon/Slider/SliderIcon8";
import SliderIcon9 from "../Icon/Slider/SliderIcon9";
import SlidersIcon1 from "../Icon/Slider/SlidersIcon1";

export const useCategories = () => {
    const t = useTranslations('Categories');

    return [
        { icon: <SliderIcon11 />, label: t('store') },
        { icon: <SliderIcon10 />, label: t('villa') },
        { icon: <SliderIcon9 />, label: t('office') },
        { icon: <SliderIcon8 />, label: t('store') },
        { icon: <SliderIcon7 />, label: t('restArea') },
        { icon: <SliderIcon6 />, label: t('store') },
        { icon: <SliderIcon5 />, label: t('store') },
        { icon: <SldierIcon4 />, label: t('office') },
        { icon: <SliderIcon3 />, label: t('withPool') },
        { icon: <SliderIcon2 />, label: t('villa') },
        { icon: <SlidersIcon1 />, label: t('school') },
        { icon: <SliderIcon12 />, label: t('apartment') },
        { icon: <SliderIcon6 />, label: t('store') },
        { icon: <SliderIcon5 />, label: t('store') },
        { icon: <SliderIcon9 />, label: t('office') },
        { icon: <SliderIcon8 />, label: t('store') },
    ];
};