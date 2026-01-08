"use server";

import { Media } from "../generated/prisma/client";
import { updateNumberOfLikes } from "@/lib/prisma-db";
import { updateTag, revalidatePath } from "next/cache";

export const incrementNumberOfLikes = async (media: Media) => {
  try {
    await updateNumberOfLikes(media.id);

    updateTag(`medias-${media.photographerId}`);
    revalidatePath(`photographer/${media.photographerId}`);

    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
