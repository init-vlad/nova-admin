"use client";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  onSortChange,
  ResourceRequestFilters,
  Table,
  TableSort,
} from "../types";
import { useDebouncedFetchData } from "./use-debounced-fetch-data";
import { useFilters } from "./use-filters";
import { PostGetFn } from "@nova/lib/api/nova-resource-service";
import { HasId } from "@nova/lib/api/mixins";
import { SortDirection } from "@nova/lib/api/get-entity-options";
import { GetResourceRequestWithPostMethod } from "@nova/lib/api/api-methods";
import { adaptFilters } from "../helpers";

export interface UseResourceTableQueryOptions<T extends HasId> {
  fetchDataFn?: PostGetFn<T>;
  debounceMs?: number;

  initialPage?: number;
  initialPerPage?: number;
  initialSearch?: string;
  initialSortField?: string;
  initialSortDirection?: SortDirection;
  initialFilters?: ResourceRequestFilters;
  initialLoading?: boolean;
  initialTotalPages?: number;
  initialTotalRecords?: number;

  fetchOnMount?: boolean;
}

export interface UseResourceTableQueryState<T extends HasId> {
  page: number;
  perPage: number;
  totalPages: number;
  totalRecords: number;
  search: string;
  sortField: string;
  sortDirection: SortDirection;
  loading: boolean;
  filters: ResourceRequestFilters;
  table: Table;

  setPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setTotalRecords: Dispatch<SetStateAction<number>>;
  setSearch: Dispatch<SetStateAction<string>>;
  setSortField: Dispatch<SetStateAction<string>>;
  setSortDirection: Dispatch<SetStateAction<SortDirection>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFilters: Dispatch<SetStateAction<ResourceRequestFilters>>;

  changePage: (value: SetStateAction<number>) => void;
  changePerPage: (value: SetStateAction<number>) => void;
  changeSortField: (value: SetStateAction<string>) => void;
  changeSortDirection: (value: SetStateAction<SortDirection>) => void;
  changeFilters: (value: SetStateAction<ResourceRequestFilters>) => void;

  debouncedFetchData: PostGetFn<T>;

  changeSearch: (value: SetStateAction<string>) => void;
}

// Use "useCallback" for fetchDataFn to ensure proper debounce functionality
export function useResourceTableQueryState<T extends HasId>(
  options: UseResourceTableQueryOptions<T> = {}
): UseResourceTableQueryState<T> {
  const {
    fetchDataFn,
    debounceMs = 300,
    fetchOnMount = false,

    initialPage = 1,
    initialPerPage = 50,
    initialSearch = "",
    initialLoading = false,
    initialTotalPages = 1,
    initialTotalRecords = 0,
    initialSortDirection = null,
    initialSortField = "",
    initialFilters = {},
  } = options;

  const [page, setPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPerPage);
  const [search, setSearch] = useState<string>(initialSearch);
  const [sortField, setSortField] = useState<string>(initialSortField);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialSortDirection);
  const [filters, setFilters] =
    useState<ResourceRequestFilters>(initialFilters);

  const [loading, setLoading] = useState<boolean>(initialLoading);

  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);
  const [totalRecords, setTotalRecords] = useState<number>(initialTotalRecords);

  const _debouncedFetchData = useDebouncedFetchData({
    debounceMs,
    fetchDataFn,
    setLoading,
    setPage,
    setTotalPages,
    setTotalRecords,
  });

  // set current filters to payload by default
  const debouncedFetchData: PostGetFn<T> = useCallback(
    async (payload) => {
      const finalPayload: GetResourceRequestWithPostMethod = {
        body: {
          page,
          per_page: perPage,
          search,
          sortDirection,
          sortField,
          filters: adaptFilters(filters),
          ...payload?.body,
        },
      };

      return _debouncedFetchData(finalPayload);
    },
    [
      page,
      perPage,
      search,
      sortDirection,
      sortField,
      filters,
      _debouncedFetchData,
    ]
  );

  const filtersState = useFilters({
    setFilters,
    filters,
    fetchData: debouncedFetchData,
  });

  const changePage = useCallback(
    (value: SetStateAction<number>) => {
      setPage((prevPage) => {
        const newPage = typeof value === "function" ? value(prevPage) : value;
        debouncedFetchData({ body: { page: newPage } });
        return newPage;
      });
    },
    [debouncedFetchData]
  );

  const changeSearch = useCallback(
    (value: SetStateAction<string>) => {
      setSearch((prevSearch) => {
        const newSearch =
          typeof value === "function" ? value(prevSearch) : value;
        debouncedFetchData({ body: { search: newSearch } });
        return newSearch;
      });
    },
    [debouncedFetchData]
  );

  const changeSortField = useCallback(
    (value: SetStateAction<string>) => {
      setSortField((prev) => {
        const newSortField = typeof value === "function" ? value(prev) : value;
        debouncedFetchData({ body: { sortField: newSortField } });
        return newSortField;
      });
    },
    [debouncedFetchData]
  );

  const changeSortDirection = useCallback(
    (value: SetStateAction<SortDirection>) => {
      setSortDirection((prev) => {
        const newSortDirection =
          typeof value === "function" ? value(prev) : value;
        debouncedFetchData({ body: { sortDirection: newSortDirection } });
        return newSortDirection;
      });
    },
    [debouncedFetchData]
  );

  const changePerPage = useCallback(
    (value: SetStateAction<number>) => {
      setPerPage((prevPerPage) => {
        const newPerPage =
          typeof value === "function" ? value(prevPerPage) : value;

        if (newPerPage === prevPerPage) {
          return prevPerPage;
        }

        const maxPage = Math.ceil(totalRecords / newPerPage);
        const nextPage = page > maxPage ? maxPage : page;

        if (nextPage !== page) {
          setPage(nextPage);
        }

        debouncedFetchData({
          body: { page: nextPage, per_page: newPerPage },
        });

        return newPerPage;
      });
    },
    [debouncedFetchData, page, totalRecords]
  );

  const onSortChange: onSortChange = useCallback(
    (col, order) => {
      setSortDirection(order || null);
      setSortField(col);

      debouncedFetchData({
        body: { sortDirection: order || null, sortField: col },
      });
    },
    [setSortDirection, debouncedFetchData]
  );

  const sort = useMemo((): TableSort => {
    return {
      onSortChange: onSortChange,
      sortColumn: sortField,
      sortOrder: sortDirection ?? undefined,
    };
  }, [sortField, sortDirection, onSortChange]);

  useEffect(() => {
    if (fetchOnMount && fetchDataFn) {
      debouncedFetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const table = useMemo((): Table => {
    return {
      pagination: {
        totalItems: totalRecords,
        totalPages,
        page,
        perPage,
        setPage: changePage,
        setPerPage: changePerPage,
      },
      search: filtersState.tableFilters,
      sort,
      loading: { isLoadingBody: loading },
      onPerPageChange: changePerPage,
      perPage,
      totalPages,
      totalItems: totalRecords,
    };
  }, [
    page,
    perPage,
    changePage,
    changePerPage,
    totalPages,
    loading,
    sort,
    totalRecords,
    filtersState.tableFilters,
  ]);

  return {
    ...filtersState,
    filters,
    page,
    perPage,
    totalPages,
    totalRecords,
    search,
    sortDirection,
    sortField,
    loading,
    table,

    setPage,
    setPerPage,
    setSortField,
    setSortDirection,
    setTotalPages,
    setTotalRecords,
    setSearch,
    setLoading,
    setFilters,

    changePage,
    changePerPage,
    changeSortDirection,
    changeSortField,
    debouncedFetchData,

    changeSearch,
  };
}
