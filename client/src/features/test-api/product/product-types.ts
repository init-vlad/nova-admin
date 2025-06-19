import { Model } from "@nova/lib/api/mixins";

export interface Product extends Model {
  name: string;
  price: number;
  description: string;
}
