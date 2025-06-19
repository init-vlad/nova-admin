import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { defineStoreInitializer } from "@lib/store";

export interface CounterStore {
  count: number;
  count2: number;
  increment: () => void;
  increment2: () => void;
}

const store = defineStoreInitializer({
  paths: ["/dashboard/:id", "{/:id}/*any"],
  key: "counter",

  getStoreData: async ({ path, params }) => {
    console.log("get store data", path, params);

    // some async initialization
    return {
      count: 0,
      count2: 0,
    };
  },

  createStore: (data) => {
    return createWithEqualityFn<CounterStore>((set) => {
      return {
        count: data.count,
        count2: data.count2,
        increment: () => set((state) => ({ count: state.count + 1 })),
        increment2: () => set((state) => ({ count2: state.count2 + 1 })),
      };
    }, shallow);
  },
});

export const {
  initializer: counterStoreInitializer,
  key: counterStoreKey,
  useStore: useCounterStore,
} = store;
