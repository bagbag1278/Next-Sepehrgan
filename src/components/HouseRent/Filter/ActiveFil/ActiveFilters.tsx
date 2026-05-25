import React from 'react';

interface Filter {
    label: string;
    key: string;
    value: string;
}

interface ActiveFiltersProps {
    activeFilters: Filter[];
    onRemoveFilter: (filter: Filter) => void;
    onResetFilters: () => void;
    filterCount: number;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
    activeFilters,
    onRemoveFilter,
    onResetFilters,
    filterCount,
}) => {
    if (activeFilters.length === 0) {
        return null;
    }

    return (
        <div className='w-full flex justify-center '>
        <div className="w-312 flex flex-wrap items-center gap-2 my-4 px-2 py-2 rounded-md">

            {activeFilters.map(filter => (
                <div
                    key={filter.key}
                    className="flex items-center px-3 py-1.5 bg-white rounded-full shadow-sm border border-green-100"
                >
                    <span className="ml-0.5 text-sm text-green-700 font-medium">{filter.label}</span> 
                    <button
                        onClick={() => onRemoveFilter(filter)}
                        className="cursor-pointer ml-2 text-green-100 hover:text-red-700 focus:outline-none" 
                        aria-label={`حذف فیلتر ${filter.label}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            ))}

            {filterCount > 0 && (
                <button
                    onClick={onResetFilters}
                    className="cursor-pointer ml-auto px-4 py-1.5  text-blue-400 text-sm font-medium rounded-full hover:text-red-600 focus:outline-none  transition duration-200"
                    aria-label="پاک کردن همه فیلترها"
                >
                    پاک کردن همه ({filterCount})
                </button>
            )}
        </div>
        </div>
    );
};

export default ActiveFilters;
