"use client";
import { useTranslations } from 'next-intl';
import { toPersianNum } from "@/components/utils/FarsiNum";
import { FC } from "react";

type BedRoomsFilterProps = {
  selectedRooms: number;
  setSelectedRooms: (value: number) => void;
  selectedBathrooms: number;
  setSelectedBathrooms: (value: number) => void;
  selectedToilets: number;
  setSelectedToilets: (value: number) => void;
  selectedParking: number;
  setSelectedParking: (value: number) => void;
};

const BedRoomsFilter: FC<BedRoomsFilterProps> = ({
  selectedRooms,
  setSelectedRooms,
  selectedBathrooms,
  setSelectedBathrooms,
  selectedToilets,
  setSelectedToilets,
  selectedParking,
  setSelectedParking,
}) => {
  const t = useTranslations('BedRoomsFilter');

  const renderButtons = (stateSetter: (value: number) => void, currentValue: number, maxCount: number) => {
    const buttons = [];

    buttons.push(
      <button
        key={0}
        className={`w-8 h-8 flex items-center border-blue-300 border text-blue-300 justify-center rounded-full text-xs cursor-pointer transition-all duration-300 ease-in-out ${
          currentValue === 0
            ? " shadow-md"
            : "text-blue-300 hover:text-blue-300"
        }`}
        onClick={() => stateSetter(0)} 
      >
        {toPersianNum(0)}
      </button>,
    );
    
    for (let i = 1; i <= maxCount; i++) {
      buttons.push(
        <button
          key={i}
          className={`w-8 h-8 flex items-center cursor-pointer justify-center rounded-full text-xs transition-all duration-300 ease-in-out ${
            currentValue === i
              ? "border-blue-100 border text-blue-100 bg-blue-300/50 shadow-md"
              : "border border-gray-400 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => stateSetter(i)} 
        >
          {toPersianNum(i)}
        </button>,
      );
    }
    return buttons;
  };

  return (
    <div className="">
      {/* تعداد تخت */}
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-normal mb-2 opacity-70">
          {t('beds')}
        </label>
        <div className="flex items-center space-x-2">
          {renderButtons(setSelectedRooms, selectedRooms, 5)}
        </div>
      </div>

      {/* تعداد حمام */}
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-normal mb-2 opacity-70">
          {t('bathrooms')}
        </label>
        <div className="flex items-center space-x-2">
          {renderButtons(setSelectedBathrooms, selectedBathrooms, 5)}
        </div>
      </div>

      {/* تعداد دستشویی */}
      <div className="mb-5">
        <label className="block text-gray-700 text-sm font-normal mb-2 opacity-70">
          {t('toilets')}
        </label>
        <div className="flex items-center space-x-2">
          {renderButtons(setSelectedToilets, selectedToilets, 5)}
        </div>
      </div>

      {/* تعداد پارکینگ */}
      <div>
        <label className="block text-gray-700 text-sm font-normal mb-2 opacity-70">
          {t('parking')}
        </label>
        <div className="flex items-center space-x-2">
          {renderButtons(setSelectedParking, selectedParking, 5)}
        </div>
      </div>
    </div>
  );
};

export default BedRoomsFilter;