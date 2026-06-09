// ./Filter/FiltersSection.tsx
'use client';

import React from 'react';
import InputsFilter from './InputFilter/InputsFilter';
import SliderFilter from './SliderFilter/SliderFilter';

type Filters = {
  transactionType?: string;
  location?: string;
  sort?: string;
  search?: string;
};

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export default function FiltersSection({ filters, setFilters }: Props) {
  return (
    <div className='w-full'>
      <InputsFilter filters={filters} setFilters={setFilters} />
      <SliderFilter />
          
    </div>
  );
}
