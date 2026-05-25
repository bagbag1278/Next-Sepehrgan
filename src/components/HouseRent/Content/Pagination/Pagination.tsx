'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ArrowPAgination from '../Icon/ArrowPAgination';

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
    router.push(`?${params.toString()}`); // Keep as is for now, assuming this is correct for your routing
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
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 ml-3 rounded-full border shadow-md 
          ${currentPage === 1
            ? 'bg-white text-gray-400 cursor-not-allowed border-gray-300'
            : 'bg-white text-gray-800 hover:bg-gray-100 border-gray-300'
          }`}
      >
        <ArrowPAgination />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => updatePage(page)}
          className={`px-4 py-2 rounded-full border shadow-md transition-colors duration-200
            ${currentPage === page
              ? 'bg-blue-500 text-white font-bold border-blue-500'
              : 'bg-white text-black hover:bg-gray-100 border-gray-300'
            }`}
        >
          {page}
        </button>
      ))}

      {/* Next Btton */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mr-3 rounded-full border shadow-md
          ${currentPage === totalPages
            ? 'bg-white text-gray-400 cursor-not-allowed border-gray-300'
            : 'bg-white text-gray-800 hover:bg-gray-100 border-gray-300'
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
