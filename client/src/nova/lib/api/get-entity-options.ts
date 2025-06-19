// ========================================================
// Request
// ========================================================

// Query
export interface GetResourceRequestQueryOptions
  extends ResourceRequestQueryPagination {
  filters?: ResourceRequestQueryFilters;
  search?: string;
  locale?: string;
  sortField?: string;
  sortDirection?: SortDirection;
}

export type ResourceRequestQueryFilters = Record<
  string,
  ResourceRequestQueryFilter
>;

export type ResourceRequestQueryFilter = {
  values: string[];
  op?: FilterOperation;
};

export interface ResourceRequestQueryPagination {
  page?: number;
  "per-page"?: number;
}

// Json
export interface GetResourceRequestJsonOptions
  extends ResourceRequestJsonPagination {
  filters?: ResourceRequestJsonFilter[];
  search?: string;
  locale?: string;
  sort_field?: string;
  sort_direction?: SortDirection;
}

export interface ResourceRequestJsonFilter {
  field: string;
  op?: FilterOperation;
  values: string[];
}

export interface ResourceRequestJsonPagination {
  page?: number;
  per_page?: number;
}

export interface Pagination {
  page: number;
  total_pages: number;
  total_records: number;
}

// General
export type SortDirection = "asc" | "desc" | null;

export type FilterOperation =
  | "like"
  | "eq"
  | "not"
  | "in"
  | "between"
  | "gt"
  | "gte"
  | "lt"
  | "lte";
