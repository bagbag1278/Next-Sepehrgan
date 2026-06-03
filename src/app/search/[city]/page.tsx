"use client";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from "next/navigation";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Arrow from "@/components/landing/components/HeroSction/Icon/IconAndd/FilterIcon/Arrow";
import Search from "@/components/landing/components/HeroSction/Icon/IconAndd/Search/Search";

const HeroDropdowns = ({ type }: { type: string }) => {
  const t = useTranslations('HeroDropdowns');
  const router = useRouter();
  const params = useParams();

  const cities = [
    { id: "mazandaran", name: t('mazandaran') },
    { id: "sari", name: t('sari') },
    { id: "tehran", name: t('tehran') },
    { id: "babolsar", name: t('babolsar') },
    { id: "ramsar", name: t('ramsar') },
    { id: "noshahr", name: t('noshahr') },
    { id: "sari-salman-farsi", name: t('sariSalmanFarsi') },
    { id: "sari-farah-abad", name: t('sariFarahAbad') },
    { id: "sari-helal-ahmar", name: t('sariHelalAhmar') },
    { id: "ramsar-moallem", name: t('ramsarMoallem') },
    { id: "noshahr-azadi", name: t('noshahrAzadi') },
    { id: "tehran-saadat-abad", name: t('tehranSaadatAbad') },
  ];

  const initialCity = Array.isArray(params?.city) 
    ? params.city[0] 
    : (params?.city || "");

  const [cityId, setCityId] = useState<string>(initialCity as string);
  const [selectedCityName, setSelectedCityName] = useState(t('select'));
  const [checkIn, setCheckIn] = useState<any>(null);
  const [checkOut, setCheckOut] = useState<any>(null);
  const [guests, setGuests] = useState(t('select'));
  const [category, setCategory] = useState(t('apartment'));
  const [priceRange, setPriceRange] = useState(t('select'));

  const handleSearch = () => {
    if (!cityId && !initialCity) {
      alert(t('selectDestinationAlert'));
      return;
    }

    const query = new URLSearchParams();
    query.set("type", type);
    query.set("city", cityId || initialCity);

    if (type === "booking") {
      if (checkIn) {
        const enCheckIn = checkIn.toDate().toLocaleDateString('en-CA'); 
        query.set("check_in", enCheckIn);
      }
      if (checkOut) {
        const enCheckOut = checkOut.toDate().toLocaleDateString('en-CA');
        query.set("check_out", enCheckOut);
      }
      query.set("guests", guests);
      router.push(`/housereserve/?${query.toString()}`);
    } 
    else if (type === "rent") {
      query.set("category", category);
      query.set("price", priceRange);
      router.push(`/houserent/?${query.toString()}`);
    } 
    else {
      query.set("category", category);
      query.set("price", priceRange);
      router.push(`/houserent/?${query.toString()}`);
    }
  };

  const budgetOptions = [
    { id: "any", label: t('anyBudget') },
    { id: "budget_1", label: t('budget1') },
    { id: "budget_2", label: t('budget2') },
  ];

  return (
    <div className="w-[882px] h-[500px] flex items-start whitespace-nowrap dark:text-black relative bottom-5" dir="rtl">
      <div className="flex items-center w-full relative">
        {/* Destination */}
        <div className="w-[180px] h-[70px] flex flex-col justify-center px-4">
          <span className="text-[16px] font-bold text-[#060425]">{t('destination')}</span>
          <div className="absolute mb-6.5 mr-12"><Arrow /></div>
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="text-gray-400 text-[15px] mt-1 flex items-center gap-2 cursor-pointer">
              {selectedCityName}
            </div>
            <ul tabIndex={0} className="dropdown-content menu p-2 absolute shadow bg-white rounded-box w-80 border-green-400 rounded-tl-[40px] rounded-br-[40px] -left-20 border-b max-h-69 overflow-y-auto mt-2">
              {cities.map((c) => (
                <li className="hover:bg-gray-200 rounded-lg text-[#10088F] mt-1" key={c.id}>
                  <button onClick={() => {
                    setCityId(c.id);
                    setSelectedCityName(c.name);
                    (document.activeElement as HTMLElement).blur();
                  }}>
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-[1px] h-[60px] bg-gray-300 mx-4"></div>

        {type === "booking" || type === "rent" ? (
          <>
            {/* Check-in Date */}
            <div className="w-[180px] h-[70px] flex flex-col justify-center px-4">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-bold text-[#060425]">{t('checkIn')}</span>
                <Arrow />
              </div>
              <div>
                <DatePicker
                  value={checkIn}
                  onChange={setCheckIn}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  placeholder={t('select')}
                  inputClass="bg-transparent border-none text-gray-400 text-[15px] cursor-pointer outline-none w-full"
                />
              </div>
            </div>

            <div className="text-gray-400 font-bold text-2xl relative left-4">—</div>

            {/* Check-out Date */}
            <div className="w-[180px] h-[70px] flex flex-col justify-center px-4">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-bold text-[#060425]">{t('checkOut')}</span>
                <Arrow />
              </div>
              <div className="mt-1">
                <DatePicker
                  value={checkOut}
                  onChange={setCheckOut}
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  placeholder={t('select')}
                  inputClass="bg-transparent border-none text-gray-400 text-[15px] cursor-pointer outline-none w-full"
                />
              </div>
            </div>

            <div className="w-[1px] h-[60px] bg-gray-300 mx-4"></div>

            {/* Guests */}
            <div className="w-[150px] h-[70px] flex flex-col justify-center px-4">
              <span className="text-[16px] font-bold text-[#060425]">{t('guests')}</span>
              <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="text-gray-400 text-[15px] mt-1 flex items-center gap-2 cursor-pointer">
                  {guests} <div className="absolute mb-14 mr-22"><Arrow /></div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-32 z-[110] mt-2">
                  {["1", "2", "3", "4+"].map((g) => (
                    <li key={g}>
                      <button onClick={() => {
                        setGuests(g);
                        (document.activeElement as HTMLElement).blur();
                      }}>
                        {g} {t('people')}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Property Type */}
            <div className="w-[180px] h-[70px] flex flex-col justify-center px-4">
              <span className="text-[16px] font-bold text-[#060425]">{t('propertyType')}</span>
              <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="text-gray-400 text-[15px] mt-1 flex items-center gap-2 cursor-pointer">
                  {category} <Arrow />
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-48 z-[110] mt-2">
                  <li key="apartment">
                    <button onClick={() => {
                      setCategory(t('apartment'));
                      (document.activeElement as HTMLElement).blur();
                    }}>
                      {t('apartment')}
                    </button>
                  </li>
                  <li key="villa">
                    <button onClick={() => {
                      setCategory(t('villa'));
                      (document.activeElement as HTMLElement).blur();
                    }}>
                      {t('villa')}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-[1px] h-[60px] bg-gray-300 mx-4"></div>

            {/* Budget */}
            <div className="w-[180px] h-[70px] flex flex-col justify-center px-4">
              <span className="text-[16px] font-bold text-[#060425]">{t('budget')}</span>
              <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="text-gray-400 text-[15px]mt-1 flex items-center gap-2 cursor-pointer">
                  {priceRange} <Arrow />
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 z-[110] mt-2">
                  {budgetOptions.map((p) => (
                    <li key={p.id}>
                      <button onClick={() => {
                        setPriceRange(p.label);
                        (document.activeElement as HTMLElement).blur();
                      }}>
                        {p.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {/* Search Button */}
        <div className="mr-auto pl-10">
          <button
            className="btn bg-[#060425] w-[120px] h-[48px] rounded-[16px] text-white hover:bg-black transition-all flex items-center justify-center gap-2 border-none"
            onClick={handleSearch}
          >
            <span>{t('search')}</span> <Search />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroDropdowns;