import styles from "./ProfilePhoto.module.css";
import Image from "next/image";

interface ProfilePhotoProps {
  profilePhotoSrc: string;
  profilePhotoAlt: string;
}

export function ProfilePhoto({
  profilePhotoSrc,
  profilePhotoAlt,
}: ProfilePhotoProps) {
  return (
    <div className={styles.photoContainer}>
      <Image
        src={`/content/${profilePhotoSrc}`}
        alt={profilePhotoAlt}
        height={200}
        width={200}
        className={styles.photo}
      />
    </div>
  );
}
