import { useMutation } from "@tanstack/react-query";
import { Bounce, Slide, toast } from "react-toastify";
import { handleWatchList, WatchListMutationVariables } from "src/actions/handleWatchList";


  export const useCreateFavoriteWatchList = () =>
    useMutation({
      mutationFn: async (mutationVariable: WatchListMutationVariables) =>
        handleWatchList({
          data: mutationVariable,
        }),
      mutationKey: ["create-watchlist"],
      onSuccess: (data, variable, context) => {
        toast(`🎬 successfully added ${variable.title} to favorite!`, {
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