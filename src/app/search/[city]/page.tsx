"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import gregorian from "react-date-object/calendars/gregorian";
import en_us from "react-date-object/locales/gregorian_en";
import { ChevronDown } from "lucide-react";
import Search from "@/components/landing/components/HeroSction/Icon/IconAndd/Search/Search";

const HeroDropdowns = ({ type }: { type: string }) => {
  const t = useTranslations("HeroDropdowns");
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();

  // تنظیم تقویم بر اساس زبان
  const getCalendarConfig = () => {
    switch (locale) {
      case "fa":
        return { calendar: persian, locale: persian_fa };
      case "ar":
        return { calendar: arabic, locale: arabic_ar };
      default:
        return { calendar: gregorian, locale: en_us };
    }
  };

  const calendarConfig = getCalendarConfig();

  const cities = [
    { id: "mazandaran", name: t("mazandaran") },
    { id: "sari", name: t("sari") },
    { id: "tehran", name: t("tehran") },
    { id: "babolsar", name: t("babolsar") },
    { id: "ramsar", name: t("ramsar") },
    { id: "noshahr", name: t("noshahr") },
    { id: "sari-salman-farsi", name: t("sariSalmanFarsi") },
    { id: "sari-farah-abad", name: t("sariFarahAbad") },
    { id: "sari-helal-ahmar", name: t("sariHelalAhmar") },
    { id: "ramsar-moallem", name: t("ramsarMoallem") },
    { id: "noshahr-azadi", name: t("noshahrAzadi") },
    { id: "tehran-saadat-abad", name: t("tehranSaadatAbad") },
  ];

  const initialCity = Array.isArray(params?.city)
    ? params.city[0]
    : params?.city || "";

  const [cityId, setCityId] = useState<string>(initialCity as string);
  const [selectedCityName, setSelectedCityName] = useState(t("select"));
  const [checkIn, setCheckIn] = useState<any>(null);
  const [checkOut, setCheckOut] = useState<any>(null);
  const [guests, setGuests] = useState(t("select"));
  const [category, setCategory] = useState(t("apartment"));
  const [priceRange, setPriceRange] = useState(t("select"));

  // بازنشانی مقادیر هنگام تغییر زبان
  useEffect(() => {
    setSelectedCityName(t("select"));
    setGuests(t("select"));
    setPriceRange(t("select"));
  }, [locale, t]);

  const handleSearch = () => {
    if (!cityId && !initialCity) {
      alert(t("selectDestinationAlert"));
      return;
    }

    const query = new URLSearchParams();
    query.set("type", type);
    query.set("city", cityId || initialCity);

    if (type === "booking") {
      if (checkIn) {
        const enCheckIn = checkIn.toDate().toLocaleDateString("en-CA");
        query.set("check_in", enCheckIn);
      }
      if (checkOut) {
        const enCheckOut = checkOut.toDate().toLocaleDateString("en-CA");
        query.set("check_out", enCheckOut);
      }
      query.set("guests", guests);
      router.push(`/housereserve/?${query.toString()}`);
    } else {
      query.set("category", category);
      query.set("price", priceRange);
      router.push(`/houserent/?${query.toString()}`);
    }
  };

  const budgetOptions = [
    { id: "any", label: t("anyBudget") },
    { id: "budget_1", label: t("budget1") },
    { id: "budget_2", label: t("budget2") },
  ];

  // محاسبه عرض داینامیک بر اساس طول متن
  const getDynamicWidth = (text: string) => {
    const charWidth = locale === "ar" ? 14 : 12;
    const minWidth = 140;
    const maxWidth = 250;
    const calculatedWidth = Math.min(
      maxWidth,
      Math.max(minWidth, text.length * charWidth + 40),
    );
    return `${calculatedWidth}px`;
  };

  return (
    <div
      className="w-full flex items-start whitespace-nowrap dark:text-white relative bottom-5 bg-transparent"
      dir="rtl"
    >
      <div className="flex flex-wrap items-center w-full gap-2">
        {/* Destination */}
        <div
          className=" h-[70px]  flex flex-col justify-center px-4 relative"
          style={{ width: getDynamicWidth(selectedCityName) }}
        >
          <span className="text-[16px] font-bold text-[#060425] dark:text-white whitespace-nowrap">
            {t("destination")}
          </span>
          <div className="dropdown dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="text-gray-400 dark:text-gray-500 text-[15px] mt-1 flex items-center gap-2 cursor-pointer"
            >
              {selectedCityName}
              <ChevronDown
                size={14}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
            <ul className="dropdown-content menu p-2 absolute shadow  bg-white dark:bg-gray-800 rounded-box w-80 -left-24 border-green-400 rounded-tl-[40px] rounded-br-[40px] border-b max-h-69 overflow-y-auto  mt-4">
              {cities.map((c) => (
                <li
                  className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-[#10088F] dark:text-white mt-1"
                  key={c.id}
                >
                  <button
                    onClick={() => {
                      setCityId(c.id);
                      setSelectedCityName(c.name);
                      (document.activeElement as HTMLElement).blur();
                    }}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-[1px] h-[60px] bg-gray-300 dark:bg-gray-700 mx-2 flex-shrink-0"></div>

        {type === "booking" ? (
          <>
            {/* Check-in Date */}
            <div className="min-w-[140px] max-w-[200px] min-h-[70px] h-auto flex flex-col justify-center px-4 relative z-20">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-bold text-[#060425] dark:text-white whitespace-nowrap">
                  {t("checkIn")}
                </span>
                <ChevronDown
                  size={14}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <DatePicker
                value={checkIn}
                onChange={setCheckIn}
                calendar={calendarConfig.calendar}
                locale={calendarConfig.locale}
                calendarPosition="bottom-start"
                placeholder={t("select")}
                inputClass="bg-transparent border-none text-gray-400 dark:text-gray-500 text-[15px] cursor-pointer outline-none w-full"
                containerClassName="w-full"
                portal={true}
              />
            </div>

            <div className="text-gray-400 dark:text-gray-500 font-bold text-2xl left-10 relative">
              —
            </div>

            {/* Check-out Date */}
            <div className="min-w-[140px] max-w-[200px] min-h-[70px] h-auto flex flex-col justify-center px-4 relative z-20">
              <div className="flex items-center gap-2">
                <span className="text-[16px] font-bold text-[#060425] dark:text-white whitespace-nowrap">
                  {t("checkOut")}
                </span>
                <ChevronDown
                  size={14}
                  className="text-gray-400 dark:text-gray-500"
                />
              </div>
              <DatePicker
                value={checkOut}
                onChange={setCheckOut}
                calendar={calendarConfig.calendar}
                locale={calendarConfig.locale}
                calendarPosition="bottom-start"
                placeholder={t("select")}
                inputClass="bg-transparent border-none text-gray-400 dark:text-gray-500 text-[15px] cursor-pointer outline-none w-full"
                containerClassName="w-full"
                portal={true}
              />
            </div>

            <div className="w-[1px] h-[60px] relative left-12 bg-gray-300 dark:bg-gray-700 mx-2 "></div>

            {/* Guests */}
            <div className="min-w-[120px] max-w-[180px] h-[70px] flex flex-col justify-center px-4 relative left-10">
              <span className="text-[16px] font-bold text-[#060425] dark:text-white whitespace-nowrap">
                {t("guests")}
              </span>
              <div className="dropdown dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className="text-gray-400 dark:text-gray-500 text-[15px] mt-1 flex items-center gap-2 cursor-pointer"
                >
                  {guests}
                  <ChevronDown
                    size={14}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <ul className="dropdown-content menu p-2 shadow bg-white dark:bg-gray-800 rounded-box w-32 z-[999] mt-2">
                  {["1", "2", "3", "4+"].map((g) => (
                    <li key={g}>
                      <button
                        onClick={() => {
                          setGuests(g);
                          (document.activeElement as HTMLElement).blur();
                        }}
                        className="dark:text-white"
                      >
                        {g} {t("people")}
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
            <div className="min-w-[140px] max-w-[200px] h-[70px] flex flex-col justify-center px-4">
              <span className="text-[16px] font-bold text-[#060425] dark:text-white whitespace-nowrap">
                {t("propertyType")}
              </span>
              <div className="dropdown dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className="text-gray-400 dark:text-gray-500 text-[15px] mt-1 flex items-center gap-2 cursor-pointer"
                >
                  {category}
                  <ChevronDown
                    size={14}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <ul className="dropdown-content menu p-2 shadow bg-white dark:bg-gray-800 rounded-box w-48 z-[999] mt-2">
                  <li key="apartment">
                    <button
                      onClick={() => {
                        setCategory(t("apartment"));
                        (document.activeElement as HTMLElement).blur();
                      }}
                      className="dark:text-white"
                    >
                      {t("apartment")}
                    </button>
                  </li>
                  <li key="villa">
                    <button
                      onClick={() => {
                        setCategory(t("villa"));
                        (document.activeElement as HTMLElement).blur();
                      }}
                      className="dark:text-white"
                    >
                      {t("villa")}
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-[1px] h-[60px] bg-gray-300 dark:bg-gray-700 mx-2 flex-shrink-0"></div>

            {/* Budget */}
            <div className="min-w-[140px] max-w-[220px] h-[70px] flex flex-col justify-center px-4">
              <span className="text-[16px] font-bold text-[#060425] dark:text-white whitespace-nowrap">
                {t("budget")}
              </span>
              <div className="dropdown dropdown-bottom">
                <div
                  tabIndex={0}
                  role="button"
                  className="text-gray-400 dark:text-gray-500 text-[15px] mt-1 flex items-center gap-2 cursor-pointer"
                >
                  {priceRange}
                  <ChevronDown
                    size={14}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <ul className="dropdown-content menu p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52 z-[999] mt-2">
                  {budgetOptions.map((p) => (
                    <li key={p.id}>
                      <button
                        onClick={() => {
                          setPriceRange(p.label);
                          (document.activeElement as HTMLElement).blur();
                        }}
                        className="dark:text-white"
                      >
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
        <div className="mr-auto pl-4 flex-shrink-0">
          <button
            className="btn bg-[#060425] dark:bg-blue-700 w-[120px] h-[48px] rounded-[16px] text-white hover:bg-black dark:hover:bg-blue-800 transition-all flex items-center justify-center gap-2 border-none cursor-pointer"
            onClick={handleSearch}
          >
            <span>{t("search")}</span> <Search />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroDropdowns;