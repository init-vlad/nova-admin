import { ProductsTable } from "./products-table";
import { ServerProductsTableProvider } from "../state/ServerProductsTableProvider";

async function ListPage() {
  return (
    <ServerProductsTableProvider>
      <ProductsTable />
    </ServerProductsTableProvider>
  );
}

export default ListPage;

// create generic store factory that takes service
// create typed store for each resource with generic store factory
// register store in zustand context
// got store from zustand context and pass to resource table provider
// resource table provider should share store hook with other table components
