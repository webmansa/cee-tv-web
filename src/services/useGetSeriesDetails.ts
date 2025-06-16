import { useQuery } from "@tanstack/react-query";
import { SeriesDetail } from "src/types/seriesDetails.types";
import { get } from "src/utils/apiClient";

export const useGetSeriesDetails = (id: string) => {
  return useQuery({
    queryKey: ["series-detail"],
    queryFn: async () => get<SeriesDetail>(`/tv/${id}`),
    enabled: true,
  });
};
