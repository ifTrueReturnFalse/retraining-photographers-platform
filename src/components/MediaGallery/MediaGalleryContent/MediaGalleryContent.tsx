"use client";

import styles from "./MediaGalleryContent.module.css";
import Image from "next/image";
import { Media } from "@/app/generated/prisma/client";
import { useVideoThumbnail } from "@/hooks/useVideoThumbnail";

interface MediaGalleryContentProps {
  media: Media;
  onPhotoClick: (media: Media) => void
}

export function MediaGalleryContent({ media, onPhotoClick }: MediaGalleryContentProps) {
  const { thumbnail, loading } = useVideoThumbnail(media.video);

  return (
    <article className={styles.container}>
      <figure className={styles.mediaContainer} onClick={() => onPhotoClick(media)}>
        {media.image != null && (
          <Image
            src={`/content/${media.image}`}
            alt={media.title}
            width={350}
            height={300}
            className={styles.photo}
          />
        )}
        {media.video != null &&
          (loading ? (
            <div className={styles.loader} />
          ) : (
            thumbnail && (
              <Image
                src={thumbnail}
                alt={media.title}
                width={350}
                height={300}
                className={styles.photo}
              />
            )
          ))}
      </figure>

      <div className={styles.legend}>
        <p>{media.title}</p>
        <p className={styles.likes}>
          {media.likes}&nbsp;
          <svg
            width="21"
            height="24"
            viewBox="0 0 22 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.28 16.6 12.36 11.45 17.04L10 18.35Z"
              fill="#911C1C"
            />
          </svg>
        </p>
      </div>
    </article>
  );
}
