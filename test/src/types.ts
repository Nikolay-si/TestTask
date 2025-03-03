export enum Type {
  CLASSIC = "Classic",
  SERVER_SIDE = "Server-side",
  MVT = "MVT",
}

export enum Status {
  DRAFT = "DRAFT",
  ONLINE = "ONLINE",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export interface Site {
  getName(url: any): unknown;
  id: number;
  url: string;
}

export interface Test {
  id: number;
  name: string;
  type: Type;
  status: Status;
  siteId: number;
}

export interface apiResponse {
  tests: Test[];
  sites: Site[];
}

export type SortKey = "name" | "type" | "status" | "siteId";

export interface SortConfig {
  key: SortKey;
  direction: "asc" | "desc";
}
