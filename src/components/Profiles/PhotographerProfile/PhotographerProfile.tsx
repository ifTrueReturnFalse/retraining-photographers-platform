import styles from "./PhotographerProfile.module.css";
import { Photographer } from "@/app/generated/prisma/client";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { ContactButton } from "@/components/Buttons/ContactButton";

interface PhotographerProfileProps {
  photographer: Photographer;
}

export function PhotographerProfile({
  photographer,
}: PhotographerProfileProps) {
  const { name, city, country, tagline, portrait } = photographer;

  return (
    <section className={styles.container}>
      <div>
        <h1 className={styles.name}>{name}</h1>
        <p className={styles.location}>{`${city}, ${country}`}</p>
        <p className={styles.tagline}>{tagline}</p>
      </div>

      <div>
        <ContactButton />
      </div>

      <div>
        <ProfilePhoto profilePhotoSrc={portrait} profilePhotoAlt={name} />
      </div>
    </section>
  );
}
