"use client";

import { useSearchParams } from "next/navigation";
import ManegeHouse from "./ManegeHouse";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { Booking } from "@/core/types/buyer/IBooking";

type Props = {
  bookings: Booking[];
};

const BookingList = ({ bookings }: Props) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("house_name")?.toLowerCase() || "";

  const filtered = query
    ? bookings.filter((b) =>
        b.house.title.toLowerCase().includes(query)
      )
    : bookings;

  return (
    <>
      {filtered.map((booking, index) => (
        <AnimatedCard key={booking.id} index={index}>
          <ManegeHouse booking={booking} />
        </AnimatedCard>
      ))}
    </>
  );
};

export default BookingList;