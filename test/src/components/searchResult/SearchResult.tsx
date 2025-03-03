import React from "react";
import { Result } from "../result/Result";
import { Site, SortKey, Test } from "../../types";
import { getSiteUrl } from "../../helpers/helpers";

interface Props {
  sites: Site[];
  tests: Test[];
  onSort: (key: SortKey) => void;
  sortConfig: { key: SortKey; direction: "asc" | "desc" } | null;
}

export const SearchResult = ({ tests, sites }: Props) => {
  const mappedSites = sites.reduce((acc, site) => {
    acc[site.id] = site;
    return acc;
  }, {} as Record<number, Site>);

  return (
    <div>
      <ul>
        {tests.map((test) => {
          const site = mappedSites[test.siteId].url;
          return (
            <li key={test.id}>
              <Result
                name={test.name}
                type={test.type}
                status={test.status}
                site={getSiteUrl(site)}
                testId={test.id}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
