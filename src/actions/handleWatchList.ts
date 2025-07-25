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
    let existingItem = null;

    try {
      switch (showType) {
        case "movie":
          existingItem = await prisma.movie.findFirst({
            where: {
              movieID: id,
            },
          });
          break;

        case "serie":
          existingItem = await prisma.series.findFirst({
            where: {
              movieID: id,
            },
          });
      }
    } catch (error) {
      console.error(`Error finding existing ${showType} with movieID ${id}:`, error);
    }

    if (existingItem && showType === "movie") {
      console.log("inside the if block....");
      await prisma.movie.update({
        where: {
          id: existingItem.id,
        },
        data: {
          isFavorite,
        },
      });

      return
    } else if (existingItem && showType === "serie") {
        await prisma.series.update({
          where: {
            id: existingItem.id,
          },
          data: {
            isFavorite,
          },
        });

        return
      }

    await model.create({
      data: {
        title,
        movieID: id,
        isFavorite,
        image,
        year,
      },
    });
  });
