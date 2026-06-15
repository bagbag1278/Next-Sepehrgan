import React from 'react'
import Notif from '../Dashboard/buyer/icon/NotifSVG'
import PocketDropdown from '../Dashboard/buyer/PocketDropdown'
import UserDropdown from '../header/components/UserDropdown'
import Image from 'next/image'

const ShowInfo = () => {
    return (
        <div className="h-52 flex flex-col gap-2">
            <div className="bg-blue-300/10 rounded-3xl h-35 py-2.5 flex flex-col items-center gap-1">
                {/* img */}
                <div className="size-16 rounded-4xl border-2 overflow-hidden border-green-200/50">
                    <Image
                        src={"/FastReserve/images.jfif"}
                        width={64}
                        height={64}
                        alt=""
                    />
                </div>
                <div className="w-23 h-12 flex flex-col gap-1 items-center">
                    <span className="text-[12px] font-normal opacity-80">
                        خریدار
                    </span>
                    <UserDropdown user={user} />
                </div>
            </div>
            <div className="bg-blue-300/10 rounded-3xl h-15.5 flex items-center justify-center gap-1">
                <Notif />
                <PocketDropdown />
            </div>
        </div>
    )
}

export default ShowInfo