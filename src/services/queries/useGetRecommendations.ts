import { useQuery } from "@tanstack/react-query"
import tmdb from "src/config/tmdb/exports"
import { get } from "src/utils/apiClient"

export const useGetRecommendations = () => {
    return  useQuery({
        queryKey: ['popular-movies'],
        queryFn: () =>  get(tmdb.popular),
    })
}