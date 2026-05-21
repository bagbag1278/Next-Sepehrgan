"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Arrow from "@/components/landing/components/HeroSction/Icon/IconAndd/FilterIcon/Arrow";
import Search from "@/components/landing/components/HeroSction/Icon/IconAndd/Search/Search";

const cities = [
  { id: "mazandaran", name: "مازندران" },
  { id: "sari", name: "ساری" },
  { id: "tehran", name: "تهران" },
  { id: "babolsar", name: "بابلسر" },
  { id: "ramsar", name: "رامسر" },
  { id: "noshahr", name: "نوشهر" },
  { id: "sari-salman-farsi", name: "ساری، سلمان فارسی" },
  { id: "sari-farah-abad", name: "ساری، فرح آباد" },
  { id: "sari-helal-ahmar", name: "ساری، هلال احمر" },
  { id: "ramsar-moallem", name: "رامسر، بلوار معلم" },
  { id: "noshahr-azadi", name: "نوشهر، خیابان آزادی" },
  { id: "tehran-saadat-abad", name: "تهران، سعادت آباد" },
  { id: "babolsar-oboori", name: "بابلسر، کوچه عبوری" },
];

const HeroDropdowns = ({ type }: { type: string }) => {
  const router = useRouter();
  const params = useParams();

  const initialCity = Array.isArray(params?.city) 
    ? params.city[0] 
    : (params?.city || "");

  const [cityId, setCityId] = useState<string>(initialCity as string);
  const [selectedCityName, setSelectedCityName] = useState("انتخاب کن");
  const [checkIn, setCheckIn] = useState<any>(null);
  const [checkOut, setCheckOut] = useState<any>(null);
  const [guests, setGuests] = useState("انتخاب کن");
  const [category, setCategory] = useState("apartment");
  const [priceRange, setPriceRange] = useState("انتخاب کن");

const handleSearch = () => {
  if (!cityId && !initialCity) {
    alert("لطفاً مقصد را انتخاب کنید");
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
    return (
      <div
        className="w-[882px] h-[500px] flex items-start whitespace-nowrap dark:text-black relative bottom-5"
        dir="rtl"
      >
        <div className="flex items-center w-full relative">
          <div className="w-[180px] h-[70px] flex flex-col justify-center px-4">
            <span className="text-[16px] font-bold text-[#060425]">مقصد</span>
            <div className="absolute mb-6.5 mr-12">
              <Arrow />
            </div>
            <div className="dropdown dropdown-bottom">
              <div
                tabIndex={0}
                role="button"
                className="text-gray-400 text-[15px] mt-1 flex items-center gap-2 cursor-pointer"
              >
                {selectedCityName}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 absolute shadow bg-white rounded-box w-80 border-green-400 rounded-tl-[40px] rounded-br-[40px] -left-20 border-b max-h-69 overflow-y-auto mt-2"
              >
                {cities.map((c) => (
                  <li
                    className="hover:bg-gray-200 rounded-lg text-[#10088F] mt-1"
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

          <div className="w-[1px] h-[60px] bg-gray-300 mx-4"></div>

       {type === "booking" || type === "rent" ? (
            <>
            <div className="w-[180px] h-[70px] flex flex-col justify-center px-4">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-bold text-[#060425]">
                    تاریخ ورود
                  </span>
                  <Arrow />
                </div>
                <div>
                  <DatePicker
                    value={checkIn}
                    onChange={setCheckIn}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    placeholder="انتخاب کن"
                    inputClass="bg-transparent border-none text-gray-400 text-[15px] cursor-pointer outline-none w-full"
                  />
                </div>
              </div>

              <div className="text-gray-400 font-bold text-2xl relative left-4">
                —
              </div>

             <div className="w-[180px] h-[70px] flex flex-col justify-center px-4">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-bold text-[#060425]">
                    تاریخ خروج
                  </span>
                  <Arrow />
                </div>
                <div className="mt-1">
                  <DatePicker
                    value={checkOut}
                    onChange={setCheckOut}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    placeholder="انتخاب کن"
                    inputClass="bg-transparent border-none text-gray-400 text-[15px] cursor-pointer outline-none w-full"
                  />
                </div>
              </div>

              <div className="w-[1px] h-[60px] bg-gray-300 mx-4"></div>

              <div className="w-[150px] h-[70px] flex flex-col justify-center px-4">
                <span className="text-[16px] font-bold text-[#060425]">
                  تعداد نفرات
                </span>
                <div className="dropdown dropdown-bottom">
                  <div
                    tabIndex={0}
                    role="button"
                    className="text-gray-400 text-[15px] mt-1 flex items-center gap-2 cursor-pointer"
                  >
                    {guests}{" "}
                    <div className="absolute mb-14 mr-22">
                      <Arrow />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-white rounded-box w-32 z-[110] mt-2"
                  >
                    {["1", "2", "3", "4+"].map((g) => (
                      <li key={g}>
                        <button
                          onClick={() => {
                            setGuests(g);
                            (document.activeElement as HTMLElement).blur();
                          }}
                        >
                          {g} نفر
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>چ              <div className="w-[180px] h-[70px] flex flex-col justify-center px-4">
                <span className="text-[16px] font-bold text-[#060425]">
                  نوع ملک
                </span>
                <div className="dropdown dropdown-bottom">
                  <div
                    tabIndex={0}
                    role="button"
                    className="text-gray-400 text-[15px] mt-1 flex items-center gap-2 cursor-pointer"
                  >
                    {category} <Arrow />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-white rounded-box w-48 z-[110] mt-2"
                  >
                    <li key="apartment">
                      <button
                        onClick={() => {
                          setCategory("apartment");
                          (document.activeElement as HTMLElement).blur();
                        }}
                      >
                        آپارتمان
                      </button>
                    </li>
                    <li key="villa">
                      <button
                        onClick={() => {
                          setCategory("villa");
                          (document.activeElement as HTMLElement).blur();
                        }}
                      >
                        ویلایی
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-[1px] h-[60px] bg-gray-300 mx-4"></div>

              <div className="w-[180px] h-[70px] flex flex-col justify-center px-4">
                <span className="text-[16px] font-bold text-[#060425]">
                  بودجه
                </span>
                <div className="dropdown dropdown-bottom">
                  <div
                    tabIndex={0}
                    role="button"
                    className="text-gray-400 text-[15px] mt-1 flex items-center gap-2 cursor-pointer"
                  >
                    {priceRange} <Arrow />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 z-[110] mt-2"
                  >
                    {["any", "budget_1", "budget_2"].map((p) => (
                      <li key={p}>
                        <button
                          onClick={() => {
                            setPriceRange(p);
                            (document.activeElement as HTMLElement).blur();
                          }}
                        >
                          {p}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

         <div className="mr-auto pl-10">
            <button
              className="btn bg-[#060425] w-[120px] h-[48px] rounded-[16px] text-white hover:bg-black transition-all flex items-center justify-center gap-2 border-none"
              onClick={handleSearch}
            >
              <span>جستجو</span> <Search />
            </button>
          </div>
        </div>
      </div>
    );
  };

export default HeroDropdowns;
