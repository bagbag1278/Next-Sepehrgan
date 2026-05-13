import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadProps {
  items: BreadcrumbItem[];
}

const Bread = ({ items }: BreadProps) => {
  return (
      <div  dir="rtl" className="breadcrumbs text-[14px] text-[#64748B] w-full flex justify-start ">
        <ul>
          <li>
            <Link href="/" className="hover:text-[#28A5E6] transition-colors">
              خانه
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className=" items-center gap-1">
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#28A5E6] transition-colors"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span className="text-blue-100 font-bold">{item.title}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
  );
};

export default Bread;
