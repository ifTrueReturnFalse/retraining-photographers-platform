import styles from "./MediaGallery.module.css";
import { MediaGalleryContent } from "../MediaGalleryContent";
import { Media } from "@/app/generated/prisma/client";

interface MediaGalleryProps {
  medias: Media[];
}

export function MediaGallery({ medias }: MediaGalleryProps) {
  return (
  <section className={styles.container}>
    {medias.map((media) => (
      <MediaGalleryContent key={media.id} media={media} />
    ))}
  </section>);
}
