"use client";

import styles from "./MediaGallery.module.css";
import { MediaGalleryContent } from "../MediaGalleryContent";
import { Media } from "@/generated/prisma/client";
import { useState, useCallback } from "react";
import { LightboxModal } from "@/components/Modals/LightboxModal/LightboxModal";
import { IndexModifier } from "@/types/definitions";

/**
 * Props for the MediaGallery component.
 */
interface MediaGalleryProps {
  /** The list of media items to display in the gallery. */
  medias: Media[];
}

/**
 * MediaGallery component.
 *
 * Displays a grid of media items and handles the logic for opening a lightbox modal
 * to view individual media items in detail. It also manages navigation between media items
 * within the lightbox.
 *
 * @param {MediaGalleryProps} props - The props for the component.
 * @returns {JSX.Element} The rendered MediaGallery component.
 */
export function MediaGallery({ medias }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handles the click event on a media item.
   * Sets the selected media and opens the lightbox modal.
   *
   * @param {Media} media - The media item that was clicked.
   */
  const handlePhotoClick = (media: Media): void => {
    setSelectedMedia(media);
    setIsOpen(true);
  };

  /**
   * Closes the lightbox modal and resets the selected media.
   */
  const handleClose = (): void => {
    setSelectedMedia(null);
    setIsOpen(false);
  };

  /**
   * Changes the currently displayed media in the lightbox.
   * Supports circular navigation (next/previous).
   *
   * @param {IndexModifier} indexModifier - The direction to navigate (-1 for previous, 1 for next).
   */
  const changeModalMedia = useCallback(
    (indexModifier: IndexModifier): void => {
      if (!selectedMedia) return;

      // Find the index of the currently selected media in the medias array
      const currentIndex = medias.findIndex(
        (media) => media.id === selectedMedia.id
      );

      if (currentIndex === -1) return;

      // Calculate the index of the next media to display
      let nextIndex = currentIndex + indexModifier;

      // Handle circular navigation:
      // If index is less than 0, wrap around to the last item
      if (nextIndex < 0) {
        nextIndex = medias.length - 1;
      }
      // If index exceeds the array length, wrap around to the first item
      else if (nextIndex >= medias.length) {
        nextIndex = 0;
      }
      setSelectedMedia(medias[nextIndex]);
    },
    [selectedMedia, medias]
  );

  return (
    <>
      <section className={styles.container}>
        {medias.map((media) => (
          <MediaGalleryContent
            key={media.id}
            media={media}
            onPhotoClick={handlePhotoClick}
          />
        ))}
      </section>

      {selectedMedia && isOpen && (
        <LightboxModal
          isOpen={isOpen}
          onClose={handleClose}
          currentMedia={selectedMedia}
          changeMedia={changeModalMedia}
        />
      )}
    </>
  );
}
