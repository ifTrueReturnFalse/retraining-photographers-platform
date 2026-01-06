import { PhotographerHeader } from "@/components/Headers/PhotographerHeader";
import { PhotographerProfile } from "@/components/Profiles/PhotographerProfile";
import { MediaGallery } from "@/components/MediaGallery/MediaGalleryContainer/MediaGallery";
import { CustomSelect } from "@/components/CustomSelect";
import { getPhotographer, getAllMediasForPhotographer } from "@/lib/prisma-db";
import { notFound } from "next/navigation";
import styles from "./PhotographerPage.module.css";
import { SelectOption } from "@/types/definitions";
import { PhotographerSummary } from "@/components/PhotographerSummary";
import { sortMediaBy } from "@/lib/utils";

/**
 * Options available for sorting the media gallery.
 * Used in the CustomSelect component.
 */
const options: SelectOption[] = [
  { label: "Popularité", value: "popularity" },
  { label: "Date", value: "date" },
  { label: "Titre", value: "title" },
];

/**
 * Photographer Page Component.
 *
 * Displays the profile, media gallery, and summary for a specific photographer.
 * Fetches data server-side based on the photographer's ID (slug) and handles sorting via search params.
 *
 * @param {Object} props - The component props.
 * @param {Promise<{ slug: string }>} props.params - The route parameters, containing the photographer's ID as a slug.
 * @param {Promise<{ sort?: string }>} props.searchParams - The search parameters, used for sorting media.
 * @returns {Promise<JSX.Element>} The rendered photographer page.
 */
export default async function PhotographerPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  // Await the params to extract the dynamic slug (photographer ID)
  const { slug } = await params;

  let photographerId = null;
  try {
    // Attempt to parse the slug into an integer ID
    photographerId = parseInt(slug);
  } catch (error) {
    console.error(`Can't parse to int the slug : ${error}`);
    notFound();
  }
  // Validate that the parsed ID is a valid number, otherwise trigger a 404
  if (isNaN(photographerId)) notFound();

  // Fetch photographer details from the database
  const photographer = await getPhotographer(photographerId);
  // If no photographer is found for the given ID, trigger a 404
  if (!photographer) notFound();

  // Fetch all media items associated with the photographer
  let medias = await getAllMediasForPhotographer(photographerId);

  // Await searchParams to determine the current sort order
  const { sort } = await searchParams;

  // Apply sorting to the media list
  if (!sort) {
    // If no sort param is provided, default to sorting by the first option (Popularity)
    medias = sortMediaBy(medias, options[0].value);
  } else {
    // Otherwise, sort by the provided criteria (date, title, etc.)
    medias = sortMediaBy(medias, sort);
  }

  return (
    <>
      <PhotographerHeader />
      <main className={styles.container}>
        <PhotographerProfile photographer={photographer} />
        <CustomSelect className={styles.mediaSort} options={options} />
        <MediaGallery medias={medias} />
        <PhotographerSummary photographer={photographer} medias={medias} />
      </main>
    </>
  );
}
