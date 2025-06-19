import { MatchResult } from "path-to-regexp";
import { StoreApi } from "zustand";
import { StoreMutatorIdentifier } from "zustand";
import { Mutate } from "zustand";
import { UseBoundStore } from "zustand";

type PathMatchResult = MatchResult<Partial<Record<string, string | string[]>>>;

export type Store<T> = UseBoundStore<
  Mutate<StoreApi<T>, [StoreMutatorIdentifier, T][]>
>;

export type GetStoreDataFn<Data> = (
  matchResult: PathMatchResult
) => Promise<Data>;

export interface StoreInitializer<T, Data = unknown> {
  pathTemplates: string[];
  getStoreData: GetStoreDataFn<Data>;
  createStore: (data: Data) => Store<T>;
}

export type StoresData = Map<string, {}>;

export interface MatchedInitializer<T, Data = unknown> {
  key: string;
  initializer: StoreInitializer<T, Data>;
  pathMatch: PathMatchResult;
}
