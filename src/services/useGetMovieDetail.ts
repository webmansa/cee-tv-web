import { useQuery } from "@tanstack/react-query";
import tmdb from "src/config/tmdb/exports";
import { MovieDetail } from "src/types/movieDetails.types";
import { get } from "src/utils/apiClient";

export const useGetMovieDetail = (id: string) => {
  return useQuery({
    queryKey: ["movie-detail"],
    queryFn: async () => get<MovieDetail>(`/movie/${id}`),
    enabled: true,
  });
};
