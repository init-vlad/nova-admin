"use client";

import { Dispatch, SetStateAction, useCallback, useMemo, useRef } from "react";
import {
  ResourceRequestFilter,
  ResourceRequestFilters,
  TableSearch,
} from "../types";
import { SearchValuesState } from "@init/table";
import { PostGetFn } from "@nova/lib/api/nova-resource-service";
import { HasId } from "@nova/lib/api/mixins";
import { adaptFilters } from "../helpers";

interface UseFiltersOptions<T extends HasId> {
  filters: ResourceRequestFilters;
  setFilters: Dispatch<SetStateAction<ResourceRequestFilters>>;
  fetchData: PostGetFn<T>;
}

function useFilters<T extends HasId>({
  fetchData,
  filters,
  setFilters,
}: UseFiltersOptions<T>) {
  const changeFilters = useCallback(
    (value: React.SetStateAction<ResourceRequestFilters>) => {
      setFilters((prev) => {
        const newFilters = typeof value === "function" ? value(prev) : value;
        const filteredFilters = {} as ResourceRequestFilters;

        // remove filters with no values
        Object.entries(newFilters).forEach(([field, filter]) => {
          if (filter.values.filter(Boolean).length < 1) {
            return;
          }

          filteredFilters[field] = filter;
        });

        fetchData({ body: { filters: adaptFilters(filteredFilters) } });
        return filteredFilters;
      });
    },
    [fetchData, setFilters]
  );

  const colTableIndexes = useRef<Record<string, string>>({});

  const tableFilters = useMemo((): TableSearch => {
    const searchValues: SearchValuesState = {};

    Object.entries(filters).forEach(([col, val]) => {
      const idx = colTableIndexes.current?.[col];
      if (!idx) {
        return;
      }

      searchValues[idx as unknown as number] = {
        value: val.values?.[0],
        column: col,
      };
    }) as unknown as SearchValuesState;

    return {
      searchValues,
      onSearchInput: (v) => {
        const state = v.state;
        if (!state) {
          return;
        }

        Object.entries(state).forEach(([key, val]) => {
          if (key === undefined || val.column === undefined) {
            return;
          }
          colTableIndexes.current[val.column] = key;
        });

        const res = {} as ResourceRequestFilters;
        Object.values(state).forEach((val) => {
          if (val.column === undefined) {
            return;
          }

          res[val.column] = {
            values: [val.value],
          } as ResourceRequestFilter;
        });

        changeFilters(res);
      },
    };
  }, [filters, changeFilters]);

  return {
    changeFilters,
    tableFilters,
  };
}

export { useFilters };
