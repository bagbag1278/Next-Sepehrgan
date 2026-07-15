"use client";
import React from "react";
import { useTranslations } from 'next-intl';
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import HeaderIcon3 from "@/components/header/Icon/HeaderIcon3";
import HeroDropdowns from "@/app/search/[city]/page";

function HeroSctionFilter() {
  const t = useTranslations('HeroSctionFilter');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("type") || "booking";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const tabs = [
    { id: "booking", label: t('booking') },
    { id: "sell", label: t('sell') },
    { id: "buy", label: t('buy') },
    { id: "rent", label: t('rent') },
  ];

  return (
    <div className="p-4">
      <Tabs.Root 
        className="flex flex-col w-full" 
        value={currentTab} 
        onValueChange={handleTabChange}
      >
        <Tabs.List className="flex justify-center">
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className="group relative px-5 py-2 flex flex-col items-center gap-1 outline-none text-gray-600 text-[14px] font-medium data-[state=active]:text-[#0887CA]"
            >
              <span>{tab.label}</span>
              <div className="hidden group-data-[state=active]:block">
                <HeaderIcon3 />
              </div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <div className="mt-4">
          <Tabs.Content value="booking">
            <HeroDropdowns type="booking" />
          </Tabs.Content>
          <Tabs.Content value="sell">
            <HeroDropdowns type="sell" />
          </Tabs.Content>
          <Tabs.Content value="buy">
            <HeroDropdowns type="buy" />
          </Tabs.Content>
          <Tabs.Content value="rent">
            <HeroDropdowns type="rent" />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}

export default HeroSctionFilter;