"use client";

import { useRef } from "react";
import { ZustandContext } from "./context";
import { type StoresData } from "../types";
import { initializersManager } from "./initializers-manager";

interface ZustandProviderProps {
  children: React.ReactNode;
  storesData: StoresData;
}

export const ZustandProvider = ({
  children,
  storesData,
}: ZustandProviderProps) => {
  const storesRef = useRef(initializersManager.createStores(storesData));

  return (
    <ZustandContext.Provider value={{ stores: storesRef.current }}>
      {children}
    </ZustandContext.Provider>
  );
};
