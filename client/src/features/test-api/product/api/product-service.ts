import { NovaResourceService } from "@nova/lib/api/nova-resource-service";
import { Product } from "../product-types";

class ProductService extends NovaResourceService<Product> {
  constructor() {
    super("/products");
  }
}

export const productService = new ProductService();
