import { useMutation } from "@tanstack/react-query";
import { Bounce, Slide, toast } from "react-toastify";
import { handleWatchList, WatchListMutationVariables } from "src/actions/handleWatchList";
import { queryClient } from "src/routes/__root";


  export const useCreateFavoriteWatchList = () =>
    useMutation({
      mutationFn: async (mutationVariable: WatchListMutationVariables) =>
        handleWatchList({
          data: mutationVariable,
        }),
      mutationKey: ["create-watchlist"],
      onSuccess: (_, variable) => {
        const text = variable.isFavorite ? 'added' : 'removed'

        toast(`🎬 Successfully ${text} ${variable.title} to favorite!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        });

        variable.showType == "movie"
          ? queryClient.invalidateQueries({ queryKey: ["favorite-movies"] })
          : queryClient.invalidateQueries({ queryKey: ["favorite-series"] });
      },
      onError: (error, variables, context) => {
        toast.error(JSON.stringify(error.message), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          theme: "colored",
          transition: Bounce,
        });
        // Optional: Rollback optimistic update if onMutate was used
        // queryClient.setQueryData(['watchlist'], context?.previousWatchList);
      },
    });