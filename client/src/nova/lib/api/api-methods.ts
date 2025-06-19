import { FetchOptions } from "../../../shared/lib/fetch/fetch";
import {
  GetResourceRequestJsonOptions,
  GetResourceRequestQueryOptions,
  Pagination,
} from "./get-entity-options";
import { HasId } from "./mixins";

// Get
export interface GetResourceRequestWithGetMethod {
  options?: FetchOptions;
  query?: GetResourceRequestQueryOptions;
}

export interface GetResourceRequestWithPostMethod {
  options?: FetchOptions;
  body?: GetResourceRequestJsonOptions;
}

export interface GetResourcePaginatedResponse<T extends HasId> {
  pagination: Pagination;
  data: T[];
}

// Patch

export interface PatchResourceRequest<T extends HasId> {
  data: Partial<T> & { id: T["id"] };
  options?: FetchOptions;
}

export interface PatchResourceResponse<T extends HasId> {
  data: T;
}

// Delete

export interface DeleteResourceRequest<T extends HasId> {
  id: T["id"];
  options?: FetchOptions;
}
