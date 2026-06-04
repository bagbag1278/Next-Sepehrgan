'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ArrowPAgination from '../Icon/ArrowPAgination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const t = useTranslations('Pagination');
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePrevious = () => {
    if (currentPage > 1) updatePage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) updatePage(currentPage + 1);
  };

  const maxPagesToShow = 6;
  const pageNumbers = [];

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    if (currentPage <= Math.floor(maxPagesToShow / 2) + 1) {
      for (let i = 1; i <= maxPagesToShow; i++) pageNumbers.push(i);
    } else if (currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
      for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      for (
        let i = currentPage - Math.floor(maxPagesToShow / 2);
        i <= currentPage + Math.floor(maxPagesToShow / 2);
        i++
      ) {
        pageNumbers.push(i);
      }
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6" dir="rtl">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label={t('previous')}
        className={`px-4 py-2 ml-3 rounded-full border shadow-md transition-all duration-200 
          ${currentPage === 1
            ? 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-300 dark:border-gray-700'
            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700'
          }`}
      >
        <ArrowPAgination />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => updatePage(page)}
          aria-label={t('goToPage', { page })}
          className={`px-4 py-2 rounded-full border shadow-md transition-all duration-200
            ${currentPage === page
              ? 'bg-blue-500 dark:bg-blue-600 text-white font-bold border-blue-500 dark:border-blue-600'
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700'
            }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label={t('next')}
        className={`px-4 py-2 mr-3 rounded-full border shadow-md transition-all duration-200
          ${currentPage === totalPages
            ? 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed border-gray-300 dark:border-gray-700'
            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-700'
          }`}
      >
        <div className='scale-x-[-1]'>
          <ArrowPAgination />
        </div>
      </button>
    </div>
  );
};

export default Pagination;