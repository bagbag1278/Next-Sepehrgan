"use client";

import React, { useState, useEffect } from 'react';
import ArrowUp from '../Icon/ArrowUp';
import VectorUp from '../Icon/VectorUp';

const BacktoTopButton = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className='absolute top-0 w-27 h-40.5 flex items-center justify-center'>
      <button
        onClick={scrollToTop}
        className='absolute left-7 rounded-2xl bg-white p-3 cursor-pointer shadow-lg'
        aria-label="Scroll to top"
      >
        <p className='w-2.5 h-2.5'>
          <ArrowUp />
        </p>
      </button>
      <VectorUp />
    </div>
  );
};

export default BacktoTopButton;
