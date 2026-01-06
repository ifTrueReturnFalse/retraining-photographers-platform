"use client";

import { BaseModal } from "../BaseModal";
import { ModalProps, IndexModifier } from "@/types/definitions";
import { Media } from "@/app/generated/prisma/client";
import styles from "./LightboxModal.module.css";
import Image from "next/image";
import { Video } from "@/components/Video";
import { useEffect } from "react";

interface LightboxModalProps extends ModalProps {
  currentMedia: Media;
  changeMedia: (indexModifier: IndexModifier) => void;
}

export function LightboxModal({
  isOpen,
  onClose,
  currentMedia,
  changeMedia,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key == "ArrowLeft") {
        event.preventDefault();
        changeMedia(-1);
      }
      if (event.key == "ArrowRight") {
        event.preventDefault();
        changeMedia(1);
      }
      if(event.key == "Escape") {
        onClose()
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

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
        {currentMedia.image != null && (
          <Image
            src={`/content/${currentMedia.image}`}
            alt={currentMedia.title}
            width={1050}
            height={900}
            className={styles.image}
          />
        )}

        {currentMedia.video != null && (
          <Video src={`/content/${currentMedia.video}`} />
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
