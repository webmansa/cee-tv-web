import { useQuery } from "@tanstack/react-query";
import { getAllFavoritesSeries } from "src/actions/getAllFavoritesSeries";

export const useGetAllFavoriteSeries = () => {
  return useQuery({
    queryKey: ["favorite-series"],
      queryFn: getAllFavoritesSeries,
    enabled: true,
  });
};
