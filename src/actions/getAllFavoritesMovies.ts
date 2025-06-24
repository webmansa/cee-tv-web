import { createServerFn } from "@tanstack/react-start";
import prisma from "src/config/prisma/exports";
import z from "zod";

export const FavoriteMovieSchema = z.object({
  id: z.string(),
  title: z.string(),
  movieID: z.string(),
  isFavorite: z.boolean(),
});

export type FavoriteMovie = z.infer<typeof FavoriteMovieSchema>;

export const getAllFavoritesMovies = createServerFn({
  method: "GET",
  response: "data",
}).handler(async () => {
    return await prisma.movie.findMany()
});
