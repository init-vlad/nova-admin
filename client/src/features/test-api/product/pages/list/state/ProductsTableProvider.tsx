"use client";

import { productService } from "@/features/test-api/product/api/product-service";
import ResourceTableProvider from "@nova/lib/table/state/resource-table-provider";
import { Product } from "../../../product-types";

interface ProductsTableProviderProps {
  initialData: Product[];
  children: React.ReactNode;
}

export const ProductsTableProvider = ({
  initialData,
  children,
}: ProductsTableProviderProps) => {
  return (
    <ResourceTableProvider service={productService} initialData={initialData}>
      {children}
    </ResourceTableProvider>
  );
};
