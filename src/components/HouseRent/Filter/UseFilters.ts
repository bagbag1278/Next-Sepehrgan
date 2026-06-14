// hooks/useFilters.ts
"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterParams } from "./types";

const defaultFilters: FilterParams = {
    page: 1,
    limit: 10,
    type: "",
    location: "",
    sort: "",
    search: "",
    category: "",
    minPrice: undefined,
    maxPrice: undefined,
};

export const useFilters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState<FilterParams>(() => {
        const params: FilterParams = { ...defaultFilters };

        params.page = Number(searchParams.get("page")) || 1;
        params.type = searchParams.get("type") || "";
        params.location = searchParams.get("location") || "";
        params.sort = searchParams.get("sort") || "";
        params.search = searchParams.get("search") || "";
        params.category = searchParams.get("category") || "";
        params.minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
        params.maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;

        return params;
    });

    const updateFilters = useCallback((newFilters: Partial<FilterParams>) => {
        setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({ ...defaultFilters, page: 1 });
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();

        if (filters.page && filters.page > 1) params.set("page", String(filters.page));
        if (filters.type) params.set("type", filters.type);
        if (filters.location) params.set("location", filters.location);
        if (filters.sort) params.set("sort", filters.sort);
        if (filters.search) params.set("search", filters.search);
        if (filters.category) params.set("category", filters.category);
        if (filters.minPrice) params.set("minPrice", String(filters.minPrice));
        if (filters.maxPrice) params.set("maxPrice", String(filters.maxPrice));

        const queryString = params.toString();
        router.push(`/rent${queryString ? `?${queryString}` : ""}`, { scroll: false });
    }, [filters, router]);

    return { filters, updateFilters, resetFilters };
};