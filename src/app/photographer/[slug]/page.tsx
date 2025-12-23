import { PhotographerHeader } from "@/components/Headers/PhotographerHeader";
import { PhotographerProfile } from "@/components/Profiles/PhotographerProfile";
import { MediaGallery } from "@/components/MediaGallery/MediaGalleryContainer/MediaGallery";
import { CustomSelect } from "@/components/CustomSelect";
import { getPhotographer, getAllMediasForPhotographer } from "@/lib/prisma-db";
import { notFound } from "next/navigation";
import styles from "./PhotographerPage.module.css";

export default async function PhotographerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Get the id
  const { slug } = await params;
  const photographerId = parseInt(slug);
  // Check if the id is a number
  if (isNaN(photographerId)) notFound();

  // Get the photographer informations
  const photographer = await getPhotographer(photographerId);
  // Check if it exists
  if (!photographer) notFound();

  // Get all medias
  const medias = await getAllMediasForPhotographer(photographerId);

  return (
    <>
      <PhotographerHeader />
      <main className={styles.container}>
        <PhotographerProfile photographer={photographer} />
        <CustomSelect className={styles.mediaSort} />
        <MediaGallery medias={medias} />
      </main>
    </>
  );
}
