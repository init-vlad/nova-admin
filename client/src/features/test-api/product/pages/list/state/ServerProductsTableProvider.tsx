import { productService } from "@/features/test-api/product/api/product-service";
import { ProductsTableProvider } from "./ProductsTableProvider";

interface ServerProductsTableProviderProps {
  children: React.ReactNode;
}

export const ServerProductsTableProvider = async ({
  children,
}: ServerProductsTableProviderProps) => {
  const products = await productService.postGet();

  return (
    <ProductsTableProvider initialData={products.data}>
      {children}
    </ProductsTableProvider>
  );
};
