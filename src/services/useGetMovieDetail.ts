import { useQuery } from "@tanstack/react-query";
import tmdb from "src/config/tmdb/exports";
import { get } from "src/utils/apiClient";

export const useGetMovieDetail = (id: string) => {
  return useQuery({
    queryKey: ["movie-detail"],
    queryFn: () => get(`/movie/${id}`),
    enabled: true,
  });
};
