'use client';

import React, { useEffect, useState, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import debounce from "lodash-es/debounce";
import { House } from './Content/Hosues';
import FiltersSection from './Filter/FiltersSection';
import BreadCrumb from './AddressPage/BreadCrumb';
import HosueList from './Content/HousesList';
import Pagination from './Content/Pagination/Pagination';
import ActiveFilters from './Filter/ActiveFil/ActiveFilters';

type Filters = {
  transactionType?: string;
  location?: string;
  sort?: string;
  search?: string;
  minArea?: string;
  maxArea?: string;
};

interface ExtendedHouse extends House {
  isInvalid?: boolean;
}

interface Filter {
  label: string;
  key: string;
  value: string;
}

const HouseRentContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get('page')) || 1;
  const housesPerPage = 10;

  const [filters, setFilters] = useState<Filters>({
    transactionType: searchParams.get('transactionType') || '',
    location: searchParams.get('location') || '',
    sort: searchParams.get('sort') || '',
    search: searchParams.get('search') || '',
    minArea: searchParams.get('minArea') || '',
    maxArea: searchParams.get('maxArea') || '',
  });

  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const [houses, setHouses] = useState<ExtendedHouse[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(totalCount / housesPerPage);

  //  filtersCount
  const activeFilterCount = Object.values(filters).filter(
    value => value !== '' && value !== undefined
  ).length;

  //  query string ====
  const buildQueryString = useCallback(
    (currentFilters: Filters, page: number) => {
      const params = new URLSearchParams();

      if (currentFilters.transactionType) {
        params.append('transactionType', currentFilters.transactionType);
      }
      if (currentFilters.location) {
        params.append('location', currentFilters.location);
      }
      if (currentFilters.sort) {
        params.append('sort', currentFilters.sort);
      }
      if (currentFilters.search) {
        params.append('search', currentFilters.search);
      }
      if (currentFilters.minArea) {
        params.append('minArea', currentFilters.minArea);
      }
      if (currentFilters.maxArea) {
        params.append('maxArea', currentFilters.maxArea);
      }

      params.append('page', page.toString());
      params.append('limit', housesPerPage.toString());

      return params.toString();
    },
    [housesPerPage]
  );

  // update URL with debounce
  const updateUrlDebounced = useCallback(
    debounce((newFilters: Filters, page: number) => {
      const newQueryString = buildQueryString(newFilters, page);
      const newUrl = `${pathname}?${newQueryString}`;

      if (window.location.search !== `?${newQueryString}`) {
        setPendingUrl(newUrl);
      }
    }, 500),
    [pathname, buildQueryString]
  );

  // get data from Url =======
  const fetchHouses = useCallback(
    async (currentFilters: Filters, page: number) => {
      setIsLoading(true);
      setError(null);

      const paramsString = buildQueryString(currentFilters, page);
      const apiUrl = `http://188.121.111.8:3003/api/houses?${paramsString}`;

      try {
        const res = await fetch(apiUrl);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = (await res.json()) as {
          houses?: House[];
          totalCount?: number;
        };

        const allHouses = data.houses || [];

        const processedHouses: ExtendedHouse[] = allHouses.map((house: House) => {
          const isInvalid = !(house && house.id && house.title && house.price);
          return { ...house, isInvalid };
        });

        setHouses(processedHouses);
        setTotalCount(data.totalCount || 0);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(
          'متاسفانه محتوای مورد نظر در حال حاضر در دسترس نیست. لطفاً بعداً دوباره امتحان کنید.'
        );
        setHouses([]);
        setTotalCount(0);
      } finally {
        setIsLoading(false);
      }
    },
    [buildQueryString]
  );

  useEffect(() => {
    fetchHouses(filters, currentPage);
  }, [fetchHouses, filters, currentPage]);

  useEffect(() => {
    updateUrlDebounced(filters, currentPage);
  }, [filters, currentPage, updateUrlDebounced]);

  useEffect(() => {
    if (pendingUrl) {
      router.push(pendingUrl);
      setPendingUrl(null);
    }
  }, [pendingUrl, router]);

  const resetFiltersHandler = useCallback(() => {
    const initialFilters: Filters = {
      transactionType: '',
      location: '',
      sort: '',
      search: '',
      minArea: '',
      maxArea: '',
    };

    const newQueryString = buildQueryString(initialFilters, 1);
    setPendingUrl(`${pathname}?${newQueryString}`);
    setFilters(initialFilters);
  }, [pathname, buildQueryString]);

  // remove one of the filters =====
  const removeFilterHandler = useCallback(
    (filterToRemove: Filter) => {
      setFilters(prevFilters => {
        const newFilters = { ...prevFilters };

        if (filterToRemove.key === 'transactionType') newFilters.transactionType = '';
        else if (filterToRemove.key === 'location') newFilters.location = '';
        else if (filterToRemove.key === 'sort') newFilters.sort = '';
        else if (filterToRemove.key === 'search') newFilters.search = '';
        else if (filterToRemove.key === 'minArea') newFilters.minArea = '';
        else if (filterToRemove.key === 'maxArea') newFilters.maxArea = '';

        const newQueryString = buildQueryString(newFilters, 1);
        setPendingUrl(`${pathname}?${newQueryString}`);

        return newFilters;
      });
    },
    [pathname, buildQueryString]
  );

  const activeFiltersToDisplay: Filter[] = [];

  if (filters.transactionType) {
    activeFiltersToDisplay.push({
      label: `نوع: ${filters.transactionType}`,
      key: 'transactionType',
      value: filters.transactionType,
    });
  }

  if (filters.location) {
    activeFiltersToDisplay.push({
      label: `مکان: ${filters.location}`,
      key: 'location',
      value: filters.location,
    });
  }

  if (filters.sort) {
    activeFiltersToDisplay.push({
      label: `مرتب‌سازی: ${filters.sort}`,
      key: 'sort',
      value: filters.sort,
    });
  }

  if (filters.search) {
    activeFiltersToDisplay.push({
      label: `جستجو: ${filters.search}`,
      key: 'search',
      value: filters.search,
    });
  }

  if (filters.minArea || filters.maxArea) {
    let areaLabel = 'متراژ: ';

    if (filters.minArea && filters.maxArea) {
      areaLabel += `${filters.minArea} تا ${filters.maxArea} متر`;
    } else if (filters.minArea) {
      areaLabel += `از ${filters.minArea} متر`;
    } else if (filters.maxArea) {
      areaLabel += `تا ${filters.maxArea} متر`;
    }

    activeFiltersToDisplay.push({
      label: areaLabel,
      key: 'minArea',
      value: `${filters.minArea || ''}-${filters.maxArea || ''}`,
    });
  }

  return (
    <div className="flex flex-col items-center w-full" dir="rtl">
      <BreadCrumb />

      <FiltersSection filters={filters} setFilters={setFilters} />



      {activeFiltersToDisplay.length > 0 && (
        <ActiveFilters
          activeFilters={activeFiltersToDisplay}  
          onRemoveFilter={removeFilterHandler}
          onResetFilters={resetFiltersHandler}
          filterCount={activeFilterCount}
        />
      )}

      {isLoading ? (
        <div className="w-full flex justify-center items-center h-140">
          <p className="text-lg text-gray-600">در حال بارگذاری...</p>
        </div>
      ) : error ? (
        <div className="w-full flex justify-center items-center h-140">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : (
        <>
          <HosueList houses={houses} />

          {totalPages > 1 && (
            <div className="w-full mt-8 flex justify-center border-none">
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const HouseRentPage = () => {
  return (
    <Suspense fallback={<div>در حال بارگذاری اولیه...</div>}>
      <HouseRentContent />
    </Suspense>
  );
};

export default HouseRentPage;
