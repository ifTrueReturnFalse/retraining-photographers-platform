import styles from "./IndexProfileCard.module.css";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import Link from "next/link";
import { Photographer } from "@/app/generated/prisma/client";

interface IndexProfileCardProps {
  photographer: Photographer
}

export function IndexProfileCard({photographer}: IndexProfileCardProps) {
  const {portrait, name, city, country, tagline, price} = photographer

  return (
    <article className={styles.container}>
      <Link href={"#"} className={styles.link}>
        <ProfilePhoto profilePhotoSrc={portrait} profilePhotoAlt={name} />
        <h2>{name}</h2>
      </Link>

      <p className={styles.location}>{`${city}, ${country}`}</p>
      <p className={styles.tagline}>{tagline}</p>
      <p className={styles.price}>{price}€/jour</p>
    </article>
  );
}
