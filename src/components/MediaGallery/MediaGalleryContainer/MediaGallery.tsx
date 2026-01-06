"use client";

import styles from "./MediaGallery.module.css";
import { MediaGalleryContent } from "../MediaGalleryContent";
import { Media } from "@/app/generated/prisma/client";
import { useState, useCallback } from "react";
import { LightboxModal } from "@/components/Modals/LightboxModal/LightboxModal";
import { IndexModifier } from "@/types/definitions";

interface MediaGalleryProps {
  medias: Media[];
}

export function MediaGallery({ medias }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handlePhotoClick = (media: Media): void => {
    setSelectedMedia(media);
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setSelectedMedia(null);
    setIsOpen(false);
  };

  const changeModalMedia = useCallback(
    (indexModifier: IndexModifier): void => {
      if (!selectedMedia) return;

      const currentIndex = medias.findIndex(
        (media) => media.id === selectedMedia.id
      );

      if (currentIndex === -1) return;

      let nextIndex = currentIndex + indexModifier;

      if (nextIndex < 0) {
        nextIndex = medias.length - 1;
      } else if (nextIndex >= medias.length) {
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
