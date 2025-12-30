import styles from "./PhotographerSummary.module.css";
import { Media, Photographer } from "@/app/generated/prisma/client";

interface PhotographerSummaryProps {
  medias: Media[];
  photographer: Photographer;
}

export function PhotographerSummary({
  medias,
  photographer,
}: PhotographerSummaryProps) {
  const totalLikes = medias.reduce(
    (sumLikes, media) => sumLikes + media.likes,
    0
  );

  const { price } = photographer;

  return (
    <p className={styles.container}>
      <span className={styles.likes}>
        {totalLikes}&nbsp;
        <svg
          width="21"
          height="24"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 18.35L8.55 17.03C3.4 12.36 0 9.28 0 5.5C0 2.42 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.09C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.42 20 5.5C20 9.28 16.6 12.36 11.45 17.04L10 18.35Z"
            fill="black"
          />
        </svg>
      </span>
      <span>{price}€/jour</span>
    </p>
  );
}
