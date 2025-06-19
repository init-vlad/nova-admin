import { initializersManager } from "./initializers-manager";
import { ZustandProvider } from "./provider";

interface ZustandProps {
  children: React.ReactNode;
}

async function Zustand({ children }: ZustandProps) {
  const storesData = await initializersManager.getStoresData(
    "/dashboard/products"
  );

  return <ZustandProvider storesData={storesData}>{children}</ZustandProvider>;
}

export default Zustand;
