import styles from "./ProfilePhoto.module.css";
import Image from "next/image";

interface ProfilePhotoProps {
  profilePhotoSrc: string;
  profilePhotoAlt: string;
}

export function ProfilePhoto({
  profilePhotoSrc,
}: ProfilePhotoProps) {
  return (
    <figure className={styles.photoContainer}>
      <Image
        src={`/content/${profilePhotoSrc}`}
        alt=""
        height={200}
        width={200}
        className={styles.photo}
      />
    </figure>
  );
}
