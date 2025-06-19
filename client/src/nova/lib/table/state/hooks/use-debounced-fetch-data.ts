"use client";

import { debug } from "@env";
import { debounce } from "@mui/material";
import { GetResourceRequestWithPostMethod } from "@nova/lib/api/api-methods";
import { HasId } from "@nova/lib/api/mixins";
import { PostGetFn } from "@nova/lib/api/nova-resource-service";
import { NullPaginatedResponse } from "@nova/lib/api/null-objects";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";

interface UseDebouncedFetchDataOptions<T extends HasId> {
  fetchDataFn?: PostGetFn<T>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setPage: Dispatch<SetStateAction<number>>;
  setTotalPages: Dispatch<SetStateAction<number>>;
  setTotalRecords: Dispatch<SetStateAction<number>>;
  debounceMs: number;
}

function useDebouncedFetchData<T extends HasId>(
  opts: UseDebouncedFetchDataOptions<T>
) {
  const {
    fetchDataFn,
    setLoading,
    setPage,
    setTotalPages,
    setTotalRecords,
    debounceMs,
  } = opts;

  const abortControllerRef = useRef<AbortController | null>(null);
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchData: PostGetFn<T> = useCallback(
    debounce(async (payload) => {
      if (!fetchDataFn) {
        if (debug) {
          console.warn("useDebouncedFetchData: fetchDataFn is undefined");
        }

        return NullPaginatedResponse.new<T>();
      }

      if (!payload) {
        payload = {};
      }

      abortControllerRef.current?.abort();

      const ac = new AbortController();
      abortControllerRef.current = ac;

      const finalPayload: GetResourceRequestWithPostMethod = {
        ...payload,
        options: {
          ...payload.options,
          signal: ac.signal,
        },
      };

      setLoading(true);

      try {
        const result = await fetchDataFn(finalPayload);

        if (result.pagination) {
          setPage(result.pagination.page);
          setTotalPages(result.pagination.total_pages);
          setTotalRecords(result.pagination.total_records);
        }

        return result;
      } catch (err) {
        if ((err as { name: string }).name === "AbortError") {
        } else {
          if (debug) {
            console.warn("fetchDataFn error:", err);
          }
        }

        return NullPaginatedResponse.new<T>();
      } finally {
        setLoading(false);
      }
    }, debounceMs),
    [
      debug,
      abortControllerRef,
      setLoading,
      fetchDataFn,
      setPage,
      setTotalPages,
      setTotalRecords,
      debounceMs,
    ]
  );

  return debouncedFetchData;
}

export { useDebouncedFetchData };
