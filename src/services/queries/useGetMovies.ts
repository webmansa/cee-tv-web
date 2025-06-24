import { useQuery } from "@tanstack/react-query";
import tmdb from "src/config/tmdb/exports";
import { get } from "src/utils/apiClient";

export const useGetMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: () => get(tmdb.movies),
    enabled: true,
  });
};
