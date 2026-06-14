"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "فروردین", reservations: 120 },
  { month: "اردیبهشت", reservations: 180 },
  { month: "خرداد", reservations: 240 },
  { month: "تیر", reservations: 320 },
  { month: "مرداد", reservations: 410 },
  { month: "شهریور", reservations: 390 },
  { month: "مهر", reservations: 520 },
  { month: "آبان", reservations: 610 },
  { month: "آذر", reservations: 480 },
  { month: "دی", reservations: 430 },
  { month: "بهمن", reservations: 350 },
  { month: "اسفند", reservations: 700 },
];

export default function ReservationChart() {
  return (
    <div className="rounded-2xl p-5">


      <div className="h-33 w-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="reservations"
              stroke="#005EA4"
              strokeWidth={5}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}