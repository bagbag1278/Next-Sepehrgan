"use client";

import { LocationEditIcon } from "lucide-react";
import MapFindMyHouse from "./MapFindMyHouse";

interface StepTwoProps {

  formData: any;

  setFormData: React.Dispatch<
    React.SetStateAction<any>
  >;

}

const StepTwo = ({
  formData,
  setFormData,
}: StepTwoProps) => {

  return (

    <div
      className="grid grid-cols-12 gap-6" dir="lrt">

      {/* INFO */}
      <div
        className="col-span-4  w-78.75 rounded-4xl p-2 flex flex-col justify-between"
      >

        <div>

          <div className=" border border-emerald-500 rounded-2xl p-1 px-2 text-sm leading-7" dir="ltr">

            <div className="text-green-100 flex flex-wrap flex-row-reverse ">
              <div className="flex w-full justify-between ">
                <LocationEditIcon />
                <div className="text-[12px] text-green-100/60 "> نشانی ملک</div>
              </div>
              {
                formData.location
                  .address ||

                "موقعیتی انتخاب نشده است"
              }
            </div>

          </div>

          <p className="text-[14px] mt-8 text-blue-800 dark:to-blue-300 leading-10text-center">

            با انتخاب موقعیت مکانی ملک خود از روی نقشه
            موقعیت ملک
            را به راحتی تعیین کنید.

          </p>


        </div>

      </div>

      {/* MAP */}
      <div
        className="
                col-span-8
                h-77.5
                w-152.5
                rounded-4xl
                overflow-hidden
                border"
      >

        <MapFindMyHouse
          formData={formData}
          setFormData={setFormData}
        />

      </div>


    </div>

  );

};

export default StepTwo;