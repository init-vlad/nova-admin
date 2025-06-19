"use client";

import { useCounterStore } from "@/features/test-zustand/store/counter-store";

export const ClientPage2 = () => {
  const { count2, increment2 } = useCounterStore((state) => ({
    count2: state.count2,
    increment2: state.increment2,
  }));
  console.log("rerender 2");

  return (
    <div>
      <div>State 2: {count2}</div>
      <button
        onClick={() => {
          increment2();
        }}
      >
        Increment
      </button>
    </div>
  );
};
