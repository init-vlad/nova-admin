"use client";
import { createContext } from "react";

import { useContext } from "react";
import { Store } from "../types";

interface ZustandContextState {
  stores: Map<string, Store<unknown>>;
}

export const ZustandContext = createContext<null | ZustandContextState>(null);

export const useZustand = () => {
  const ctx = useContext(ZustandContext);

  if (!ctx) {
    throw new Error("useZustand must be used within a ZustandProvider");
  }

  return ctx;
};

export const useZustandStoreInstance = <T>(storeKey: string) => {
  const { stores } = useZustand();
  const store = stores.get(storeKey);

  if (!store) {
    throw new Error(`Store ${storeKey} not found`);
  }

  return store as Store<T>;
};

export function useZustandStore<S>(storeKey: string): S;

export function useZustandStore<S, U>(
  storeKey: string,
  selector: (state: S) => U
): U;

export function useZustandStore<S, U>(
  storeKey: string,
  selector?: (state: S) => U
) {
  const store = useZustandStoreInstance<S>(storeKey);

  if (!selector) {
    return store();
  }

  return store(selector);
}
