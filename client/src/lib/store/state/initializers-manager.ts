import {
  counterStoreInitializer,
  counterStoreKey,
} from "@/features/test-zustand/store/counter-store";
import {
  type MatchedInitializer,
  type StoresData,
  type StoreInitializer,
} from "../types";
import { match } from "path-to-regexp";

class StoreInitializersManager {
  private _initializers: Map<string, StoreInitializer<any, any>>;
  private _matchers: Map<string, ReturnType<typeof match>[]>;
  private _initializersArray: [string, StoreInitializer<any, any>][];

  constructor(initializers: Map<string, StoreInitializer<any, any>>) {
    this._initializers = initializers;
    this._initializersArray = Array.from(initializers.entries());

    this._matchers = new Map<string, ReturnType<typeof match>[]>(
      this._initializersArray.map(([key, val]) => [
        key,
        val.pathTemplates.map((path) => match(path)),
      ])
    );
  }

  get initializers() {
    return this._initializers;
  }

  get matchers() {
    return this._matchers;
  }

  async getStoresData(path: string): Promise<StoresData> {
    const matchedInitializers = this.getMatchedInitializers(path);

    const storesData = await Promise.all(
      matchedInitializers.map(async (matched) => {
        const store = await matched.initializer.getStoreData(matched.pathMatch);

        return [matched.key, store] as const;
      })
    );

    return new Map(storesData);
  }

  createStores(storesData: StoresData) {
    return new Map(
      this._initializersArray.map(([key, initializer]) => {
        const data = storesData.get(key);
        if (data === undefined) {
          throw new Error(`Store data by key "${key}" not found`);
        }

        return [key, initializer.createStore(data)];
      })
    );
  }

  private getMatchedInitializers(path: string) {
    const entries = this._initializersArray;

    return entries
      .map(([key, initializer]) => {
        const matchers = this._matchers.get(key);
        if (!matchers) {
          return null;
        }

        for (const matcher of matchers) {
          const result = matcher(path);
          if (result) {
            return {
              key,
              initializer,
              pathMatch: result,
            };
          }
        }

        return null;
      })
      .filter(Boolean) as unknown as MatchedInitializer<any, any>[];
  }
}

export const initializersManager = new StoreInitializersManager(
  new Map([[counterStoreKey, counterStoreInitializer]])
);
