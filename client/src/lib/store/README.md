# Store

This module adapts Zustand for use with the Next.js App Router and provides a more declarative interface. To use it, follow these steps:

1. Wrap your application with the `Zustand` component.
2. Create a store:

```typescript
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { defineStoreInitializer } from "@lib/store";

export interface CounterStore {
  count: number;
  increment: () => void;
}

const store = defineStoreInitializer({
  // 'paths' determines which routes will trigger store initialization.
  // It can be a path regex:
  //   - /:id is a dynamic segment
  //   - {/:id} is an optional segment
  //   - /*any is a wildcard segment
  paths: ["{/:id}/*any"],
  key: "counter",

  getStoreData: async ({ path, params }) => {
    console.log("get store data", path, params);

    // Perform any asynchronous initialization here
    return {
      count: 0,
    };
  },

  createStore: (data) => {
    // 'data' is the return type of getStoreData
    return createWithEqualityFn<CounterStore>(
      (set) => ({
        count: data.count,
        increment: () => set((state) => ({ count: state.count + 1 })),
      }),
      shallow
    );
  },
});

// Export the created store
export const {
  initializer: counterStoreInitializer,
  key: counterStoreKey,
  useStore: useCounterStore,
} = store;
```

3. Register the store initializer in the manager:

```typescript
export const initializersManager = new StoreInitializersManager(
  new Map([[counterStoreKey, counterStoreInitializer]]) // Register the created initializer
);
```
