import { FetchError } from "../../../shared/lib/fetch/fetch";
import { Pagination } from "./get-entity-options";
import { HasId } from "./mixins";

export class GetResourceError<T extends HasId> {
  data: T[] = [];
  pagination: Pagination = {
    page: 1,
    total_pages: 1,
    total_records: 0,
  };

  error: FetchError;
  constructor(error: FetchError) {
    this.error = error;
  }

  static new<T extends HasId>(error: FetchError): GetResourceError<T> {
    return new GetResourceError<T>(error);
  }
}
