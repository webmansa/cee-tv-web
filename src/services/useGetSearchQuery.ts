import { useQuery } from "@tanstack/react-query";
import tmdb from "src/config/tmdb/exports";
import { SearchQuery } from "src/types/searchQuery.types";
import { get } from "src/utils/apiClient";

export const useGetSearchQuery = (searchTerm: string) => {
  return useQuery({
    queryKey: ["search-query"],
    enabled: !!searchTerm,
    queryFn: () =>
      get<SearchQuery>(
        `${tmdb.search}${searchTerm}&include_adult=true&language=en-US&page=1`
      ),
  });
};