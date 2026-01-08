import prisma from "./db";
import type { Photographer, Media } from "@/app/generated/prisma/client";

export const getAllPhotographers = async () => await prisma.photographer.findMany();

export const getPhotographer = async (id: Photographer["id"]) => {
  return await prisma.photographer.findUnique({
    where: { id },
  });
};

export const getAllMediasForPhotographer = async (
  photographerId: Media["photographerId"]
) => {
  return await prisma.media.findMany({
    where: { photographerId },
  });
};

export const updateNumberOfLikes = async (
  mediaId: Media["id"],
  newNumberOfLikes: Media["likes"]
) => {
  await prisma.media.update({
    where: { id: mediaId },
    data: { likes: newNumberOfLikes },
  });
};
