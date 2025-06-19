"use client";

import { useCounterStore } from "@/features/test-zustand/store/counter-store";

export const ClientPage = () => {
  const { count, increment } = useCounterStore((state) => ({
    count: state.count,
    increment: state.increment,
  }));

  console.log("rerender 1");

  return (
    <div>
      <div>State: {count}</div>
      <button
        onClick={() => {
          increment();
        }}
      >
        Increment
      </button>
    </div>
  );
};
