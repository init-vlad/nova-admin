import { FilterOperation } from "@nova/lib/api/get-entity-options";
import { Dispatch, SetStateAction } from "react";

export type SearchValuesState = Record<
  number,
  { column: string; value: string }
>;

export interface TableSearch {
  onSearchInput: (val: { state?: SearchValuesState }) => void;
  searchValues: SearchValuesState;
}

export interface TablePagination {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;

  totalPages: number;
  totalItems: number;
}

export type onSortChange = (
  column: string,
  order: "asc" | "desc" | false
) => void;

export interface TableSort {
  sortOrder: undefined | "asc" | "desc";
  sortColumn: string;
  onSortChange: onSortChange;
}

export interface Table {
  pagination: TablePagination;
  sort: TableSort;
  loading: { isLoadingBody: boolean };
  totalPages: number;
  totalItems: number;
  onPerPageChange: Dispatch<SetStateAction<number>>;
  perPage: number;
  search: TableSearch;
}

export type ResourceRequestFilters = Record<string, ResourceRequestFilter>;
export interface ResourceRequestFilter {
  values: string[];
  op?: FilterOperation;
}
