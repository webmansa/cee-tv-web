import { useQuery } from "@tanstack/react-query";
import tmdb from "src/config/tmdb/exports";
import { get } from "src/utils/apiClient";

export const useGetSeries = () => {
  return useQuery({
    queryKey: ["series"],
    queryFn: () => get(tmdb.series),
    enabled: true,
  });
};
