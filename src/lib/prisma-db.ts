import { unstable_cache } from "next/cache";
import prisma from "./db";
import type { Photographer, Media } from "@/app/generated/prisma/client";

export const getAllPhotographers = async () =>
  await prisma.photographer.findMany();

export const getPhotographer = async (id: Photographer["id"]) => {
  return await prisma.photographer.findUnique({
    where: { id },
  });
};

export const getAllMediasForPhotographer = async (
  photographerId: Media["photographerId"]
) => {
  const fetchMedia = async () => {
    return await prisma.media.findMany({
      where: { photographerId },
    });
  };

  const cachedMedias = unstable_cache(
    async () => fetchMedia(),
    [`medias-photographer-${photographerId}`],
    {
      tags: ["medias", `medias-${photographerId}`],
    }
  );

  return cachedMedias();
};

export const updateNumberOfLikes = async (mediaId: Media["id"]) => {
  await prisma.media.update({
    where: { id: mediaId },
    data: { likes: { increment: 1 } },
  });
};
