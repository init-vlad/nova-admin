import { Pagination } from "./get-entity-options";
import { HasId } from "./mixins";

export class NullPaginatedResponse<T extends HasId> {
  data: T[] = [];
  pagination: Pagination = {
    page: 1,
    total_pages: 1,
    total_records: 0,
  };

  static new<T extends HasId>(): NullPaginatedResponse<T> {
    return new NullPaginatedResponse<T>();
  }
}
