import { useQuery } from "@tanstack/react-query";
import { getAllFavoritesMovies } from "src/actions/getAllFavoritesMovies";

export const useGetAllFavoriteMovie = () => {

  return useQuery({
    queryKey: ["favorite-movies"],
    queryFn: getAllFavoritesMovies,
    enabled: true
  });
};
