import { useZustandStore } from "./state/context";
import { GetStoreDataFn, Store, StoreInitializer } from "./types";

export const bindStoreKey = <T>(key: string) => {
  return useZustandStore.bind(null, key) as Store<T>;
};

export function defineStoreInitializer<
  T,
  const GSD extends GetStoreDataFn<any>
>(data: {
  paths: string[];
  key: string;
  getStoreData: GSD;
  createStore: (data: Awaited<ReturnType<GSD>>) => Store<T>;
}): {
  initializer: StoreInitializer<T, Awaited<ReturnType<GSD>>>;
  key: string;
  useStore: Store<T>;
} {
  return {
    initializer: {
      createStore: data.createStore,
      getStoreData: data.getStoreData,
      pathTemplates: data.paths,
    },
    key: data.key,
    useStore: bindStoreKey(data.key),
  };
}
