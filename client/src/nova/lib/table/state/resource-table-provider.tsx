"use client";

import {
  Context,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ResourceTableContext, {
  ResourceTableContextState,
} from "./resource-table-context";
import { useResourceTableQueryState } from "./hooks/use-resource-table-state";
import {
  NovaResourceService,
  PatchFn,
  PostGetFn,
} from "@nova/lib/api/nova-resource-service";
import { HasId } from "@nova/lib/api/mixins";
import { FetchError } from "@shared/lib/fetch/fetch";
import { useDeleteResourceState } from "./hooks/use-delete-resource-state";

export interface ResourceTableProviderProps<T extends HasId> {
  initialData?: T[];
  children: ReactNode;
  service: NovaResourceService<T>;
}

function ResourceTableProvider<T extends HasId>({
  initialData,
  children,
  service,
}: ResourceTableProviderProps<T>) {
  const [data, setData] = useState<T[]>(initialData || []);
  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const fetchDataFn: PostGetFn<T> = useCallback(
    async (payload) => {
      const res = await service.postGet(payload);

      setData(res.data);
      return res;
    },
    [service]
  );

  const value = useResourceTableQueryState({ fetchDataFn });

  const patchResource: PatchFn<T> = useCallback(
    async ({ data: patchPayload, options }) => {
      const prev = dataRef.current;
      setData((prev) => {
        const res = prev.map((p) => {
          if (p.id == patchPayload.id) {
            return { ...p, ...patchPayload };
          }

          return p;
        });

        return res;
      });
      const res = await service.patch({ data: patchPayload, options });

      if (res instanceof FetchError) {
        setData(prev);
        console.log("Failed");
        return res;
      }

      console.log("Success");
      return res;
    },
    [dataRef, service]
  );

  const Ctx = ResourceTableContext as unknown as Context<
    ResourceTableContextState<T>
  >;

  const deleteResourceState = useDeleteResourceState({
    service,
    setData,
    dataRef,
  });

  return (
    <Ctx.Provider
      value={{ ...value, ...deleteResourceState, data, patchResource }}
    >
      {children}
    </Ctx.Provider>
  );
}

export default ResourceTableProvider;
