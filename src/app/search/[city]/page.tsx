"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Search from "@/components/landing/components/HeroSction/Icon/IconAndd/Search/Search";

const cities = [
  { id: "tehran", name: "تهران" },
  { id: "shiraz", name: "شیراز" },
  { id: "isfahan", name: "اصفهان" },
  { id: "mashhad", name: "مشهد" },
  { id: "tabriz", name: "تبریز" },
  { id: "karaj", name: "کرج" },
  { id: "mazandaran", name: "مازندران" },
  { id: "gilan", name: "گیلان" },
  { id: "kish", name: "کیش" },
  { id: "qeshm", name: "قشم" },
  { id: "yazd", name: "یزد" },
  { id: "ahvaz", name: "اهواز" },
];

const HeroDropdowns = () => {
  const router = useRouter();
  const params = useParams();

  const getCurrentCityName = () => {
    const cityIdFromUrl = params?.city;
    const foundCity = cities.find((c) => c.id === cityIdFromUrl);
    return foundCity ? foundCity.name : "انتخاب کن";
  };

  const [cityId, setCityId] = useState("");
  const [selected1, setSelected1] = useState(getCurrentCityName());
  const [selected2, setSelected2] = useState("انتخاب کن ");
  const [selected3, setSelected3] = useState("انتخاب کن ");
  const [selected4, setSelected4] = useState("مقصد ");

  const items2 = ["خرید", "فروش", "اجاره"];
  const items3 = ["۱ نفر", "۲ نفر", "۳ نفر", "۴ نفر به بالا"];
  const items4 = ["مازندران", "ساری", "لفور", "تهران", "کردان"];

  // تابع اصلی جستجو
  const handleSearch = () => {
    if (!cityId) {
      alert("لطفاً ابتدا یک شهر را انتخاب کنید");
      return;
    }

    // هدایت به صفحه رزرو همراه با تمام فیلترها در URL
    const queryString = `city=${cityId}&deal=${selected2}&guests=${selected3}&exact=${selected4}`;
    router.push(`/HouseResever?${queryString}`);
  };

  useEffect(() => {
    const cityName = getCurrentCityName();
    setSelected1(cityName);
    // اگر در URL شهر وجود داشت، ID آن را هم ست کن
    const found = cities.find(c => c.name === cityName);
    if (found) setCityId(found.id);
  }, [params?.city]);

  return (
    <>
      {/* ۱. دراپ‌دان شهر */}
      <div className="dropdown dropdown-center absolute bottom-[1px] mr-[-15px]">
        <div
          tabIndex={0}
          role="button"
          className="m-1 bg-[#F5F5F5] border-none max- text-gray-600 font-normal text-[14px] cursor-pointer relative bottom-3 right-3"
        >
          {selected1}
        </div>

        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-[#F5F5F5] rounded-box z-[1] w-52 p-2 shadow-sm max-h-60 overflow-y-auto"
        >
          {cities.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                onClick={() => {
                  setSelected1(city.name);
                  setCityId(city.id);
                  (document.activeElement as HTMLElement).blur();
                }}
                className="text-right w-full block px-4 py-2 hover:bg-gray-200"
              >
                {city.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ۲. دراپ‌دان نوع معامله */}
      <div className="dropdown dropdown-center absolute bottom-[1px] mr-[165px]">
        <div
          tabIndex={0}
          role="button"
          className="m-1 bg-[#F5F5F5] border-none text-gray-600 font-normal text-[14px] cursor-pointer relative bottom-3 right-3"
        >
          {selected2}
        </div>

        <ul tabIndex={-1} className="dropdown-content menu bg-[#F5F5F5] rounded-box z-[1] w-52 p-2 shadow-sm">
          {items2.map((item) => (
            <li key={item}>
              <button onClick={() => { setSelected2(item); (document.activeElement as HTMLElement).blur(); }}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown dropdown-center absolute bo  bottom-[1px] mr-[340px]">
        <div
          tabIndex={0}
          role="button"
          className="m-1 bg-[#F5F5F5] border-none text-gray-600 font-normal text-[14px] cursor-pointer relative bottom-3 right-3"
        >
          {selected3}
        </div>

        <ul tabIndex={-1} className="dropdown-content menu bg-[#F5F5F5] rounded-box w-52 p-2 absolute top-3 -right-30     shadow-sm">
          {items3.map((item) => (
            <li key={item}>
              <button onClick={() => { setSelected3(item); (document.activeElement as HTMLElement).blur(); }}>
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="dropdown dropdown-center absolute bottom-[1px] mr-[-235px]">
        <div
          tabIndex={0}
          role="button"
          className="m-1 bg-[#F5F5F5] border-none text-gray-600 font-normal text-[14px] cursor-pointer absolute bottom-4 right-4"
        >
          {selected4}
        </div>

        <ul tabIndex={-1} className="dropdown-content menu bg-[#F5F5F5] rounded-box z-[1] w-52 p-2 shadow-sm relative top-40 left-30">
          {items4.map((item) => (
            <li key={item}>
              <button onClick={() => { setSelected4(item); (document.activeElement as HTMLElement).blur(); }}>
                {item}
              </button>
            </li>
          ))}
        </ul>

        <div className="relative right-190 bottom-5">
          <button
            className="btn bg-[#060425] w-[120px] h-[48px] rounded-[16px] relative cursor-pointer text-white text-[14px] font-medium hover:bg-[#0a0835] transition-all flex items-center justify-center gap-2"
            onClick={handleSearch}
          >
            <span>جستجو</span>
            <Search />
          </button>
        </div>
      </div>
    </>
  );
};

export default HeroDropdowns;