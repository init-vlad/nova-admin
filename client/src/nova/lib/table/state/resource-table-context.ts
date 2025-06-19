"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { UseResourceTableQueryState } from "./hooks/use-resource-table-state";
import { HasId } from "@nova/lib/api/mixins";
import { DeleteFn, PatchFn } from "@nova/lib/api/nova-resource-service";

export interface DeleteResourceState<T extends HasId> {
  deleteResource: DeleteFn<T>;
}

export interface ResourceTableContextState<T extends HasId>
  extends UseResourceTableQueryState<T>,
    DeleteResourceState<T> {
  data: T[];
  patchResource: PatchFn<T>;
}

const ResourceTableContext =
  createContext<ResourceTableContextState<HasId> | null>(null);

export default ResourceTableContext;

export const useResourceTableContext = <T extends HasId>() => {
  const ctx = useContext(
    ResourceTableContext
  ) as unknown as ResourceTableContextState<T>;

  if (!ctx) {
    throw new Error(
      "useResourceTableContext must be used within a ResourceTableProvider"
    );
  }

  return ctx;
};
