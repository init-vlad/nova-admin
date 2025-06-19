import { debug } from "@env";
import { api } from "@shared/api/api";
import { HasId } from "./mixins";
import {
  DeleteResourceRequest,
  GetResourcePaginatedResponse,
  GetResourceRequestWithPostMethod,
  PatchResourceRequest,
  PatchResourceResponse,
} from "./api-methods";
import { GetResourceError } from "./errors";
import { FetchError } from "../../../shared/lib/fetch/fetch";

export type PostGetFn<T extends HasId> = NovaResourceService<T>["postGet"];
export type PatchFn<T extends HasId> = NovaResourceService<T>["patch"];
export type DeleteFn<T extends HasId> = NovaResourceService<T>["delete"];

export class NovaResourceService<Entity extends HasId> {
  protected url: string;
  protected api = api;
  protected debug = debug;
  protected name = this.constructor.name;

  constructor(url: string) {
    this.url = url;
  }

  async postGet({
    options,
    body,
  }: GetResourceRequestWithPostMethod = {}): Promise<
    GetResourcePaginatedResponse<Entity>
  > {
    try {
      const response = await this.api.post<
        GetResourcePaginatedResponse<Entity>
      >(`${this.url}/get`, body || {}, options);
      return response.data;
    } catch (error) {
      if (this.debug) {
        console.warn(`${this.name} - Error fetching resource:`, error);
      }

      return GetResourceError.new<Entity>(error as FetchError);
    }
  }

  async patch({
    data,
  }: PatchResourceRequest<Entity>): Promise<
    PatchResourceResponse<Entity> | FetchError
  > {
    try {
      const response = await this.api.patch<PatchResourceResponse<Entity>>(
        `${this.url}/${data.id}`,
        data
      );

      return response.data;
    } catch (error) {
      return error as FetchError;
    }
  }

  async delete({
    id,
    options,
  }: DeleteResourceRequest<Entity>): Promise<FetchError | null> {
    try {
      await this.api.delete(`${this.url}/${id}`, options);
      return null;
    } catch (error) {
      return error as FetchError;
    }
  }
}
