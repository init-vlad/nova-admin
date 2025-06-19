import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { HasId } from "@nova/lib/api/mixins";
import {
  DeleteFn,
  NovaResourceService,
} from "@nova/lib/api/nova-resource-service";
import { FetchError } from "@shared/lib/fetch/fetch";
import { DeleteResourceState } from "../resource-table-context";

export interface UseDeleteResourceStateProps<T extends HasId> {
  service: NovaResourceService<T>;
  setData: Dispatch<SetStateAction<T[]>>;
  dataRef: RefObject<T[]>;
}

export const useDeleteResourceState = <T extends HasId>({
  service,
  setData,
  dataRef,
}: UseDeleteResourceStateProps<T>): DeleteResourceState<T> => {
  const deleteResource: DeleteFn<T> = useCallback(
    async ({ id, options }) => {
      const prev = dataRef.current;
      setData((p) => p.filter((i) => i.id !== id));
      const res = await service.delete({ id, options });

      if (res instanceof FetchError) {
        console.log("Failed");
        setData(prev);
        return res;
      }

      console.log("Success");
      return res;
    },
    [service]
  );

  return { deleteResource };
};
