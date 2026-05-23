'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
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

  const maxPagesToShow = 5;
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
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md border ${
          currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        قبلی
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => updatePage(page)}
          className={`px-4 py-2 rounded-md border ${
            currentPage === page
              ? 'bg-blue-500 text-white font-bold'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md border ${
          currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        بعدی
      </button>
    </div>
  );
};

export default Pagination;
