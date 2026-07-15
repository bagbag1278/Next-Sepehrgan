import Chat from '@/components/chat/Chat'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
  title: "مشاور",
  description: "با مشاور هوشمند با اطمینان بیشتر خانه خرید",
  openGraph: {
    title: "مشاور",
    description: "با مشاور هوشمند با اطمینان بیشتر خانه خرید کنید",
    type: "website",
  },
};
const page = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

export default page
