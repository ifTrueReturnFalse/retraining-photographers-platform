"use client";

import styles from "./MediaGalleryContent.module.css";
import Image from "next/image";
import { Media } from "@/app/generated/prisma/client";
import { useVideoThumbnail } from "@/hooks/useVideoThumbnail";
import { incrementNumberOfLikes } from "@/actions/media-actions";
import { useOptimistic, useTransition } from "react";

/**
 * Props for the MediaGalleryContent component.
 */
interface MediaGalleryContentProps {
  /** The media object containing details like title, image/video source, and likes. */
  media: Media;
  /** Callback function triggered when the media item is clicked. */
  onPhotoClick: (media: Media) => void;
}

/**
 * Displays a single media item (image or video) within the gallery.
 * Handles video thumbnail generation and displays media metadata (title, likes).
 *
 * @param props - The component props.
 * @param props.media - The media data to display.
 * @param props.onPhotoClick - Handler for click events on the media item.
 * @returns A React article element containing the media and its legend.
 */
export function MediaGalleryContent({
  media,
  onPhotoClick,
}: MediaGalleryContentProps) {
  // Retrieve video thumbnail and loading state if the media is a video
  const { thumbnail, loading } = useVideoThumbnail(media.video);
  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    media.likes,
    (state) => state + 1
  );
  const [isPending, startTransition] = useTransition();

  const addLike = async () => {
    startTransition(async () => {
      addOptimisticLikes(1);
      await incrementNumberOfLikes(media);
    });
  };

  return (
    <article className={styles.container}>
      {/* Clickable container for the media item */}
      <figure
        className={styles.mediaContainer}
        onClick={() => onPhotoClick(media)}
      >
        {/* Render standard image if the media has an image source */}
        {media.image != null && (
          <Image
            src={`/content/${media.image}`}
            alt={media.title}
            width={350}
            height={300}
            className={styles.photo}
          />
        )}
        {/* Render video thumbnail logic if the media has a video source */}
        {media.video != null &&
          (loading ? (
            // Show loader while the thumbnail is being generated/fetched
            <div className={styles.loader} />
          ) : (
            // Display the generated thumbnail once loaded
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
        <p className={styles.likes} onClick={() => addLike()}>
          {optimisticLikes}&nbsp;
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
