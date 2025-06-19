import { ResourceRequestJsonFilter } from "@nova/lib/api/get-entity-options";
import { ResourceRequestFilters } from "./types";

export const adaptFilters = (
  filters: ResourceRequestFilters
): ResourceRequestJsonFilter[] => {
  return Object.entries(filters).map(([key, value]) => ({
    field: key,
    op: value.op,
    values: value.values,
  }));
};
