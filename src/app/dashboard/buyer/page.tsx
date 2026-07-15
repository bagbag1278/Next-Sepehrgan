import DashProduct from "@/components/Dashboard/buyer/dash/DashProduct";
import DashStatus from "@/components/Dashboard/buyer/dash/DashStatus";
import ProfileInfoCard from "@/components/Dashboard/buyer/dash/ProfileInfoCard";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { getDashboardSummary } from "@/core/api/Buyer/DashboardSummary.api";
import { getBookings } from "@/core/api/Buyer/GetBookings.api";

const BuyerDashPage = async () => {
  const summary = await getDashboardSummary();
  const bookings = await getBookings({ limit: 4 });

  return (
    <div>
      <div className="w-156.5 h-118 absolute top-20.25 right-6 flex flex-col gap-8">
        {/* dashboard status */}
        <DashStatus summary={summary} />
        {/* dashboard product */}
        <div className="h-80 flex flex-col gap-4">
          <div className="h-14 rounded-2xl shadow-[0_0_4px] dark:bg-slate-700 shadow-blue-200/20 py-4 pr-4">
            <div className="h-5.5 w-138 flex justify-end gap-18">
              <div className="h-5.5 text-sm text-blue-400/50 dark:text-slate-300">
                نام اقامتگاه
              </div>
              <div className="h-5.5 flex gap-14">
                <span className="text-sm text-blue-400/50 dark:text-slate-300">
                  تاریخ رزرو
                </span>
                <span className="text-sm text-blue-400/50 dark:text-slate-300">
                  زمان رزرو
                </span>
                <span className="text-sm text-blue-400/50 dark:text-slate-300">
                  قیمت
                </span>
                <span className="text-sm text-blue-400/50 dark:text-slate-300">
                  وضعیت
                </span>
              </div>
            </div>
          </div>
          <div className="h-62.5 flex flex-col gap-2 pt-0.5 px-0.5">
            {bookings.data.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-blue-300 text-sm">رزروی وجود ندارد</span>
              </div>
            ) : (
              bookings.data.map((booking, index) => (
                <AnimatedCard key={booking.id} index={index}>
                  <DashProduct booking={booking} />
                </AnimatedCard>
              ))
            )}
          </div>
        </div>
      </div>
      {/*  */}
      <div className="w-80.5 h-132.25 absolute top-6.5 right-168.5 flex flex-col gap-8">
        <ProfileInfoCard />
        <div className="p-3 flex flex-col dark:bg-slate-800 h-45.75 rounded-2xl shadow-[0_0_4px] shadow-blue-200/20">
          <h4 className="font-bold">نمودار رزرو ها</h4>
          {/* <ReservationChart /> */}
        </div>
      </div>
    </div>
  );
};

export default BuyerDashPage;
