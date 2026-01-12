import { Media } from "@/generated/prisma/client";
import { SelectOption } from "@/types/definitions";

// Used to sort medias 
export function sortMediaBy(medias: Media[], sortOption: SelectOption['value']) {
  const mediasCopy = [...medias];

  switch (sortOption) {
    case "popularity":
      return mediasCopy.sort((a, b) => b.likes - a.likes);

    case "title":
      return mediasCopy.sort((a, b) => a.title.localeCompare(b.title));

    case "date":
      return mediasCopy.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    default:
      return medias;
  }
}
