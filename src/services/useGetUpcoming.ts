import { useQuery } from "@tanstack/react-query";
import tmdb from "src/config/tmdb/exports";
import { SeriesDetail } from "src/types/seriesDetails.types";
import { UpcomingMovie } from "src/types/upcomingMovie.types";
import { get } from "src/utils/apiClient";

export const useGetUpcoming = () => {
  return useQuery({
    queryKey: ["upcoming"],
    queryFn: async () => get<UpcomingMovie>(tmdb.upcoming),
    enabled: true,
  });
};
