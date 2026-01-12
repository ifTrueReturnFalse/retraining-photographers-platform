"use server";

import { Media } from "../generated/prisma/client";
import { updateNumberOfLikes } from "@/lib/prisma-db";
import { updateTag, revalidatePath } from "next/cache";

// Action to increment the number of likes for a given media item
export const incrementNumberOfLikes = async (media: Media) => {
  try {
    // Update the number of likes in the database
    await updateNumberOfLikes(media.id);

    // Invalidate the cache for the specific photographer's media
    // This ensures that the updated like count is reflected on the client side
    updateTag(`medias-${media.photographerId}`);
    revalidatePath(`photographer/${media.photographerId}`);

    // Return success status
    return { success: true };
  } catch (error) {
    // Return error status if something goes wrong
    return { success: false, error };
  }
};
