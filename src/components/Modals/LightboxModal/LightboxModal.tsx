"use client";

import { BaseModal } from "../BaseModal";
import { ModalProps, IndexModifier } from "@/types/definitions";
import { Media } from "@/app/generated/prisma/client";
import styles from "./LightboxModal.module.css";
import Image from "next/image";
import { Video } from "@/components/Video";
import { useEffect } from "react";

/**
 * Props for the LightboxModal component.
 */
interface LightboxModalProps extends ModalProps {
  /** The current media object to display (image or video). */
  currentMedia: Media;
  /**
   * Callback to change the displayed media.
   * @param indexModifier - The offset to change the index by (e.g., -1 for previous, 1 for next).
   */
  changeMedia: (indexModifier: IndexModifier) => void;
}

/**
 * LightboxModal component.
 * Displays a full-screen modal with an image or video, allowing navigation between media items.
 * Handles keyboard navigation (Left/Right arrows) and closing (Escape).
 *
 * @param props - The properties for the LightboxModal.
 */
export function LightboxModal({
  isOpen,
  onClose,
  currentMedia,
  changeMedia,
}: LightboxModalProps) {
  useEffect(() => {
    /**
     * Handles keyboard events for navigation and closing.
     * @param event - The native keyboard event.
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      // Navigate to the previous media item
      if (event.key == "ArrowLeft") {
        event.preventDefault(); // Prevent default scroll behavior
        changeMedia(-1);
      }
      // Navigate to the next media item
      if (event.key == "ArrowRight") {
        event.preventDefault();
        changeMedia(1);
      }
    };

    // Add event listener when the modal is open
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup: remove event listener when the component unmounts or modal closes
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, changeMedia, onClose]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      closeColor="#901c1c"
      className={styles.lightBoxModal}
    >
      <button
        type="button"
        onClick={() => changeMedia(-1)}
        className={styles.button}
      >
        <svg
          width="30"
          height="48"
          viewBox="0 0 30 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 -2.46532e-07L-0.000107861 24L23.9999 48L29.6399 42.36Z"
            fill="#911C1C"
          />
        </svg>
      </button>

      <div className={styles.imageContainer}>
        {/* Render the image if the media type is an image */}
        {currentMedia.image != null && (
          <Image
            src={`/content/${currentMedia.image}`}
            alt={currentMedia.title}
            width={1050}
            height={900}
            className={styles.image}
          />
        )}

        {/* Render the video if the media type is a video */}
        {currentMedia.video != null && (
          <Video src={`/content/${currentMedia.video}`} className={styles.video} />
        )}

        <p className={styles.title}>{currentMedia.title}</p>
      </div>

      <button
        type="button"
        onClick={() => changeMedia(1)}
        className={styles.button}
      >
        <svg
          width="30"
          height="48"
          viewBox="0 0 30 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.05138e-07 5.64L18.32 24L6.72563e-08 42.36L5.64 48L29.64 24L5.64 3.88195e-06L5.05138e-07 5.64Z"
            fill="#911C1C"
          />
        </svg>
      </button>
    </BaseModal>
  );
}
