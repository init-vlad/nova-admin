export interface HasId {
  id: unknown;
}

export interface HasUuid {
  id: string;
}

export interface HasTimestamps {
  created_at: string;
  updated_at: string;
}

export interface Model extends HasId, HasTimestamps {}
