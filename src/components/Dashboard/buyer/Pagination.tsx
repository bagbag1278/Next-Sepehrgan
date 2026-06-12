"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const btnBase = "w-9 h-9 rounded-full border dark:border-blue-300 dark:text-white border-blue-100/50 text-[13px] flex items-center justify-center transition-all duration-150 cursor-pointer";
  const activeBtn = "bg-blue-100 text-white dark:text-white dark:bg-blue-300";
  const normalBtn = "text-blue-100 hover:bg-blue-50 dark:hover:bg-slate-700";
  const disabledBtn = "opacity-35 cursor-not-allowed";

  return (
    <div className="flex items-center gap-1.5 direction-rtl" dir="rtl">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} ${currentPage === 1 ? disabledBtn : normalBtn}`}
      >
        <ChevronRight size={16} />
      </button>

      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="w-9 h-9 flex items-center justify-center text-[13px] text-blue-300/60">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${btnBase} ${page === currentPage ? activeBtn : normalBtn}`}
          >
            {page.toLocaleString("fa-IR")}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} ${currentPage === totalPages ? disabledBtn : normalBtn}`}
      >
        <ChevronLeft size={16} />
      </button>
    </div>
  );
};

export default Pagination;