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
        className={`w-8 h-8 flex items-center justify-center rounded-full text-xs cursor-pointer transition-all duration-300 ease-in-out ${
          currentValue === 0
            ? "bg-blue-500 text-white shadow-md"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
          className={`w-8 h-8 flex items-center justify-center rounded-full text-xs cursor-pointer transition-all duration-300 ease-in-out ${
            currentValue === i
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
    <div className="space-y-4">
      {/* تعداد تخت */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          {t('beds')}
        </label>
        <div className="flex items-center gap-2">
          {renderButtons(setSelectedRooms, selectedRooms, 5)}
        </div>
      </div>

      {/* تعداد حمام */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          {t('bathrooms')}
        </label>
        <div className="flex items-center gap-2">
          {renderButtons(setSelectedBathrooms, selectedBathrooms, 5)}
        </div>
      </div>

      {/* تعداد دستشویی */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          {t('toilets')}
        </label>
        <div className="flex items-center gap-2">
          {renderButtons(setSelectedToilets, selectedToilets, 5)}
        </div>
      </div>

      {/* تعداد پارکینگ */}
      <div>
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
          {t('parking')}
        </label>
        <div className="flex items-center gap-2">
          {renderButtons(setSelectedParking, selectedParking, 5)}
        </div>
      </div>
    </div>
  );
};

export default BedRoomsFilter;