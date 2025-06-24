import { createServerFn } from "@tanstack/react-start";
import prisma from "src/config/prisma/exports";
import z from "zod";

export const WatchListMutationVariablesSchema = z.object({
  id: z.string(),
  title: z.string(),
  showType: z.enum(["movie", "serie"]),
  isFavorite: z.boolean(),
  image: z.string(),
  year: z.string()
});

export type WatchListMutationVariables = z.infer<
  typeof WatchListMutationVariablesSchema
>;

export const handleWatchList = createServerFn({
  method: "POST",
  response: "data",
})
  .validator(WatchListMutationVariablesSchema)
  .handler(async ({ data: { id, title, showType, isFavorite, image, year } }) => {
    const model = showType === "movie" ? prisma.movie : prisma.series;

    if (showType === "movie") {
      const existing = await prisma.movie.findUnique({
        where: { id: Number(id) },
      });

      if (existing) {
        await prisma.movie.update({
          where: {
            id: Number(id),
          },
          data: {
            title,
            movieID: id,
            isFavorite,
          },
        });
      } else {
        await model.create({
          data: {
            title,
            movieID: id,
            isFavorite,
            image,
            year,
          },
        });
      }
    }
  });
