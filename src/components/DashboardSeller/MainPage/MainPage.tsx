"use client";

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, MinusCircle, MoreVertical, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CirclesIcon from "../Icon/CirclesIcon";
import ClickBoardIco from "../Icon/ClickBoardIco";
import CalenderIco from "../Icon/CalenderIco";
import LoadingIco from "../Icon/LoadingIco";
import PlaceholderIco from "../Icon/PlaceholderIco";
import IncomeChartCard from "./IncomeChartCard";
import ProfileCompletion from "./ProfileCompletion";
import Link from "next/link";
import GetHousesUser, { IHouse } from "@/core/api/DashboardSeller/GetHousesUser";
import formatDate from "@/components/Untils/FormData";
import DeleteHouseModal from "../DeleteHouse/DeleteHouseModal";
import toast from "react-hot-toast";
import DeleteHouse from "@/core/api/DashboardSeller/DeleteHouse";
import Image from "next/image";

const MainPage = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [selectedHouseId, setSelectedHouseId] = useState<number | null>(null);

  const stats = [
    { label: "کل املاک", value: totalCount, icon: <ClickBoardIco /> },
    { label: "رزرو های فعال", value: "۸", icon: <CalenderIco /> },
    { label: "رزرو های انتظار", value: "0", icon: <LoadingIco /> },
    { label: "بازدید ها", value: "0", icon: <PlaceholderIco /> },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetHousesUser();
        setHouses(data.houses);
        setTotalCount(data.totalCount);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    if (!selectedHouseId) return;
    try {
      await DeleteHouse(selectedHouseId);
      setHouses((prev) => prev.filter((house) => Number(house.id) !== selectedHouseId));
      toast.success("ملک حذف شد");
    } catch (error) {
      console.log(error);
      toast.error("حذف ناموفق بود");
    } finally {
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-nowrap  gap-9 transition-colors">

      <div className="flex flex-wrap w-156.5 gap-y-1 space-y-4">

        <motion.div
          className="w-full h-14 flex gap-1"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse scale-x-[-1]">
            <CirclesIcon />
          </div>
          <div className="dark:text-blue-500 text-blue-200 text-[18px] font-bold">
            داشبورد
          </div>
          <div className="w-6.75 h-6.5 flex gap-0.5 items-center flex-wrap-reverse">
            <CirclesIcon />
          </div>
        </motion.div>

        <div className="flex flex-row-reverse gap-4.75">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <Link
              href={"/dashboard/seller/housemanegement"}
              className="w-25 h-30 border border-blue-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-800 text-blue-800 dark:text-white cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-700 transition-all"
            >
              <span className="text-xl">↗</span>
              <span className="text-xs mt-2 font-bold">مشاهده همه</span>
              +{totalCount}
              <span className="text-sm font-bold"></span>
            </Link>
          </motion.div>

          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + (idx + 1) * 0.07, ease: "easeOut" }}
              className="w-27.5 h-30 border border-gray-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center p-2 text-center bg-white dark:bg-slate-800 transition-all"
            >
              <span className="text-2xl text-blue-900 dark:text-blue-400 mb-2">{item.icon}</span>
              <span className="text-xs text-gray-600 dark:text-gray-300 mb-1">{item.label}</span>
              <span className="text-2xl font-bold text-blue-900 dark:text-white">{item.value}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="w-full h-84 overflow-hidden bg-gray-50/50 dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
        >
          <div className="flex justify-between mt-2 bg-white dark:bg-slate-800 mx-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 px-6 py-4 text-gray-500 dark:text-gray-300 text-sm">
            <span>نام اقامتگاه</span>
            <span>تاریخ ثبت</span>
            <span>قیمت</span>
            <span>وضعیت</span>
          </div>

          <div className="h-70 overflow-y-scroll hide-scrollbar overflow-hidden">
            {houses.map((house, idx) => (
              <motion.div
                key={house.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.5 + idx * 0.06, ease: "easeOut" }}
                className="flex items-center justify-between px-4 py-2 mt-2 mx-2 mb-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-slate-700/40 hover:border-gray-200 dark:hover:border-slate-600"
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden">
                    <Image
                      src={house.photos?.[0] ?? "/Image/Image.png"}
                      alt={house.title}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200">{house.title}</span>
                </div>

                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {house.last_updated ? formatDate(house.last_updated) : "تاریخ نامشخص"}
                </span>

                <span className="text-blue-800 dark:text-gray-500 font-medium text-sm">
                  {Number(house.price).toLocaleString("fa-IR")} تومان
                </span>

                <div className="text-green-500">
                  <CheckCircle2 />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <ProfileCompletion />
        <IncomeChartCard />
      </motion.div>

      <AnimatePresence>
        {deleteModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <DeleteHouseModal
              open={deleteModal}
              onClose={() => setDeleteModal(false)}
              onDelete={handleDelete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainPage;
// "use client";

// import React, { useEffect, useRef, useState } from "react";

// import { CheckCircle2, MinusCircle, MoreVertical, XCircle } from "lucide-react";

// import CirclesIcon from "../Icon/CirclesIcon";
// import ClickBoardIco from "../Icon/ClickBoardIco";
// import CalenderIco from "../Icon/CalenderIco";
// import LoadingIco from "../Icon/LoadingIco";
// import PlaceholderIco from "../Icon/PlaceholderIco";

// import IncomeChartCard from "./IncomeChartCard";
// import ProfileCompletion from "./ProfileCompletion";
// import Link from "next/link";
// import GetHousesUser, {
//   IHouse,
// } from "@/core/api/DashboardSeller/GetHousesUser";
// import formatDate from "@/components/Untils/FormData";
// import DeleteHouseModal from "../DeleteHouse/DeleteHouseModal";
// import toast from "react-hot-toast";
// import DeleteHouse from "@/core/api/DashboardSeller/DeleteHouse";
// import Image from "next/image";

// const MainPage = () => {
//   const [openMenu, setOpenMenu] = useState<number | null>(null);
//   const [totalCount, setTotalCount] = useState(0);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const menuRef = useRef<HTMLDivElement | null>(null);
//   const [houses, setHouses] = useState<IHouse[]>([]);
//   const [selectedHouseId, setSelectedHouseId] = useState<number | null>(null);

//   const stats = [
//     {
//       label: "کل املاک",
//       value: totalCount,
//       icon: <ClickBoardIco />,
//     },
//     {
//       label: "رزرو های فعال",
//       value: "۸",
//       icon: <CalenderIco />,
//     },
//     {
//       label: "رزرو های انتظار",
//       value: "0",
//       icon: <LoadingIco />,
//     },
//     {
//       label: "بازدید ها",
//       value: "0",
//       icon: <PlaceholderIco />,
//     },
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await GetHousesUser();
//         // console.log("FULL DATA => ", data);
//         // console.log("HOUSES => ", data.houses);
//         setHouses(data.houses);
//         setTotalCount(data.totalCount);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDelete = async () => {
//     if (!selectedHouseId) return;

//     try {
//       await DeleteHouse(selectedHouseId);

//       setHouses((prev) =>
//         prev.filter((house) => Number(house.id) !== selectedHouseId),
//       );

//       toast.success("ملک حذف شد");
//     } catch (error) {
//       console.log(error);

//       toast.error("حذف ناموفق بود");
//     } finally {
//       setDeleteModal(false);
//     }
//   };

//   // close menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setOpenMenu(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="w-full flex flex-nowrap  gap-9 transition-colors">
//       {/* LEFT SIDE */}
//       <div
//         className="
//                 flex flex-wrap
//                 w-156.5 gap-y-1 space-y-4"
//       >
//         {/* PAGE TITLE */}
//         <div className="w-full h-14 flex gap-1">
//           <div
//             className="
//                         w-6.75 h-6.5
//                         flex gap-0.5
//                         items-center
//                         flex-wrap-reverse
//                         scale-x-[-1]"
//           >
//             <CirclesIcon />
//           </div>

//           <div
//             className="
//                         dark:text-blue-500
//                         text-blue-200
//                         text-[18px]
//                         font-bold"
//           >
//             داشبورد
//           </div>

//           <div
//             className="
//                         w-6.75 h-6.5
//                         flex gap-0.5
//                         items-center
//                         flex-wrap-reverse"
//           >
//             <CirclesIcon />
//           </div>
//         </div>

//         {/* STATS */}
//         <div
//           className="
//                     flex flex-row-reverse
//                     gap-4.75 "
//         >
//           {/* VIEW ALL */}
//           <Link
//             href={"/dashboard/seller/housemanegement"}
//             className="w-25 h-30 border border-blue-200  dark:border-slate-700 rounded-2xl flex
//                         flex-col items-center justify-center
//                         bg-gray-50 dark:bg-slate-800
//                         text-blue-800 dark:text-white cursor-pointer
//                         hover:bg-blue-50 dark:hover:bg-slate-700 transition-all"
//           >
//             <span className="text-xl">↗</span>
//             <span
//               className="
//                             text-xs mt-2 font-bold"
//             >
//               مشاهده همه
//             </span>
//             +{totalCount}
//             <span
//               className="
//                             text-sm font-bold"
//             ></span>
//           </Link>

//           {/* CARDS */}
//           {stats.map((item, idx) => (
//             <div
//               key={idx}
//               className=" w-27.5 h-30 border border-gray-200 dark:border-slate-700 rounded-2xl flex flex-col
//                                  items-center
//                                 justify-center p-2 text-center bg-white dark:bg-slate-800 transition-all"
//             >
//               <span
//                 className="
//                                     text-2xl
//                                     text-blue-900
//                                     dark:text-blue-400
//                                     mb-2"
//               >
//                 {item.icon}
//               </span>

//               <span
//                 className="
//                                     text-xs
//                                     text-gray-600
//                                     dark:text-gray-300
//                                     mb-1"
//               >
//                 {item.label}
//               </span>

//               <span
//                 className="
//                                     text-2xl font-bold
//                                     text-blue-900
//                                     dark:text-white"
//               >
//                 {item.value}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* TABLE */}
//         <div
//           className="
//                     w-full h-84 overflow-hidden
//                     bg-gray-50/50
//                     dark:bg-slate-900
//                     rounded-2xl
//                     border border-gray-100
//                     dark:border-slate-700
//                     transition-colors"
//         >
//           {/* HEADER */}
//           <div
//             className=" flex justify-between mt-2  bg-white dark:bg-slate-800 mx-2 rounded-xl shadow-sm
//                           border border-gray-100 dark:border-slate-700 px-6 py-4 text-gray-500 dark:text-gray-300
//                           text-sm"
//           >
//             <span>نام اقامتگاه</span>

//             <span>تاریخ ثبت</span>

//             <span>قیمت</span>

//             <span>وضعیت</span>
//           </div>

//           {/* ROWS */}
//           <div
//             className="
//                         h-70 overflow-y-scroll
//                         hide-scrollbar
//                         overflow-hidden"
//           >
//             {/* Map Houses  */}
//             {houses.map((house) => (
//               <div
//                 key={house.id}
//                 className="flex items-center  justify-between 
//                             px-4 py-2  mt-2 mx-2 mb-4 bg-white dark:bg-slate-800 rounded-xl
//                             shadow-sm border border-gray-100  dark:border-slate-700 transition-colors  duration-200
//                             hover:bg-gray-50 dark:hover:bg-slate-700/40  hover:border-gray-200 dark:hover:border-slate-600"
//               >
//                 {/* PROPERTY */}
//                 <div className="flex items-center gap-2">
//                   <div className="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden">
//                     <Image
//                       src={house.photos?.[0] ?? "/Image/Image.png"}
//                       alt={house.title}
//                       width={40}
//                       height={40}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <span className="text-sm text-gray-800 dark:text-gray-200">
//                     {house.title}
//                   </span>
//                 </div>

//                 {/* DATE */}
//                 <span className="  text-sm text-gray-600 dark:text-gray-300">
//                   {house.last_updated
//                     ? formatDate(house.last_updated)
//                     : "تاریخ نامشخص"}
//                 </span>

//                 {/* PRICE */}
//                 <span className=" text-blue-800  dark:text-gray-500 font-medium text-sm">
//                   {Number(house.price).toLocaleString("fa-IR")} تومان
//                 </span>

//                 {/* STATUS */}
//                 <div className="text-green-500">
//                   <CheckCircle2 />
//                 </div>

//                 {/* ACTION MENU */}
//                 {/* ////////// deleted */}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div>
//         <ProfileCompletion />

//         <IncomeChartCard />
//       </div>

//       {/* DELETE MODAL */}
//       <DeleteHouseModal
//         open={deleteModal}
//         onClose={() => setDeleteModal(false)}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default MainPage;
