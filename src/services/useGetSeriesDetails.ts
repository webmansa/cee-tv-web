import { useQuery } from "@tanstack/react-query";
import { MovieDetail } from "src/types/movieDetails.types";
import { get } from "src/utils/apiClient";

export const useGetSeriesDetails = (id: string) => {
  return useQuery({
    queryKey: ["series-detail"],
    queryFn: async () => get<MovieDetail>(`/movie/${id}`),
    enabled: true,
  });
};
