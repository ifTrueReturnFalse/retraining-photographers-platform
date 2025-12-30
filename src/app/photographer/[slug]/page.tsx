import { PhotographerHeader } from "@/components/Headers/PhotographerHeader";
import { PhotographerProfile } from "@/components/Profiles/PhotographerProfile";
import { MediaGallery } from "@/components/MediaGallery/MediaGalleryContainer/MediaGallery";
import { CustomSelect } from "@/components/CustomSelect";
import { getPhotographer, getAllMediasForPhotographer } from "@/lib/prisma-db";
import { notFound } from "next/navigation";
import styles from "./PhotographerPage.module.css";
import { SelectOption } from "@/types/definitions";

export default async function PhotographerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Get the id
  const { slug } = await params;
  let photographerId = null;
  try {
    photographerId = parseInt(slug);
  } catch (error) {
    console.error(`Can't parse to int the slug : ${error}`);
    notFound();
  }
  // Check if the id is a number
  if (isNaN(photographerId)) notFound();

  // Get the photographer informations
  const photographer = await getPhotographer(photographerId);
  // Check if it exists
  if (!photographer) notFound();

  // Get all medias
  const medias = await getAllMediasForPhotographer(photographerId);

  const options: SelectOption[] = [
    { label: "Popularité", value: "popularity" },
    { label: "Date", value: "date" },
    { label: "Titre", value: "title" },
  ];

  return (
    <>
      <PhotographerHeader />
      <main className={styles.container}>
        <PhotographerProfile photographer={photographer} />
        <CustomSelect className={styles.mediaSort} options={options} />
        <MediaGallery medias={medias} />
      </main>
    </>
  );
}
