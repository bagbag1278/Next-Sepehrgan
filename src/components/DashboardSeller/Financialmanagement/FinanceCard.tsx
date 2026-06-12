import { PinIcon, Star } from "lucide-react";

interface Props {
    title: string;
    value: string;
}

const FinanceCard = ({title,value,}: Props) => {

    return (

        <div
            className="h-17 rounded-[20px] border border-[#E7EDF5] bg-white px-5 flex flex-row-reverse
                items-center justify-between  dark:border-slate-700  dark:bg-slate-800 
            "
        >

            <div
                className=" flex flex-col items-end  gap-1">

                <span className=" text-[15px] font-bold dark:text-white text-[#3D4451]" >
                    {title}
                </span>

                <span className="text-[#0066B3] font-bold ">
                    {value}
                </span>

            </div>

            <PinIcon />

        </div>

    );

};

export default FinanceCard;