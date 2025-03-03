import { Site, Test } from "../../types";
import { getSiteUrl } from "../../helpers/helpers";

const sortByStringField = (
  a: Test,
  b: Test,
  field: keyof Test,
  direction: "asc" | "desc"
) => {
  const aValue = a[field];
  const bValue = b[field];
  if (aValue < bValue) return direction === "asc" ? -1 : 1;
  if (aValue > bValue) return direction === "asc" ? 1 : -1;
  return 0;
};

const sortByStatus = (a: Test, b: Test, direction: "asc" | "desc") => {
  const statusOrder = ["ONLINE", "PAUSED", "STOPPED", "DRAFT"];
  const aIndex = statusOrder.indexOf(a.status);
  const bIndex = statusOrder.indexOf(b.status);
  return direction === "asc" ? aIndex - bIndex : bIndex - aIndex;
};

const sortBySite = (
  a: Test,
  b: Test,
  direction: "asc" | "desc",
  mappedSites: Record<number, Site>
) => {
  const aValue = getSiteUrl(mappedSites[a.siteId]?.url) || "";
  const bValue = getSiteUrl(mappedSites[b.siteId]?.url) || "";
  if (aValue < bValue) return direction === "asc" ? -1 : 1;
  if (aValue > bValue) return direction === "asc" ? 1 : -1;
  return 0;
};

export const sortFunctions = {
  name: (a: Test, b: Test, direction: "asc" | "desc") =>
    sortByStringField(a, b, "name", direction),
  type: (a: Test, b: Test, direction: "asc" | "desc") =>
    sortByStringField(a, b, "type", direction),
  status: sortByStatus,
  siteId: (
    a: Test,
    b: Test,
    direction: "asc" | "desc",
    mappedSites: Record<number, Site>
  ) => sortBySite(a, b, direction, mappedSites),
};
